import { body } from 'express-validator';

export const registerValidator = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

export const loginValidator = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
];

export const postValidator = [
  body('title')
    .exists()
    .withMessage('Title is required')
    .notEmpty()
    .withMessage('Title cannot be empty')
    .trim()
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters'),
  body('content')
    .exists()
    .withMessage('Content is required')
    .notEmpty()
    .withMessage('Content cannot be empty')
    .trim(),
  body('category')
    .exists()
    .withMessage('Category is required')
    .notEmpty()
    .withMessage('Category cannot be empty')
    .trim()
    .isIn(['Technology', 'Travel', 'Food', 'Lifestyle', 'Business', 'Other'])
    .withMessage('Invalid category selected')
]; 