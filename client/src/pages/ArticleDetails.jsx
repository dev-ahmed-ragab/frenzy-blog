import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { marked } from "marked";
import { API_URL } from "../services/api";
import Loading from "../components/common/Loading";

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true,
});

function ArticleDetails() {
  const { id: postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/posts/${postId}`);
        const postData = response.data;

        const normalizedPost = {
          title: postData.title,
          content: postData.content,
          category: postData.category,
          imageUrl: postData.imageUrl,
          authorName: postData.author?.username || "Author",
          createdAt: new Date(postData.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        };

        setPost(normalizedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const resolveImage = (url) => {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  if (loading) {
    return <Loading />;
  }

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto my-16 text-center bg-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Article Not Found</h2>
        <p className="text-gray-500 mb-6">The article you are looking for might have been removed or does not exist.</p>
        <Link
          to="/posts"
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-2xl font-semibold text-sm"
        >
          <ArrowLeft size={16} />
          Back to Posts
        </Link>
      </div>
    );
  }

  const imageSrc = resolveImage(post.imageUrl);
  const parsedHtml = post.content ? marked.parse(post.content) : "";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        to="/posts"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to all posts
      </Link>

      <article className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100 p-6 sm:p-10 space-y-6">
        {post.category && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 px-3.5 py-1.5 rounded-full">
            <Tag size={13} />
            {post.category}
          </span>
        )}

        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 border-b border-gray-100 pb-5">
          <div className="flex items-center gap-1.5 font-medium text-gray-800">
            <User size={16} className="text-[#d681d6]" />
            <span>{post.authorName}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Calendar size={16} className="text-gray-400" />
            <span>{post.createdAt}</span>
          </div>
        </div>

        {imageSrc && (
          <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={imageSrc}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000";
              }}
            />
          </div>
        )}

        {/* Render Formatted Markdown */}
        <div
          className="markdown-content text-gray-800 leading-relaxed text-base sm:text-lg max-w-none pt-4"
          dangerouslySetInnerHTML={{ __html: parsedHtml }}
        />
      </article>
    </div>
  );
}

export default ArticleDetails;
