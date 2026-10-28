import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import Post from '../models/Post.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function runExport() {
  console.log('\n=============================================');
  console.log('   💾 FRENZY BLOG - DATA EXPORT TOOL         ');
  console.log('=============================================\n');

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGODB_URI is missing');

    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);

    const users = await User.find({}, '-password').lean();
    const posts = await Post.find().populate('author', 'username email').lean();

    const backupData = {
      exportedAt: new Date().toISOString(),
      totalUsers: users.length,
      totalPosts: posts.length,
      users,
      posts,
    };

    const backupDir = path.join(__dirname, '../data');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const backupPath = path.join(backupDir, 'backup.json');
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), 'utf-8');

    console.log(`✅ Backup successfully saved to: ${backupPath}`);
    console.log(`   - Backed up ${users.length} users and ${posts.length} articles.`);
    console.log('   You can now git add & commit this file to keep your data versioned in Git!\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Export failed:', error.message);
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
    process.exit(1);
  }
}

runExport();

