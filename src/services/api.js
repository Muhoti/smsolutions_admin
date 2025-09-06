import axios from 'axios';

// Simple API client - easy to understand and use
const api = axios.create({
  baseURL: '/api', // This points to your backend on port 3003
  timeout: 10000, // 10 seconds timeout
});

// Simple API functions - just what you need
export const apiService = {
  // Get all projects
  getProjects: () => api.get('/projects'),
  
  // Get featured projects only
  getFeaturedProjects: () => api.get('/projects/featured'),
  
  // Get all testimonials
  getTestimonials: () => api.get('/testimonials'),
  
  // Get featured testimonials only
  getFeaturedTestimonials: () => api.get('/testimonials/featured'),
  
  // Submit contact form
  submitContact: (contactData) => api.post('/contact', contactData),
  
  // Health check
  checkHealth: () => api.get('/health'),
  
  // Admin functions
  admin: {
    // Projects
    createProject: (projectData) => api.post('/admin/projects', projectData),
    updateProject: (id, projectData) => api.put(`/admin/projects/${id}`, projectData),
    deleteProject: (id) => api.delete(`/admin/projects/${id}`),
    
    // Testimonials
    createTestimonial: (testimonialData) => api.post('/admin/testimonials', testimonialData),
    updateTestimonial: (id, testimonialData) => api.put(`/admin/testimonials/${id}`, testimonialData),
    deleteTestimonial: (id) => api.delete(`/admin/testimonials/${id}`),
    
    // Auth
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
  },
};

export default api;
