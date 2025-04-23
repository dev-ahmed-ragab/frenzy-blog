import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getToken = () => {
  return localStorage.getItem('token');
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      console.log('Token attached:', token); // Debugging line
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No token found'); // Debugging line
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Posts API
export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error.response?.data || error.message);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error.response?.data || error.message);
    console.error('Request payload:', postData);
    console.error('Request headers:', api.defaults.headers);
    throw error;
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error.response?.data || error.message);
    console.error('Request payload:', postData);
    console.error('Request headers:', api.defaults.headers);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error.response?.data || error.message);
    throw error;
  }
};

// Auth API
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error;
  }
};