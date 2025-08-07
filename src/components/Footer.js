import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; 2025 MapleLuxe. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
