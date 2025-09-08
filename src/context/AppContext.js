import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

// Simple context for sharing data across components
const AppContext = createContext();

// Provider component - wraps your entire app
export const AppProvider = ({ children }) => {
  // Simple state - just what you need
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simple functions to fetch data
  const fetchProjects = async () => {
    if (loading) return; // Prevent multiple simultaneous calls
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const response = await apiService.getFeaturedProjects();
      setProjects(response.data.data || []);
    } catch (err) {
      const errorMessage = err.response?.status === 429 
        ? 'Too many requests. Please wait a moment and refresh.' 
        : 'Failed to load projects';
      setError(errorMessage);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTestimonials = async () => {
    if (loading) return; // Prevent multiple simultaneous calls
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const response = await apiService.getFeaturedTestimonials();
      setTestimonials(response.data.data || []);
    } catch (err) {
      const errorMessage = err.response?.status === 429 
        ? 'Too many requests. Please wait a moment and refresh.' 
        : 'Failed to load testimonials';
      setError(errorMessage);
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitContact = async (contactData) => {
    try {
      setLoading(true);
      const response = await apiService.submitContact(contactData);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to send message';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Admin functions
  const createProject = async (projectData) => {
    try {
      setLoading(true);
      const response = await apiService.admin.createProject(projectData);
      // Refresh projects after creating
      await fetchProjects();
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create project';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const createTestimonial = async (testimonialData) => {
    try {
      setLoading(true);
      const response = await apiService.admin.createTestimonial(testimonialData);
      // Refresh testimonials after creating
      await fetchTestimonials();
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create testimonial';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (contactData) => {
    try {
      setLoading(true);
      const response = await apiService.admin.createContact(contactData);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create contact';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Clear error function
  const clearError = () => setError(null);

  // Value to share with all components
  const value = {
    // Data
    projects,
    testimonials,
    loading,
    error,
    
    // Functions
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

// Custom hook to use the context - makes it easy to use
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
