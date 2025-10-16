import axios from 'axios';

// Use environment variable for API URL
// Production: https://beyoglu-karshi.com/api
// Development: http://localhost:3001/api
const API_URL = (import.meta as any).env?.VITE_API_URL || 
  ((import.meta as any).env?.MODE === 'production' 
    ? 'https://beyoglu-karshi.com/api'
    : 'http://localhost:3001/api');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  verifyToken: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
};

// Meals API
export const mealsAPI = {
  getAll: async () => {
    const response = await api.get('/meals');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/meals/${id}`);
    return response.data;
  },
  create: async (meal: any) => {
    const config = meal instanceof FormData 
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    const response = await api.post('/meals', meal, config);
    return response.data;
  },
  update: async (id: number, meal: any) => {
    const config = meal instanceof FormData 
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    const response = await api.put(`/meals/${id}`, meal, config);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/meals/${id}`);
    return response.data;
  },
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
  create: async (category: any) => {
    const response = await api.post('/categories', category);
    return response.data;
  },
  update: async (id: number, category: any) => {
    const response = await api.put(`/categories/${id}`, category);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

export default api;

