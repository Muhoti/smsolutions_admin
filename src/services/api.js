import axios from 'axios';

// Simple API client - easy to understand and use
const api = axios.create({
  baseURL: '/api', // This points to your backend on port 3003
  timeout: 30000, // Increased to 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', error.message);
    } else if (error.response?.status === 429) {
      console.error('Rate limit exceeded:', error.message);
    }
    return Promise.reject(error);
  }
);

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
