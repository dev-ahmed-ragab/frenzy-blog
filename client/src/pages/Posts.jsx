import { useState, useEffect } from "react";
import { getPosts } from "../services/api";
import { Link } from "react-router-dom";
import Loading from "../components/common/Loading";
import { Search, X } from 'lucide-react';


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

  useEffect(() => {
    if (posts.length > 0) {
      const categories = [...new Set(posts.flatMap(post => post.categories || []))];
      setAllCategories(categories);
    }
  }, [posts]);

  useEffect(() => {
    const filtered = posts.filter(post => {
      const matchesSearch = searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategories = selectedCategories.length === 0 ||
        selectedCategories.some(cat => post.categories?.includes(cat));

      return matchesSearch && matchesCategories;
    });
    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategories, posts]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
  };

  if (loading) {
    return <div className="py-8 text-center"><Loading/></div>;
  }

  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="mb-6">
        <h1 className="text-[60px] font-bold text-center uppercase p-5 text-[#d681d6]">Posts</h1>
        
        {/* Search and Filter Section */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Search Box */}
          <div className="relative w-full max-w-3xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
              className="w-full p-3 pr-10 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d681d6] shadow-sm hover:shadow-md transition-all duration-300"
            />
            <Search className="absolute right-3 top-3 text-gray-400" size={20} />
            {searchTerm && (
              <button
                onClick={clearFilters}
                className="absolute left-3 top-3 text-gray-400 hover:text-red-500 transition-colors duration-300"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategories.includes(category)
                    ? 'bg-[#d681d6] text-white shadow-md transform scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPosts.map((post) => (
          <Link
            key={post._id}
            to={`/articledetails/${post._id}`} // Redirect user to article details page
            className="block rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105"
          >
            {/* Image */}
            {post.imageUrl && (
              <img
                className="mb-4 h-48 w-full object-cover rounded"
                src={`http://localhost:5000${post.imageUrl}`}
                alt={post.title}
              />
            )}

            {/* Post title */}
            <h2 className="text-lg font-semibold line-clamp-1">{post.title}</h2>

            {/* Author name */}
            <p className="text-gray-500">
              Author: {post.author ? post.author.username : "Unknown Author"}
            </p>

            {/* First 20 characters of content */}
            <p className="text-gray-600 line-clamp-2">
              {post.content.slice(0, 20)}...
            </p>
          </Link>
        ))}

        {/* No posts available message */}
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
