import axios from 'axios';

// Use environment variable for API URL
// Production: https://beyoglu-karshi.uz/api
// Development: http://localhost:3001/api
// const API_URL = "http://localhost:3001/api"
const API_URL = "https://beyoglu-karshi.uz/api/api"
// const API_URL = "http://localhost:3001/api"

// Utility function to fix image URLs
const fixImageUrl = (url: string): string => {
  if (!url) return url;
  // If URL contains localhost:5000, replace it with the production URL
  if (url.includes('localhost:5000')) {
    return url.replace('http://localhost:5000/uploads/', 'https://beyoglu-karshi.uz/api/uploads/');
  }
  return url;
};

// Function to transform meal object URLs and fix category structure
const transformMealImageUrl = (meal: any): any => {
  if (!meal) return meal;
  return {
    ...meal,
    image: fixImageUrl(meal.image),
    // Ensure category is a string for backward compatibility
    category: meal.category_info?.name || meal.category || 'Unknown',
    // Convert category_id to number
    category_id: meal.category_id ? Number(meal.category_id) : undefined,
  };
};

// Function to transform array of meals
const transformMealsArray = (meals: any[]): any[] => {
  return Array.isArray(meals) ? meals.map(transformMealImageUrl) : [];
};

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
  
  // Remove Content-Type header if sending FormData
  // This allows axios to automatically set the correct multipart/form-data header
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
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
    return {
      ...response.data,
      meals: transformMealsArray(response.data?.meals),
    };
  },
  getById: async (id: number) => {
    const response = await api.get(`/meals/${id}`);
    return {
      ...response.data,
      meal: transformMealImageUrl(response.data?.meal),
    };
  },
  create: async (meal: any) => {
    const processedMeal = {
      ...meal,
      category_id: meal.category_id ? Number(meal.category_id) : meal.category_id
    };
    
    const response = await api.post('/meals', processedMeal);
    return {
      ...response.data,
      meal: transformMealImageUrl(response.data?.meal),
    };
  },
  update: async (id: number, meal: any) => {
    const processedMeal = {
      ...meal,
      category_id: meal.category_id ? Number(meal.category_id) : meal.category_id
    };
    
    const response = await api.put(`/meals/${id}`, processedMeal);
    return {
      ...response.data,
      meal: transformMealImageUrl(response.data?.meal),
    };
  },
  delete: async (id: number) => {
    const response = await api.delete(`/meals/${id}`);
    return response.data;
  },
};

// Admin Meals API
export const adminMealsAPI = {
  getAll: async () => {
    const response = await api.get('/admin/meals');
    return {
      ...response.data,
      meals: transformMealsArray(response.data?.meals),
    };
  },
  getById: async (id: number) => {
    const response = await api.get(`/admin/meals/${id}`);
    return {
      ...response.data,
      meal: transformMealImageUrl(response.data?.meal),
    };
  },
  create: async (meal: any) => {
    const processedMeal = {
      ...meal,
      category_id: meal.category_id ? Number(meal.category_id) : meal.category_id
    };
    
    const response = await api.post('/admin/meals', processedMeal);
    return {
      ...response.data,
      meal: transformMealImageUrl(response.data?.meal),
    };
  },
  update: async (id: number, meal: any) => {
    const processedMeal = {
      ...meal,
      category_id: meal.category_id ? Number(meal.category_id) : meal.category_id
    };
    
    const response = await api.put(`/admin/meals/${id}`, processedMeal);
    return {
      ...response.data,
      meal: transformMealImageUrl(response.data?.meal),
    };
  },
  delete: async (id: number) => {
    const response = await api.delete(`/admin/meals/${id}`);
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

// Admin Categories API
export const adminCategoriesAPI = {
  getAll: async () => {
    const response = await api.get('/admin/categories');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/admin/categories/${id}`);
    return response.data;
  },
  create: async (category: any) => {
    const response = await api.post('/admin/categories', category);
    return response.data;
  },
  update: async (id: number, category: any) => {
    const response = await api.put(`/admin/categories/${id}`, category);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/admin/categories/${id}`);
    return response.data;
  },
};

// Uploads API
export const uploadsAPI = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await api.post('/uploads', formData);
      // Return the upload object with id, filename, url, etc.
      return response.data.upload;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  },
  getImageById: async (id: string) => {
    const response = await api.get(`/uploads/${id}`);
    return response.data;
  },
};

export default api;

