import { useState, useEffect } from "react";
import { getPosts, API_URL } from "../services/api";
import { Link } from "react-router-dom";
import Loading from "../components/common/Loading";
import { Search, X } from "lucide-react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data || []);
      setError(null);
    } catch {
      setError("An error occurred while fetching posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts && posts.length > 0) {
      const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))];
      setAllCategories(categories);
    }
  }, [posts]);

  useEffect(() => {
    let result = posts || [];

    if (searchTerm) {
      result = result.filter(
        (post) =>
          post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((post) => selectedCategories.includes(post.category));
    }

    setFilteredPosts(result);
  }, [posts, searchTerm, selectedCategories]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
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
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Explore Articles</h1>
          <p className="text-sm text-gray-500 mt-1">Discover ideas, insights and stories from our authors</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#d681d6] focus:ring-2 focus:ring-[#d681d6]/20 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Category Pills */}
      {allCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mr-2">
            Categories:
          </span>
          {allCategories.map((cat) => {
            const isSelected = selectedCategories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => handleCategoryToggle(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${isSelected
                    ? "bg-black text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                  }`}
              >
                {cat}
              </button>
            );
          })}

          {(searchTerm || selectedCategories.length > 0) && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 ml-2 font-medium"
            >
              <X size={14} />
              Clear filters
            </button>
          )}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPosts.map((post) => {
          const imageSrc = resolveImage(post.imageUrl);
          return (
            <Link
              key={post._id}
              to={`/articledetails/${post._id}`}
              className="group bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {imageSrc ? (
                  <div className="h-48 w-full overflow-hidden bg-gray-100 relative">
                    <img
                      src={imageSrc}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.category && (
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                        {post.category}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="h-32 w-full bg-gradient-to-br from-[#dde7f5] to-purple-100 flex items-center justify-center p-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#d681d6]">
                      {post.category || "Article"}
                    </span>
                  </div>
                )}

                <div className="p-5">
                  <h2 className="text-base font-bold text-gray-900 line-clamp-2 group-hover:text-[#d681d6] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-2 leading-relaxed">
                    {post.content ? post.content.replace(/<[^>]*>?/gm, "").slice(0, 90) : ""}...
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-gray-50 mt-2 flex items-center justify-between text-xs text-gray-400">
                <span className="font-medium text-gray-600">
                  By {post.author ? post.author.username : "Author"}
                </span>
                <span>Read More →</span>
              </div>
            </Link>
          );
        })}

        {filteredPosts.length === 0 && !loading && (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-gray-100 p-8">
            <p className="text-gray-500 font-medium">No articles matched your criteria</p>
            <button
              onClick={clearFilters}
              className="mt-3 text-sm text-[#d681d6] font-semibold hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
