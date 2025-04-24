import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { getUserPosts, createPost, updatePost, deletePost } from "../services/api";
import PostForm from "../components/PostForm";
import Loading from "../components/common/Loading";


const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const data = await getUserPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError("An error occurred while fetching your posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const handleSubmit = async (formDataToSend) => {
    try {
      if (selectedPost) {
        await updatePost(selectedPost._id, formDataToSend);
      } else {
        await createPost(formDataToSend);
      }
      await fetchUserPosts();
      setIsFormOpen(false);
      setSelectedPost(null);
    } catch (err) {
      console.error(err);
      setError(selectedPost ? "Failed to update post" : "Failed to create post");
      console.error(err);
    }
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setIsFormOpen(true);
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(postId);
        await fetchUserPosts();
      } catch (err) {
        setError("Failed to delete post");
      }
    }
  };

  if (loading) {
    return <div className="py-8 text-center"><Loading/></div>;
  }

  return (
    <div className="mx-auto max-w-7xl p-4">
      {/* العنوان وزر إضافة بوست */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Posts</h1>
        <button
          onClick={() => {
            setSelectedPost(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition duration-300"
        >
          <PlusIcon className="h-5 w-5" />
          New Post
        </button>
      </div>

      {/* رسالة الخطأ */}
      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {/* شبكة البوستات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post, index) => (
          <div
            key={post._id}
            className="rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            {/* الصورة */}
            {post.imageUrl && (
              <img
                className="mb-4 h-48 w-full object-cover rounded"
                src={`http://localhost:5000${post.imageUrl}`}
                alt={post.title}
              />
            )}

            {/* عنوان البوست */}
            <h2 className="text-lg font-semibold line-clamp-1">{post.title}</h2>

            {/* المحتوى */}
            <p className="text-gray-600 line-clamp-2">{post.content}</p>

            {/* الفئة والتاريخ */}
            <div className="mt-4 space-y-2">
              <p className="text-gray-500">Category: {post.category}</p>
              <p className="text-gray-500">
                Published on{" "}
                {new Date(post.createdAt).toLocaleDateString("en-US")}
              </p>
            </div>

            {/* أزرار التحرير والحذف */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEdit(post)}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* رسالة عدم توفر بوستات */}
        {posts.length === 0 && !loading && (
          <div className="col-span-full py-8 text-center text-gray-500">
            No posts available
          </div>
        )}
      </div>

      {/* نموذج إنشاء أو تحديث البوست */}
      {isFormOpen && (
        <PostForm
          post={selectedPost}
          onSubmit={(event) => handleSubmit(event)}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedPost(null);
          }}
        />
      )}
    </div>
  );
};

export default MyPosts;
