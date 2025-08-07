import React from 'react';

const About = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">About Us</h1>

        {/* Company Story */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2015, HomeCraft has been serving the residential construction needs of our community. Our team of experienced professionals brings passion, expertise, and integrity to every project.
              </p>
              <p className="text-gray-600 mb-6">
                We believe that every home improvement project is an opportunity to create something special and lasting. Our commitment to quality, customer satisfaction, and attention to detail sets us apart in the industry.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Values</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-secondary mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold mb-2">Quality First</h4>
                    <p className="text-gray-600">We never compromise on quality, using only the best materials and workmanship.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-secondary mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold mb-2">Customer Focus</h4>
                    <p className="text-gray-600">Your satisfaction is our top priority - we listen and deliver what you need.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-secondary mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold mb-2">Professionalism</h4>
                    <p className="text-gray-600">We maintain the highest standards of professionalism in all our work.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-32 h-32 rounded-full mx-auto bg-gray-200 mb-6"></div>
              <h3 className="text-xl font-semibold mb-2 text-primary">John Smith</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-32 h-32 rounded-full mx-auto bg-gray-200 mb-6"></div>
              <h3 className="text-xl font-semibold mb-2 text-primary">Sarah Johnson</h3>
              <p className="text-gray-600">Project Manager</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-32 h-32 rounded-full mx-auto bg-gray-200 mb-6"></div>
              <h3 className="text-xl font-semibold mb-2 text-primary">Mike Wilson</h3>
              <p className="text-gray-600">Lead Carpenter</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 mb-4">"The team at HomeCraft transformed our outdated kitchen into a modern, functional space that we absolutely love. Their attention to detail and professionalism was outstanding."</p>
              <div className="flex items-center mt-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-primary">Sarah Thompson</h4>
                  <p className="text-sm text-gray-600">Homeowner</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 mb-4">"We were impressed with HomeCraft's expertise in planning and executing our bathroom renovation. The quality of work was excellent and they completed the project on time."</p>
              <div className="flex items-center mt-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold text-primary">James Anderson</h4>
                  <p className="text-sm text-gray-600">Homeowner</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
