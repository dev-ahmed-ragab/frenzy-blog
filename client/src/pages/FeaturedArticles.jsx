// import React from "react";

// Featured Articles Data
const featured = [
  {
    title: "Laugh Lounge: Comedy Capers and Chuckles",
    date: "Dec 12, 2023",
    image: "https://img.icons8.com/color/96/comedy.png",
  },
  {
    title: "Oceans Unexplored: Secrets of the Deep",
    date: "Dec 12, 2023",
    image: "https://img.icons8.com/color/96/water-element.png",
  },
  {
    title: "Console Corner: Exploring Gaming Platforms",
    date: "Dec 12, 2023",
    image: "https://img.icons8.com/color/96/controller.png",
  },
  {
    title: "Startup Spotlight: Unveiling Business Triumphs",
    date: "Dec 12, 2023",
    image: "https://img.icons8.com/color/96/business.png",
  },
];

// Blog Posts Data
const blogPosts = [
  {
    id: 1,
    title: "Laugh Lounge: Comedy Capers and Chuckles",
    category: "Entertainment",
    readTime: "5 MIN READ",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: 2,
    title: "Oceans Unexplored: Secrets of the Deep",
    category: "Nature",
    readTime: "5 MIN READ",
    image:
      "https://images.unsplash.com/photo-1547156979-b57c6439f9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: 3,
    title: "Console Corner: Exploring Gaming Platforms",
    category: "Gaming",
    readTime: "5 MIN READ",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1265&q=80",
  },
];

// Category style function
const getCategoryStyle = (category) => {
  switch (category) {
    case "Entertainment":
      return "bg-red-600";
    case "Nature":
      return "bg-green-600";
    case "Gaming":
      return "bg-purple-600";
    default:
      return "bg-gray-600";
  }
};

// Featured Articles Component
const FeaturedArticles = () => (
  <section>
    <div className="bg-white rounded-3xl p-6 shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured.map((item) => (
          <div key={item.title} className="flex flex-col items-center text-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-contain mb-3"
            />
            <h4 className="font-semibold text-base leading-tight">{item.title}</h4>
            <p className="text-xs text-gray-500">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Blog Cards Component
const BlogCards = () => (
  <section>
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="relative">
              <img
                src={post.image}
                alt={`Cover for ${post.title}`}
                className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-4">
                <span
                  className={`${getCategoryStyle(post.category)} text-white px-4 py-1 rounded-full text-sm font-medium`}
                >
                  {post.category}
                </span>
                <span className="text-white text-sm font-medium">{post.readTime}</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">
                {post.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Home Component
export default function Home() {
  return (
    <div className="p-8 space-y-12">
      <FeaturedArticles />
      <BlogCards />
    </div>
  );
}
