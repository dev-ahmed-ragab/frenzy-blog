import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../components/common/Loading";

function ArticleDetails() {
  const { id: postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch post data from API based on ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${postId}`);
        const postData = response.data;

        // Transform data into appropriate display format
        const normalizedPost = {
          title: postData.title,
          content: postData.content,
          imageUrl: postData.imageUrl,
          authorName: postData.author?.username || "Unknown Author",
          createdAt: new Date(postData.createdAt).toLocaleDateString(),
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

  // Show loading message while data is being fetched
  if (loading) {
    return <Loading />;
  }

  // Show error message if post is not found
  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-6 my-5">
      {/* Main title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>

      {/* Publication info */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>
          <strong>{post.authorName}</strong>
        </span>
        <span>•</span>
        <span>{post.createdAt}</span>
      </div>

      {/* Post image */}
      <img
        src={`http://localhost:5000${post.imageUrl}`}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      {/* Visual separator */}
      <hr className="my-6 border-gray-200" />

     {/* Post content divided into paragraphs */}
      <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export default ArticleDetails;