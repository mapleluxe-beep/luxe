import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Living Space
            </h1>
            <p className="text-xl mb-8">
              Professional residential contracting services for your home improvement needs
            </p>
            <Link to="/contact" className="inline-block bg-secondary text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">Deck Building</h3>
              <p className="text-gray-600 mb-6">
                Create your perfect outdoor living space with our custom deck building services
              </p>
              <button className="bg-secondary text-primary px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors">
                Learn More
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">Landscaping</h3>
              <p className="text-gray-600 mb-6">
                Transform your outdoor space with our professional landscaping services
              </p>
              <button className="bg-secondary text-primary px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors">
                Learn More
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">Fencing</h3>
              <p className="text-gray-600 mb-6">
                Quality fencing solutions for privacy, security, and aesthetic appeal
              </p>
              <button className="bg-secondary text-primary px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-primary py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Expert Craftsmanship</h3>
              <p className="text-gray-600">
                Our skilled professionals bring years of experience and expertise to every project
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Quality Materials</h3>
              <p className="text-gray-600">
                We use only the finest materials to ensure durability and lasting results
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Timely Completion</h3>
              <p className="text-gray-600">
                We respect your time and schedule, completing projects on time and within budget
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Customer Satisfaction</h3>
              <p className="text-gray-600">
                Your satisfaction is our top priority - we work closely with you to ensure your vision becomes reality
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
