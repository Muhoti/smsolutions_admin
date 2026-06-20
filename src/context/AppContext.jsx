import React, { createContext, useContext, useState, useCallback } from 'react';
import { apiService } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoadingProjects(true);
      setError(null);
      const response = await apiService.getFeaturedProjects();
      setProjects(response.data.data || []);
    } catch (err) {
      const errorMessage = err.response?.status === 429
        ? 'Too many requests. Please wait a moment and refresh.'
        : 'Failed to load projects';
      setError(errorMessage);
      console.error('Error fetching projects:', err);
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoadingTestimonials(true);
      setError(null);
      const response = await apiService.getFeaturedTestimonials();
      setTestimonials(response.data.data || []);
    } catch (err) {
      const errorMessage = err.response?.status === 429
        ? 'Too many requests. Please wait a moment and refresh.'
        : 'Failed to load testimonials';
      setError(errorMessage);
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoadingTestimonials(false);
    }
  }, []);

  const submitContact = async (contactData) => {
    try {
      setSubmitting(true);
      const response = await apiService.submitContact(contactData);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to send message';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setSubmitting(false);
    }
  };

  const createProject = async (projectData) => {
    try {
      setSubmitting(true);
      const response = await apiService.admin.createProject(projectData);
      await fetchProjects();
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create project';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setSubmitting(false);
    }
  };

  const createTestimonial = async (testimonialData) => {
    try {
      setSubmitting(true);
      const response = await apiService.admin.createTestimonial(testimonialData);
      await fetchTestimonials();
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create testimonial';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setSubmitting(false);
    }
  };

  const createContact = async (contactData) => {
    try {
      setSubmitting(true);
      const response = await apiService.admin.createContact(contactData);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create contact';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setSubmitting(false);
    }
  };

  const clearError = () => setError(null);

  const value = {
    projects,
    testimonials,
    loading: submitting,
    loadingProjects,
    loadingTestimonials,
    error,
    fetchProjects,
    fetchTestimonials,
    submitContact,
    createProject,
    createTestimonial,
    createContact,
    clearError,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
