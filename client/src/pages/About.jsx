import React from 'react';
import './About.css';

function About() {
  return (
    <div className="container mx-auto pb-96 md:pb-7 mt-10 mb-80 md:my-10 overflow-hidden">
      {/* First Section (Text and Image side by side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 px-3">
        {/* Text Section */}
        <div className="text-center">
          <div className="mb-4">
            <img
              src="https://max-themes.net/demos/frenzy/images/socials_22.png"
              alt="icon"
              className="mx-auto mb-3"
            />
          </div>
          <p className="text-lg text-gray-800 mb-3">
            We're powered by our unwavering devotion to rafting engaging content, exploring fresh perspectives,
            and embracing the forefront of literary exploration.
          </p>
          <hr className="my-4 border-gray-300" />
          <p className="text-md text-gray-600">
            We thrive on crafting compelling content, exploring new perspectives, and pushing literary boundaries with
            unwavering dedication.
          </p>
        </div>

        {/* Image Section */}
        <div className="text-center">
          <img
            className="rounded-lg w-full"
            src="https://max-themes.net/demos/frenzy/images/about.jpg"
            alt="about"
          />
        </div>
      </div>

      {/* Separator */}
      <hr className="my-5 border-gray-300" />

      {/* The Voices Behind Our Pages Section */}

      <div className="section section1">
            <div className="managesection1">

                <div className="card text-black bg-white py-10 px-5 mb-5 md:mb-0" style={{ maxWidth: '350px',borderRadius:'10px',height:'180px', width: "320px" }}>
                
                        <div className="card-header ">
                            <img src='	https://max-themes.net/demos/frenzy/images/dec2.jpg'/>
                                The Voices Behind Our Pages
                        </div>
                        <div className="card-body ">
                            <h3 className="card-text " style={{textAlign:'center'}}>
                                AUTHORS
                            </h3>
                        </div>
                </div>
      {/* Author Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
  {['Alex Carter', 'Mike Ivans', 'Demetris Osinski', 'Liam Neson'].map((author, index) => (
    <div key={index} className="flex justify-center">
      <div className="w-full max-w-xs mb-5 md:mb-0 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-xl transform transition-transform duration-200 hover:scale-105">
        <div className="p-4">
          <h5 className="text-lg font-semibold text-gray-800">{author}</h5>
          <p className="text-sm text-gray-600 mb-4">
            A dedicated environmentalist, {author} sheds light on pressing ecological issues and sustainability practices. His articles inspire action and offer practical insights for a greener future.
          </p>
          <a href="#" className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm">
            Profile
          </a>
        </div>
      </div>
    </div>
  ))}
</div>
  </div>
    </div>
    </div>
  );
}

export default About;
