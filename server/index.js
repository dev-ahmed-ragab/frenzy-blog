import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import connectDB from './src/config/database.js';
import userRoutes from './src/routes/userRoutes.js';
import postsRouter from './src/routes/posts.js';
import { v2 as cloudinary } from 'cloudinary'; // إضافة Cloudinary

// Load environment variables
dotenv.config();

// إعداد Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dn7s97ydy',
  api_key: process.env.CLOUDINARY_API_KEY || '688869988867236',
  api_secret:
    process.env.CLOUDINARY_API_SECRET || 'JqtKvkamuw-nQ2u7xTVhXk6ULVY',
});

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Get directory name (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postsRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
