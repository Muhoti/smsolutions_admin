import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

export const apiService = {
  getProjects: (params) => api.get('/projects', { params }),
  getFeaturedProjects: () => api.get('/projects/featured'),
  getTestimonials: () => api.get('/testimonials'),
  getFeaturedTestimonials: () => api.get('/testimonials/featured'),
  submitContact: (contactData) => api.post('/contact', contactData),
  checkHealth: () => api.get('/health'),

  admin: {
    getDashboard: () => api.get('/admin/dashboard'),
    getContacts: (params) => api.get('/admin/contacts', { params }),
    getProjects: (params) => api.get('/admin/projects', { params }),
    getTestimonials: (params) => api.get('/admin/testimonials', { params }),
    createContact: (contactData) => api.post('/admin/contacts', contactData),
    updateContact: (id, contactData) => api.put(`/admin/contacts/${id}`, contactData),
    deleteContact: (id) => api.delete(`/admin/contacts/${id}`),
    createProject: (projectData) => api.post('/admin/projects', projectData),
    uploadProjectImage: (file) => {
      const formData = new FormData();
      formData.append('image', file);
      return api.post('/admin/upload/project-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    updateProject: (id, projectData) => api.put(`/admin/projects/${id}`, projectData),
    deleteProject: (id) => api.delete(`/admin/projects/${id}`),
    createTestimonial: (testimonialData) => api.post('/admin/testimonials', testimonialData),
    updateTestimonial: (id, testimonialData) => api.put(`/admin/testimonials/${id}`, testimonialData),
    deleteTestimonial: (id) => api.delete(`/admin/testimonials/${id}`),
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
  },
};

export default api;
