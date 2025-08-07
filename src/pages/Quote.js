import React from 'react';

const Quote = () => {
  const services = [
    'Deck & Patio',
    'Landscaping',
    'Fencing',
    'Residential Carpentry',
    'Home Additions',
    'Basement Finishing',
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">Request a Quote</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-primary">Tell Us About Your Project</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input type="text" id="name" className="w-full p-3 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input type="tel" id="phone" className="w-full p-3 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Address
                </label>
                <input type="text" id="address" className="w-full p-3 border border-gray-300 rounded-md" />
              </div>
            </div>
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                Service of Interest
              </label>
              <select id="service" className="w-full p-3 border border-gray-300 rounded-md">
                <option>Select a service...</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Project Description
              </label>
              <textarea id="description" rows="6" className="w-full p-3 border border-gray-300 rounded-md"></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-secondary text-primary py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors font-semibold"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Quote;
