import axios from 'axios';

const API_URL = 'http://localhost:5000';

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/users/profile', userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user data');
  }
};

export const getPosts = async () => {
  try {
    const response = await api.get('/api/posts');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};

export const getUserPosts = async () => {
  try {
    const response = await api.get('/api/posts/user');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user posts');
  }
};

export const createPost = async (formData) => {
  try {
    const response = await api.post('/api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to create post');
  }
};

export const updatePost = async (postId, formData) => {
  try {
    const response = await api.put(`/api/posts/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // تأكد من إضافة التوكن هنا
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update post: ${error.response.data.message || error.message}`);
  }
};

export const deletePost = async (postId) => {
  try {
    await api.delete(`/api/posts/${postId}`);
  } catch (error) {
    throw new Error('Failed to delete post');
  }
};