import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiLoader } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import AdminShell from '../components/admin/AdminShell';
import AdminLogin from '../components/admin/AdminLogin';
import DashboardPanel from '../components/admin/DashboardPanel';
import ContactsPanel from '../components/admin/ContactsPanel';
import ProjectsPanel from '../components/admin/ProjectsPanel';
import TestimonialsPanel from '../components/admin/TestimonialsPanel';
import ContactDrawer from '../components/admin/ContactDrawer';
import AdminFormModals from '../components/admin/AdminFormModals';
import { getAdminUser, setAdminUser, projectToFormValues } from '../components/admin/adminConstants';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminUser, setAdminUserState] = useState(getAdminUser);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isCreatingTestimonial, setIsCreatingTestimonial] = useState(false);
  const [isCreatingContact, setIsCreatingContact] = useState(false);

  const { createProject, createTestimonial, createContact, fetchProjects, fetchTestimonials } = useApp();

  const [stats, setStats] = useState({
    totalContacts: 0,
    newInquiries: 0,
    totalProjects: 0,
    featuredProjects: 0,
    totalTestimonials: 0,
  });
  const [contacts, setContacts] = useState([]);
  const [adminProjects, setAdminProjects] = useState([]);
  const [adminTestimonials, setAdminTestimonials] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);

  const { register: registerProject, handleSubmit: handleProjectSubmit, reset: resetProject, setValue: setProjectValue, watch: watchProject, formState: { errors: projectErrors } } = useForm();
  const { register: registerTestimonial, handleSubmit: handleTestimonialSubmit, reset: resetTestimonial, formState: { errors: testimonialErrors } } = useForm();
  const { register: registerContact, handleSubmit: handleContactSubmit, reset: resetContact, formState: { errors: contactErrors } } = useForm();

  const loadAdminData = useCallback(async () => {
    try {
      const [dashboardRes, contactsRes, projectsRes, testimonialsRes] = await Promise.all([
        apiService.admin.getDashboard(),
        apiService.admin.getContacts({ limit: 100 }),
        apiService.admin.getProjects({ limit: 100 }),
        apiService.admin.getTestimonials({ limit: 100 }),
      ]);

      const dashboard = dashboardRes.data.data;
      const testimonials = testimonialsRes.data.data || [];

      setStats({
        totalContacts: dashboard.contacts.total,
        newInquiries: dashboard.contacts.new,
        totalProjects: dashboard.projects.total,
        featuredProjects: dashboard.projects.featured,
        totalTestimonials: testimonials.length,
      });
      setRecentContacts(dashboard.recent.contacts || []);
      setContacts(contactsRes.data.data || []);
      setAdminProjects(projectsRes.data.data || []);
      setAdminTestimonials(testimonials);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin data');
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      setAdminUserState(getAdminUser());
      loadAdminData();
      fetchProjects();
      fetchTestimonials();
    }
    setIsLoading(false);
  }, [fetchProjects, fetchTestimonials, loadAdminData]);

  const handleContactUpdated = (updated) => {
    setContacts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setRecentContacts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    loadAdminData();
  };

  const onProjectSubmit = async (data) => {
    try {
      setIsCreatingProject(true);
      const payload = {
        title: data.title,
        description: data.description,
        category: data.category,
        techStack: data.techStack,
        liveDemo: data.liveDemo,
        playStore: data.playStore,
        appStore: data.appStore,
        featured: data.featured,
        clientName: data.clientName,
        coverImageUrl: data.coverImageUrl,
      };

      if (editingProject) {
        await apiService.admin.updateProject(editingProject.id, payload);
        toast.success('Project updated');
        handleCloseProjectForm();
        await fetchProjects();
        await loadAdminData();
        return;
      }

      const result = await createProject(payload);
      if (result.success) {
        toast.success('Project created');
        handleCloseProjectForm();
        await fetchProjects();
        await loadAdminData();
      } else {
        toast.error(result.error || 'Failed to create project');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save project');
    } finally {
      setIsCreatingProject(false);
    }
  };

  const handleOpenAddProject = () => {
    setEditingProject(null);
    resetProject();
    setShowProjectForm(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    resetProject(projectToFormValues(project));
    setShowProjectForm(true);
  };

  const handleCloseProjectForm = () => {
    setShowProjectForm(false);
    setEditingProject(null);
    resetProject();
  };

  const handleDeleteProject = async (project) => {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;

    try {
      await apiService.admin.deleteProject(project.id);
      toast.success('Project deleted');
      await loadAdminData();
      await fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete project');
    }
  };

  const onTestimonialSubmit = async (data) => {
    try {
      setIsCreatingTestimonial(true);
      const result = await createTestimonial(data);
      if (result.success) {
        toast.success('Testimonial created');
        setShowTestimonialForm(false);
        resetTestimonial();
        await fetchTestimonials();
        await loadAdminData();
      } else {
        toast.error(result.error || 'Failed to create testimonial');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create testimonial');
    } finally {
      setIsCreatingTestimonial(false);
    }
  };

  const onContactSubmit = async (data) => {
    try {
      setIsCreatingContact(true);
      const result = await createContact(data);
      if (result.success) {
        toast.success('Contact created');
        setShowContactForm(false);
        resetContact();
        await loadAdminData();
      } else {
        toast.error(result.error || 'Failed to create contact');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create contact');
    } finally {
      setIsCreatingContact(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiService.admin.login(loginData);
      const { token, user } = response.data.data;
      localStorage.setItem('adminToken', token);
      setAdminUser(user);
      setAdminUserState(user);
      setIsAuthenticated(true);
      toast.success(`Welcome back${user?.name ? `, ${user.name.split(' ')[0]}` : ''}!`);
      await loadAdminData();
      await fetchProjects();
      await fetchTestimonials();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminUser(null);
    setAdminUserState(null);
    setIsAuthenticated(false);
    setLoginData({ email: '', password: '' });
    setSelectedContact(null);
  };

  if (isLoading && !isAuthenticated) {
    return (
      <div className="admin-loading">
        <FiLoader className="spinner" size={32} />
        <p>Loading admin portal…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLogin
        loginData={loginData}
        setLoginData={setLoginData}
        onSubmit={handleLogin}
        isLoading={isLoading}
      />
    );
  }

  return (
    <AdminShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      stats={stats}
      adminUser={adminUser}
      onLogout={handleLogout}
    >
      {activeTab === 'dashboard' && (
        <DashboardPanel
          stats={stats}
          recentContacts={recentContacts}
          onNavigate={setActiveTab}
          onSelectContact={setSelectedContact}
        />
      )}

      {activeTab === 'contacts' && (
        <ContactsPanel
          contacts={contacts}
          onAdd={() => setShowContactForm(true)}
          onSelect={setSelectedContact}
        />
      )}

      {activeTab === 'projects' && (
        <ProjectsPanel
          projects={adminProjects}
          onAdd={handleOpenAddProject}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />
      )}

      {activeTab === 'testimonials' && (
        <TestimonialsPanel
          testimonials={adminTestimonials}
          onAdd={() => setShowTestimonialForm(true)}
        />
      )}

      {selectedContact && (
        <ContactDrawer
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onUpdated={handleContactUpdated}
        />
      )}

      <AdminFormModals
        showProjectForm={showProjectForm}
        setShowProjectForm={setShowProjectForm}
        onCloseProjectForm={handleCloseProjectForm}
        editingProject={editingProject}
        showTestimonialForm={showTestimonialForm}
        setShowTestimonialForm={setShowTestimonialForm}
        showContactForm={showContactForm}
        setShowContactForm={setShowContactForm}
        registerProject={registerProject}
        setProjectValue={setProjectValue}
        watchProject={watchProject}
        handleProjectSubmit={handleProjectSubmit}
        onProjectSubmit={onProjectSubmit}
        projectErrors={projectErrors}
        registerTestimonial={registerTestimonial}
        handleTestimonialSubmit={handleTestimonialSubmit}
        onTestimonialSubmit={onTestimonialSubmit}
        testimonialErrors={testimonialErrors}
        registerContact={registerContact}
        handleContactSubmit={handleContactSubmit}
        onContactSubmit={onContactSubmit}
        contactErrors={contactErrors}
        isCreatingProject={isCreatingProject}
        isCreatingTestimonial={isCreatingTestimonial}
        isCreatingContact={isCreatingContact}
      />
    </AdminShell>
  );
};

export default Admin;
