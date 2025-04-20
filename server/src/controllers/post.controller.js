import Post from '../models/Post.js';
import { validationResult } from 'express-validator';
import { Types } from 'mongoose';

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create post
export const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = {};
      errors.array().forEach(error => {
        errorMessages[error.param] = error.msg;
      });
      return res.status(400).json({ errors: errorMessages });
    }

    // Ensure that the data is being sent correctly in the request
const { title, content, category } = req.body;
    const missingFields = [];
    if (!title) missingFields.push('عنوان المنشور');
    if (!content) missingFields.push('محتوى المنشور');
    if (!category) missingFields.push('تصنيف المنشور');
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'الحقول التالية مطلوبة:',
        fields: missingFields
      });
    }
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const post = new Post({
      title,
      content,
      category,
      imageUrl,
      author: req.user._id
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user posts (الحفاظ على النقطة الحالية)
export const getUserPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    console.log('User ID:', req.user._id);
    console.log('Request Headers:', req.headers);

    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    console.error('Error in getUserPosts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = {};
      errors.array().forEach(error => {
        errorMessages[error.param] = error.msg;
      });
      return res.status(400).json({ errors: errorMessages });
    }

    // Ensure that the data is being sent correctly in the request
const { title, content, category } = req.body;
    const missingFields = [];
    if (!title) missingFields.push('عنوان المنشور');
    if (!content) missingFields.push('محتوى المنشور');
    if (!category) missingFields.push('تصنيف المنشور');
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'الحقول التالية مطلوبة:',
        fields: missingFields
      });
    }
    const updateData = { title, content, category };
    
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};