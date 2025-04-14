import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';
import { postValidator } from '../middleware/validators.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// @route   GET /api/posts
router.get('/', getPosts);

// @route   GET /api/posts/:id
router.get('/:id', getPostById);

// @route   POST /api/posts
// upload.single('image') makes the image field optional
router.post('/', protect, upload.single('image'), postValidator, createPost);

// @route   PUT /api/posts/:id
router.put('/:id', protect, upload.single('image'), postValidator, updatePost);

// @route   DELETE /api/posts/:id
router.delete('/:id', protect, deletePost);

export default router; 