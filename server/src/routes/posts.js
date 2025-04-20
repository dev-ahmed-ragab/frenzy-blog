import express from 'express';
import { protect } from '../middleware/auth.js';
import { getAllPosts, getUserPosts, updatePost, deletePost, getPostById, createPost } from '../controllers/post.controller.js';
import multer from 'multer';
import path from 'path';
import { postValidator } from '../middleware/validators.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Create a new post
router.post('/', protect, upload.single('image'), postValidator, createPost);

// Get user's posts
router.get('/user', protect, getUserPosts);

// Get all posts
router.get('/', getAllPosts);

// Get single post by ID
router.get('/:id', getPostById);

// Update user's post
router.put('/:id', protect, updatePost);

// Delete user's post
router.delete('/:id', protect, deletePost);

export default router;