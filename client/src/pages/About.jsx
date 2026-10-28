import './About.css';

function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 overflow-hidden">
      {/* First Section (Text and Image side by side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-center">
        {/* Text Section */}
        <div className="text-center md:text-left bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="mb-4">
            <img
              src="https://max-themes.net/demos/frenzy/images/socials_22.png"
              alt="icon"
              className="mx-auto md:mx-0 mb-3"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Mission & Purpose</h2>
          <p className="text-base text-gray-700 mb-4 leading-relaxed">
            We&apos;re powered by our unwavering devotion to crafting engaging content, exploring fresh perspectives,
            and embracing the forefront of digital publication and thoughtful storytelling.
          </p>
          <hr className="my-4 border-gray-100" />
          <p className="text-sm text-gray-500 leading-relaxed">
            We thrive on empowering voices, discussing modern trends, and pushing creative boundaries with
            unwavering dedication.
          </p>
        </div>

        {/* Image Section */}
        <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <img
            className="w-full h-80 object-cover"
            src="https://max-themes.net/demos/frenzy/images/about.jpg"
            alt="about"
          />
        </div>
      </div>

      {/* Author Cards Section */}
      <div className="my-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-extrabold text-gray-900 uppercase tracking-wider">
            The Voices Behind Our Pages
          </h3>
          <p className="text-sm text-gray-500 mt-1">Meet our passionate contributors</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Alex Carter', 'Mike Ivans', 'Demetris Osinski', 'Liam Nelson'].map((author, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#d681d6]/20 text-[#d681d6] font-bold flex items-center justify-center text-lg mb-4">
                  {author.charAt(0)}
                </div>
                <h4 className="text-base font-bold text-gray-800">{author}</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Dedicated author shedding light on technology, culture, and design. Inspiring ideas for creative thinkers.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                <span className="text-[#d681d6] font-semibold">Author</span>
                <span>Frenzy Team</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
