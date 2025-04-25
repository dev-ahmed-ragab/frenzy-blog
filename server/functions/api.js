import express from 'express';
import serverless from 'serverless-http';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../src/config/database.js';
import userRoutes from '../src/routes/userRoutes.js';
import postsRouter from '../src/routes/posts.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB with error handling
try {
  await connectDB();
  console.log('Connected to MongoDB successfully');
} catch (error) {
  console.error('Failed to connect to MongoDB:', error);
  throw error;
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/.netlify/functions/api/users', userRoutes);
app.use('/.netlify/functions/api/posts', postsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Export handler for serverless
export const handler = serverless(app);