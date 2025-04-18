import Post from '../models/Post.js';
import { validationResult } from 'express-validator';
import fs from 'fs/promises';
import path from 'path';

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    console.log('Received file:', req.file);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, category } = req.body;
    
    // Validate category
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    // Create post object
    const postData = {
      title,
      content,
      category,
      author: req.user._id
    };

    // Handle image upload
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      postData.imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
    } else if (req.body.image && req.body.image.startsWith('http')) {
      // If image is provided as URL
      postData.imageUrl = req.body.image;
    }

    const post = await Post.create(postData);
    
    // Populate author details
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username email');
    
    res.status(201).json(populatedPost);
  } catch (error) {
    console.error('Error creating post:', error);
console.error('Error details:', error.stack);
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email');
    
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, category } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author of the post
    if (post.author.toString() !== req.user._id.toString()) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Handle image update
    if (req.file) {
      // Delete old image if it exists and is a local file
      if (post.imageUrl && post.imageUrl.includes('/uploads/')) {
        const oldImagePath = post.imageUrl.split('/uploads/')[1];
        if (oldImagePath) {
          const fullPath = path.join(process.cwd(), 'uploads', oldImagePath);
          try {
            await fs.unlink(fullPath);
          } catch (error) {
            console.error('Error deleting old image:', error);
          }
        }
      }

      const baseUrl = `${req.protocol}://${req.get('host')}`;
      post.imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
    } else if (req.body.image && req.body.image.startsWith('http')) {
      // Update image URL if provided
      post.imageUrl = req.body.image;
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;

    const updatedPost = await post.save();
    const populatedPost = await Post.findById(updatedPost._id)
      .populate('author', 'username email');
    
    res.json(populatedPost);
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author of the post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Delete associated image if it exists
    if (post.imageUrl) {
      const imagePath = post.imageUrl.split('/uploads/')[1];
      if (imagePath) {
        const fullPath = path.join(process.cwd(), 'uploads', imagePath);
        try {
          await fs.unlink(fullPath);
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      }
    }

    await post.deleteOne();
    res.json({ message: 'Post removed successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};