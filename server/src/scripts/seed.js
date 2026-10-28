import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import Post from '../models/Post.js';
import { seedUsers } from '../data/users.js';
import { seedPosts } from '../data/posts.js';

// Resolve environment file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function runSeed() {
  console.log('\n=============================================');
  console.log('   🚀 FRENZY BLOG - DATABASE SEEDER TOOL     ');
  console.log('=============================================\n');

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in server/.env');
    }

    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected successfully to database:', mongoose.connection.name);

    // 1. Clean existing data
    console.log('\n🧹 Clearing old posts and users...');
    const deletedPosts = await Post.deleteMany({});
    const deletedUsers = await User.deleteMany({});
    console.log(`   Deleted ${deletedPosts.deletedCount} old posts`);
    console.log(`   Deleted ${deletedUsers.deletedCount} old users`);

    // 2. Insert Users
    console.log('\n👤 Creating Seed Users...');
    const createdUsers = [];
    for (const userData of seedUsers) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`   + Created User: ${user.username} (${user.email})`);
    }

    // 3. Insert Posts with Author Association
    console.log('\n📝 Publishing Seed Articles (Markdown)...');
    let postCount = 0;
    for (let i = 0; i < seedPosts.length; i++) {
      const postData = seedPosts[i];
      // Alternate author assignment
      const author = createdUsers[i % createdUsers.length];

      const post = new Post({
        ...postData,
        author: author._id,
      });

      await post.save();
      postCount++;
      console.log(`   [${post.category.toUpperCase()}] ${post.title}`);
    }

    console.log('\n=============================================');
    console.log(`✨ SEEDING COMPLETE!`);
    console.log(`   - Users created: ${createdUsers.length}`);
    console.log(`   - Articles published: ${postCount}`);
    console.log('\n🔑 Test Credentials:');
    seedUsers.forEach((u) => {
      console.log(`   Email: ${u.email}  |  Password: ${u.password}`);
    });
    console.log('=============================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed with error:', error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
}

runSeed();

