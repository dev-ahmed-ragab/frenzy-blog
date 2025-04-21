import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeaturedArticles from './FeaturedArticles';

const categories = [
  { name: "ENTERTAINMENT", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80" },
  { name: "NATURE", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
  { name: "GAMING", image: "https://images.pexels.com/photos/20021296/pexels-photo-20021296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
  { name: "BUSINESS", image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80" },
  { name: "SCIENCE", image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
  { name: "EDUCATION", image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80" },
  { name: "SPORT", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80" },
  { name: "TRAVEL", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" }
];
function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9fafb] space-y-12">
      <div className="px-8 py-12 overflow-x-auto">
        <div className="flex gap-6 justify-center">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => navigate(`/category/${cat.name.toLowerCase()}`)}
              className="w-40 h-40 relative rounded-lg overflow-hidden shadow-md transition duration-300 cursor-pointer group transform hover:scale-105 active:scale-95 active:rotate-1 bg-white"
            >
              <div className="w-full h-full border-4 border-white rounded-lg overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                <h2 className="text-white text-sm font-semibold text-center px-2">{cat.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-8">
        <FeaturedArticles />
      </div>

      <TechSection />
      <EducationSection />
      <MixedSection />
    </div>
  );
}


const TechSection = () => {
  const articles = [
    {
      title: "Future Forward: Technology's Evolution Unveiled",
      date: "April 10, 2025",
      img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=80&q=80"
    },
    {
      title: "Tech Trends: Navigating the Digital Frontier",
      date: "April 12, 2025",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=80&q=80"
    },
    {
      title: "Tech Talk: Advancements in Science and Tech",
      date: "April 14, 2025",
      img: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=80&q=80"
    },
    {
      title: "AI Revolution: Shaping the Future",
      date: "April 16, 2025",
      img: "https://tse2.mm.bing.net/th?id=OIP.dYLDlSSbLep8KQdjgTuikwHaE8&pid=Api"
    },
    {
      title: "Cyber Age: Digital World Insights",
      date: "April 18, 2025",
      img: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=80&q=80"
    },
    {
      title: "Cosmic Curiosities: Exploring the Universe",
      date: "April 19, 2025",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=80&q=80"
    }
  ];

  return (
    <div className="w-full">
      <div className="bg-black text-white whitespace-nowrap overflow-hidden">
        <div className="inline-block animate-marquee">
          {[
            "TechFood", "Fashion", "Health", "Entertainment", "Science",
            "Finance", "Music", "Art", "Environment", "Education",
            "Politics", "Culture", "Gaming", "Wellness"
          ].map((item, idx) => (
            <a key={idx} href="#" className="inline-block px-6 py-4 font-bold">{item}</a>
          ))}
        </div>
      </div>

      <div className="p-10 bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="flex items-end gap-4 text-black">
          <h1 className="text-[80px] font-bold leading-none">TECH</h1>
          <span className="text-xl pb-4">latest news about technology</span>
        </div>

        <div className="flex flex-wrap gap-6 mt-10 justify-center">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[60px] shadow-md p-4 w-[400px] flex items-center transform transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <img src={article.img} className="w-20 h-20 rounded-full mr-4 object-cover" alt={article.title} />
              <div>
                <h3 className="font-bold text-base leading-snug">{article.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{article.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        `}
      </style>
    </div>
  );
};


const EducationSection = () => {
  const educationItems = [
    {
      title: "TEACHER'S TOOLBOX: STRATEGIES FOR SUCCESS",
      img: "https://tse4.mm.bing.net/th?id=OIP.Jz5dly6us19yB4cfYTUyewHaHa&pid=Api"
    },
    {
      title: "EDTECH EXPLORATIONS: TRANSFORMATIVE TOOLS",
      img: "https://tse2.mm.bing.net/th?id=OIP.jVUwdK4nQMC3uqme_k4uuAHaE7&pid=Api"
    },
    {
      title: "STUDENT CHRONICLES: LIFE IN THE ACADEMIC LANE",
      img: "https://tse4.mm.bing.net/th?id=OIP.wDCrdc7qDAXTykRZAuLxxAHaHa&pid=Api"
    },
    {
      title: "KNOWLEDGE QUEST: EXPLORING ACADEMIC FRONTIERS",
      img: "https://tse2.mm.bing.net/th?id=OIP.D7HKF7gKV0t4MDNRCeYp5AHaE8&pid=Api"
    }
  ];

  return (
    <div className="p-10 bg-[#dfe8f5]">
      <div className="flex items-end gap-4 text-black">
        <h1 className="text-[80px] font-bold leading-none">EDUCATION</h1>
        <span className="text-xl pb-4">latest insights in education</span>
      </div>

      <div className="mt-10 flex flex-col md:flex-row gap-6">
        <div className="relative md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1000&q=80"
            className="rounded-2xl w-full h-auto object-cover"
            alt="Main education"
          />
          <div className="absolute bottom-6 left-6 bg-white p-6 rounded-[30px] shadow-md max-w-[80%]">
            <h2 className="text-xl font-semibold leading-snug">
              Beyond Books: Practical Learning Adventures
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:w-1/2">
          {educationItems.map((item, idx) => (
            <div key={idx} className="flex items-center bg-white rounded-2xl shadow-md p-4">
              <img src={item.img} className="w-16 h-16 rounded-lg mr-4 object-cover" alt={item.title} />
              <h3 className="text-base font-semibold">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MixedSection = () => {
  const cards = [
    {
      title: "Cultural Delights: A Journey Through History",
      category: "Travel",
      image: "https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg"
    },
    {
      title: "Wild Wonders: Exploring Nature's Tapestry",
      category: "Nature",
      image: "https://images.pexels.com/photos/34950/pexels-photo.jpg"
    },
    {
      title: "Pop Culture Parade: Trends and Fandoms",
      category: "Entertainment",
      image: "https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg"
    },
    {
      title: "Entrepreneurial Insights: Building Success Stories",
      category: "Business",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
    }
  ];

  return (
    <div className="bg-blue-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold mb-2">MIXED</h2>
        <p className="text-xl mb-8 text-gray-700">exploring a tapestry of topics and ideas</p>
        <div className="grid md:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-black text-white text-sm px-2 py-1 rounded">
                {card.category}
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent text-white p-4">
                <p className="text-sm">{card.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
 