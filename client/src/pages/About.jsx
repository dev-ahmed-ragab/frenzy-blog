import React from 'react';
import Card from 'react-bootstrap/Card';
import './About.css';

function About() {
  return (
    <div className="lg:ps-20 pb-96">
      <div className="parent">
        <div className="main mb-1">
          <div className="child1">
            <div
              className="card text-black"
              style={{
                maxWidth: '34rem',
                height: '250px',
                backgroundColor: 'transparent',
                border: 'none'
              }}
            >
              <div className="card-body">
                <div className="contain">
                  <img src="https://max-themes.net/demos/frenzy/images/socials_22.png" alt="icon" />
                  <p className="card-text child1text">
                    We're powered by our unwavering devotion to rafting engaging content,
                    exploring fresh perspectives,
                    and embracing the forefront of literary exploration.
                  </p>
                </div>
                <hr />
                <p className="aboutp">
                  We thrive on crafting compelling content, exploring new perspectives,
                  and pushing literary boundaries with unwavering dedication.
                </p>
              </div>
            </div>
          </div>

          <div className="child2">
            <img
              className="photo"
              src="https://max-themes.net/demos/frenzy/images/about.jpg"
              alt="about"
            />
          </div>
        </div>
        <hr className='space'/>
        <div className="section section1">
            <div className="managesection1">

                <div className="card text-black mb-3" style={{ maxWidth: '390px',borderRadius:'10px',height:'130px' }}>
                
                        <div className="card-header">
                            <img src='	https://max-themes.net/demos/frenzy/images/dec2.jpg'/>
                                The Voices Behind Our Pages
                        </div>
                        <div className="card-body">
                            <h3 className="card-text " style={{textAlign:'center'}}>
                                AUTHORS
                            </h3>
                        </div>
                </div>

                <div className="sectionP2 ">
                      <div className="grides">

                        <div className=" card div1">
                          
                              <div class="card-body">
                                <h5 class="card-title">Alex Carter</h5>
                                <p class="card-text">
                                            A dedicated environmentalist, Alex sheds light on pressing ecological issues and sustainability practices. His articles inspire action and offer practical insights for a greener future.
                                        </p>
                                <a href="#" class="btn btn-dark">Profile</a>
                              </div>
                                    
                        </div>

                          <div className=" card div2">
                            <div class="card-body">
                                  <h5 class="card-title">Mike Ivans</h5>
                                  <p class="card-text">
                                            A dedicated environmentalist, Alex sheds light on pressing ecological issues and sustainability practices. His articles inspire action and offer practical insights for a greener future.
                                        .</p>
                                  <a href="#" class="btn btn-dark">Profile</a>
                            </div>
                          </div>

                          <div className='card div3'>
                            <div class="card-body">
                                  <h5 class="card-title">Demetris Osinski</h5>
                                  <p class="card-text">
                                            A dedicated environmentalist, Alex sheds light on pressing ecological issues and sustainability practices. His articles inspire action and offer practical insights for a greener future.
                                        </p>
                                  <a href="#" class="btn btn-dark">Profile</a>
                            </div>
                          </div>

                          <div className='card div4'>
                            <div class="card-body">
                                  <h5 class="card-title">Liam Neson</h5>
                                  <p class="card-text">
                                            A dedicated environmentalist, Alex sheds light on pressing ecological issues and sustainability practices. His articles inspire action and offer practical insights for a greener future.
                                        </p>
                                  <a href="#" class="btn btn-dark">Profile</a>
                            </div>

                          </div>
                         
                         
                      </div>
                 </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
