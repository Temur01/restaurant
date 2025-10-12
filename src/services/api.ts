import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

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
    const response = await api.post('/meals', meal);
    return response.data;
  },
  update: async (id: number, meal: any) => {
    const response = await api.put(`/meals/${id}`, meal);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/meals/${id}`);
    return response.data;
  },
};

export default api;

