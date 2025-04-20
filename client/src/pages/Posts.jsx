import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { getPosts, createPost, updatePost, deletePost } from "../services/api";
import PostForm from "../components/PostForm";

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
      setError("حدث خطأ أثناء جلب المنشورات");
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
      setError(selectedPost ? "فشل تحديث المنشور" : "فشل إنشاء المنشور");
    }
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setIsFormOpen(true);
  };

  const handleDelete = async (postId) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنشور؟")) {
      try {
        await deletePost(postId);
        await fetchPosts();
      } catch (err) {
        setError("فشل حذف المنشور");
      }
    }
  };

  if (loading) {
    return <div className="py-8 text-center">جاري التحميل...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">المنشورات</h1>
        <button
          onClick={() => {
            setSelectedPost(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          منشور جديد
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="rounded-lg bg-white p-6 shadow-md">
            {post.imageUrl ? (
              <img
                className="mb-4 h-64 w-full object-cover"
                src={`http://localhost:5000${post.imageUrl}`}
                alt={post.title}
              />
            ) : null}
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mb-4 text-gray-600">{post.content}</p>
            <p className="text-gray-500">التصنيف: {post.category}</p>
            <p className="text-gray-500">
              المؤلف: {post.author ? post.author.username : "Unknown Author"}
            </p>
            <p className="text-gray-500">
              نُشر في {new Date(post.createdAt).toLocaleDateString("ar-EG")}
            </p>
            <button
              onClick={() => handleEdit(post)}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              تعديل
            </button>
            <button
              onClick={() => handleDelete(post._id)}
              className="ml-2 rounded bg-red-500 px-4 py-2 text-white"
            >
              حذف
            </button>
          </div>
        ))}

        {posts.length === 0 && !loading && (
          <div className="py-8 text-center text-gray-500">
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
