import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4">
                <span className="text-xl font-bold text-secondary">MapleLuxe</span>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="py-4 px-2 text-white hover:text-secondary transition-colors">Home</Link>
            <Link to="/services" className="py-4 px-2 text-white hover:text-secondary transition-colors">Services</Link>
            <Link to="/about" className="py-4 px-2 text-white hover:text-secondary transition-colors">About</Link>
            <Link to="/contact" className="py-4 px-2 text-white hover:text-secondary transition-colors">Contact</Link>
            <Link to="/quote" className="py-2 px-4 text-white bg-secondary hover:bg-opacity-90 transition-colors rounded-md">Request a Quote</Link>
          </div>

          <div className="md:hidden">
            <button className="text-white hover:text-secondary focus:outline-none">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
