import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUser, deleteUser } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { registerValidator, loginValidator } from '../middleware/validators.js';
import { uploadAvatar } from '../controllers/userController.js';

const router = express.Router();

// @route   POST /api/users/register
router.post('/register', registerValidator, registerUser);

// @route   POST /api/users/login
router.post('/login', loginValidator, loginUser);

// @route   GET /api/users/profile
router.get('/profile', protect, getUserProfile);

// @route   PUT /api/users/:id
router.put('/:id', protect, updateUser);

// @route   DELETE /api/users/:id
router.delete('/:id', protect, deleteUser);

// @route   POST /api/users/:id/avatar
router.post('/:id/avatar', protect, uploadAvatar);

export default router;