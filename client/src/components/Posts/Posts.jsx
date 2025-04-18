import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { getPosts, createPost, updatePost, deletePost } from '../../services/api';
import PostForm from './PostForm';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('حدث خطأ أثناء جلب المنشورات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (selectedPost) {
        await updatePost(selectedPost._id, formData);
      } else {
        await createPost(formData);
      }
      await fetchPosts();
      setIsFormOpen(false);
      setSelectedPost(null);
    } catch (err) {
      setError(selectedPost ? 'فشل تحديث المنشور' : 'فشل إنشاء المنشور');
    }
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setIsFormOpen(true);
  };

  const handleDelete = async (postId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنشور؟')) {
      try {
        await deletePost(postId);
        await fetchPosts();
      } catch (err) {
        setError('فشل حذف المنشور');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">المنشورات</h1>
        <button
          onClick={() => {
            setSelectedPost(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          منشور جديد
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post._id} className="bg-white rounded-lg shadow-md p-6">
            {post.imageUrl ? (
              <img className="w-full h-64 object-cover mb-4" src={`http://localhost:5000${post.imageUrl}`} alt={post.title} />
            ) : null}
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <p className="text-gray-500">التصنيف: {post.category}</p>
            <p className="text-gray-500">المؤلف: {post.author ? post.author.username : 'Unknown Author'}</p>
            <p className="text-gray-500">نُشر في {new Date(post.createdAt).toLocaleDateString('ar-EG')}</p>
            <button onClick={() => handleEdit(post)} className="bg-blue-500 text-white px-4 py-2 rounded">تعديل</button>
            <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">حذف</button>
          </div>
        ))}

        {posts.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            لا توجد منشورات حالياً
          </div>
        )}
      </div>

      {isFormOpen && (
        <PostForm
          post={selectedPost}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedPost(null);
          }}
        />
      )}
    </div>
  );
};

export default Posts;