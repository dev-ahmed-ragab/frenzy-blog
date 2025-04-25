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

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/.netlify/functions/api/users', userRoutes);
app.use('/.netlify/functions/api/posts', postsRouter);

// Export handler for serverless
export const handler = serverless(app);