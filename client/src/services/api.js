import axios from 'axios';

const API_URL = 'http://localhost:5000';

const TEMP_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmZlY2MxNDcyNDNjYWRjNTZkYjIzOCIsImlhdCI6MTc0NDg5NDU4MiwiZXhwIjoxNzQ0OTgwOTgyfQ.V8UYD5rUEofGNjj08gBYExfu0Ca2vcNHT_fdOhx379o';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TEMP_TOKEN}`
  }
});

export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    throw new Error('فشل في جلب بيانات المستخدم');
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/users/profile', userData);
    return response.data;
  } catch (error) {
    throw new Error('فشل في تحديث بيانات المستخدم');
  }
};

export const getPosts = async () => {
  try {
    const response = await api.get('/api/posts');
    return response.data;
  } catch (error) {
    throw new Error('فشل في جلب المنشورات');
  }
};

export const getUserPosts = async () => {
  try {
    const response = await api.get('/api/posts/user');
    return response.data;
  } catch (error) {
    throw new Error('فشل في جلب منشورات المستخدم');
  }
};

export const createPost = async (formData) => {
  try {
    const response = await api.post('/api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${TEMP_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('فشل في إنشاء المنشور');
  }
};

export const updatePost = async (postId, formData) => {
  try {
    const response = await api.put(`/api/posts/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('فشل في تحديث المنشور');
  }
};

export const deletePost = async (postId) => {
  try {
    await api.delete(`/api/posts/${postId}`);
  } catch (error) {
    throw new Error('فشل في حذف المنشور');
  }
};