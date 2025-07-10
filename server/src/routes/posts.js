import express from 'express';
import { protect } from '../middleware/auth.js';
import { postValidator } from '../middleware/validators.js';
import upload from '../middleware/uploadMiddleware.js';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
} from '../controllers/post.controller.js';

const router = express.Router();

// Public routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Protected routes
router.post('/', protect, upload.single('image'), postValidator, createPost);
router.put('/:id', protect, upload.single('image'), postValidator, updatePost);
router.delete('/:id', protect, deletePost);
router.get('/user/posts', protect, getUserPosts);

export default router;
