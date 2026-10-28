import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { getUserPosts, createPost, updatePost, deletePost, API_URL } from "../services/api";
import PostForm from "../components/PostForm";
import Loading from "../components/common/Loading";
import toast from "react-hot-toast";

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
      setPosts(data || []);
      setError(null);
    } catch {
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
      if (
        !formDataToSend.get("title") ||
        !formDataToSend.get("content") ||
        !formDataToSend.get("category")
      ) {
        throw new Error("All fields are required.");
      }
      if (selectedPost) {
        await updatePost(selectedPost._id, formDataToSend);
        toast.success("Post updated successfully!");
      } else {
        await createPost(formDataToSend);
        toast.success("Post created successfully!");
      }
      fetchUserPosts();
      setIsFormOpen(false);
      setSelectedPost(null);
    } catch (err) {
      toast.error(err.message || "Failed to save post");
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(postId);
        toast.success("Post deleted successfully");
        setPosts((prev) => prev.filter((post) => post._id !== postId));
      } catch (err) {
        toast.error(err.message || "Failed to delete post");
      }
    }
  };

  const resolveImage = (url) => {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Articles</h1>
          <p className="text-sm text-gray-500 mt-1">Manage, edit, or publish your blog posts</p>
        </div>
        <button
          onClick={() => {
            setSelectedPost(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-2xl font-semibold text-sm shadow-md transition-all hover:shadow-lg"
        >
          <PlusIcon className="h-5 w-5 text-[#d681d6]" />
          <span>New Article</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => {
          const imageSrc = resolveImage(post.imageUrl);
          return (
            <div
              key={post._id}
              className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {imageSrc ? (
                  <div className="h-44 w-full overflow-hidden bg-gray-100">
                    <img src={imageSrc} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="h-28 w-full bg-gradient-to-br from-[#dde7f5] to-purple-100 flex items-center justify-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#d681d6]">
                      {post.category || "Article"}
                    </span>
                  </div>
                )}

                <div className="p-5">
                  <h2 className="text-base font-bold text-gray-900 line-clamp-1 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {post.content ? post.content.replace(/<[^>]*>?/gm, "").slice(0, 90) : ""}...
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setSelectedPost(post);
                    setIsFormOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-white hover:text-black border border-gray-200 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        {posts.length === 0 && !loading && (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-1">No articles published yet</h3>
            <p className="text-gray-500 text-sm mb-4">
              Share your thoughts and ideas with the Frenzy community today!
            </p>
            <button
              onClick={() => {
                setSelectedPost(null);
                setIsFormOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-2xl font-semibold text-sm shadow-md"
            >
              <PlusIcon className="h-4 w-4 text-[#d681d6]" />
              <span>Create Your First Post</span>
            </button>
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

export default MyPosts;
