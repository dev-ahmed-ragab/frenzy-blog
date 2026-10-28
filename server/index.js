import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import connectDB from './src/config/database.js';
import userRoutes from './src/routes/userRoutes.js';
import postsRouter from './src/routes/posts.js';
import { v2 as cloudinary } from 'cloudinary';

// Load environment variables
dotenv.config();

// Setup Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dn7s97ydy',
  api_key: process.env.CLOUDINARY_API_KEY || '688869988867236',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'JqtKvkamuw-nQ2u7xTVhXk6ULVY',
});

// Create Express app
const app = express();

// ES module path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Safe uploads directory handling for serverless & local
const uploadsDir = path.join(__dirname, 'uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (err) {
  // Read-only filesystem on serverless environments like Vercel Lambda
  console.warn('Note: Read-only filesystem detected, uploads directory creation skipped');
}

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection middleware for serverless invocations
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error('Database connection middleware error:', err);
  }
  next();
});

// Serve uploaded static files
try {
  app.use('/uploads', express.static(uploadsDir));
} catch (err) {
  console.warn('Uploads static route error:', err);
}

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postsRouter);

// Health check / root route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Frenzy Blog API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled API Error:', err);
  res.status(err.status || 500).json({
    error: 'Server Error',
    message: err.message || 'Something went wrong',
  });
});

// Start local server if not running in Vercel Serverless environment
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Default export required for Vercel Serverless Functions (@vercel/node)
export default app;
