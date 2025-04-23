// import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <div className="min-h-screen mt-10 bg-white flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-4 capitalize">{categoryName} Page</h1>
      <p className="text-gray-600 mb-6">Here you'll see all blog posts or content related to <strong>{categoryName}</strong>.</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">← Back to Home</Link>
    </div>
  );
};

export default CategoryPage;
