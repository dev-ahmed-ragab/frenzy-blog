import Post from '../models/Post.js';
import { validationResult } from 'express-validator';
import { Types } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      'author',
      'username'
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create post
export const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = {};
      errors.array().forEach((error) => {
        errorMessages[error.param] = error.msg;
      });
      return res.status(400).json({ errors: errorMessages });
    }

    const { title, content, category } = req.body;
    const missingFields = [];
    if (!title) missingFields.push('عنوان المنشور');
    if (!content) missingFields.push('محتوى المنشور');
    if (!category) missingFields.push('تصنيف المنشور');

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: 'الحقول التالية مطلوبة:',
        fields: missingFields,
      });
    }

    let imageUrl = null;
    let publicId = null;
    if (req.file) {
      // استخدام Promise للرفع
      const uploadPromise = () =>
        new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'frenzy', resource_type: 'image' },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });

      const result = await uploadPromise();
      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    const post = new Post({
      title,
      content,
      category,
      imageUrl,
      publicId,
      author: req.user._id,
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user posts
export const getUserPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const posts = await Post.find({ author: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (error) {
    console.error('Error in getUserPosts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = {};
      errors.array().forEach((error) => {
        errorMessages[error.param] = error.msg;
      });
      return res.status(400).json({ errors: errorMessages });
    }

    const { title, content, category } = req.body;
    const missingFields = [];
    if (!title) missingFields.push('عنوان المنشور');
    if (!content) missingFields.push('محتوى المنشور');
    if (!category) missingFields.push('تصنيف المنشور');

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: 'الحقول التالية مطلوبة:',
        fields: missingFields,
      });
    }

    const updateData = { title, content, category };
    let publicId = null;

    if (req.file) {
      // رفع الصورة الجديدة إلى Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'posts', resource_type: 'image' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            throw new Error('Failed to upload image');
          }
          updateData.imageUrl = result.secure_url;
          publicId = result.public_id;
        }
      );

      // تحويل الـ buffer إلى stream ورفعه
      await new Promise((resolve, reject) => {
        streamifier
          .createReadStream(req.file.buffer)
          .pipe(uploadStream)
          .on('finish', resolve)
          .on('error', reject);
      });

      // حذف الصورة القديمة من Cloudinary إذا وجدت
      const post = await Post.findById(req.params.id);
      if (post.publicId) {
        await cloudinary.uploader.destroy(post.publicId);
      }
      updateData.publicId = publicId; // تحديث publicId
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // حذف الصورة من Cloudinary إذا وجدت
    if (post.publicId) {
      await cloudinary.uploader.destroy(post.publicId);
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
