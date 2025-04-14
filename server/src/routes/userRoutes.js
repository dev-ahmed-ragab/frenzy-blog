import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { registerValidator, loginValidator } from '../middleware/validators.js';

const router = express.Router();

// @route   POST /api/users/register
router.post('/register', registerValidator, registerUser);

// @route   POST /api/users/login
router.post('/login', loginValidator, loginUser);

// @route   GET /api/users/profile
router.get('/profile', protect, getUserProfile);

export default router; 