import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 max-w-lg mx-auto">
        <span className="inline-block bg-[#dde7f5] text-[#d681d6] font-bold text-xs uppercase px-4 py-1.5 rounded-full mb-4">
          Category
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3 capitalize">
          {categoryName}
        </h1>
        <p className="text-gray-600 text-sm mb-8 leading-relaxed">
          Here you&apos;ll discover all blog posts, insights, and stories curated specifically under the{" "}
          <strong className="text-gray-900">{categoryName}</strong> topic.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            to="/posts"
            className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-2xl text-sm font-semibold shadow-md transition-all"
          >
            <ArrowLeft size={16} />
            <span>Browse All Posts</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
