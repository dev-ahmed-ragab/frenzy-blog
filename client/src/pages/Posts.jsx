import { useState, useEffect } from "react";
import { getPosts } from "../services/api";
import { Link } from "react-router-dom"; // استيراد Link من React Router
import Loading from "../components/common/Loading";


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError("An error occurred while fetching posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="py-8 text-center"><Loading/></div>;
  }

  return (
    <div className="mx-auto max-w-7xl p-4">
      {/* العنوان */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[60px] font-bold text-center m-auto uppercase p-5 text-[#d681d6]">Posts</h1>
      </div>

      {/* رسالة الخطأ */}
      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {/* شبكة البوستات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/articledetails/${post._id}`} // تحويل المستخدم إلى صفحة تفاصيل المقال
            className="block rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105"
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

            {/* اسم المؤلف */}
            <p className="text-gray-500">
              Author: {post.author ? post.author.username : "Unknown Author"}
            </p>

            {/* أول 20 حرف من المحتوى */}
            <p className="text-gray-600 line-clamp-2">
              {post.content.slice(0, 20)}...
            </p>
          </Link>
        ))}

        {/* رسالة عدم توفر بوستات */}
        {posts.length === 0 && !loading && (
          <div className="col-span-full py-8 text-center text-gray-500">
            No posts available
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
