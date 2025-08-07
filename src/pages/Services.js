import React from 'react';

const Services = () => {
  const services = [
    {
      title: 'Deck & Patio',
      description: 'Create an outdoor living space that extends your home and enhances your lifestyle.',
      features: [
        'Custom deck design',
        'Patio construction',
        'Outdoor kitchens',
        'Fire pits',
        'Pergolas and gazebos',
      ],
    },
    {
      title: 'Landscaping',
      description: 'Enhance your curb appeal with our professional landscaping and hardscaping services.',
      features: [
        'Garden design and installation',
        'Retaining walls',
        'Walkways and paths',
        'Sod and turf installation',
        'Irrigation systems',
      ],
    },
    {
      title: 'Fencing',
      description: 'Secure your property and add privacy with our high-quality fencing solutions.',
      features: [
        'Wood, vinyl, and metal fences',
        'Privacy fences',
        'Decorative fences',
        'Gate installation and repair',
        'Custom fence design',
      ],
    },
    {
      title: 'Residential Carpentry',
      description: 'From structural work to fine details, our carpentry services cover all your residential needs.',
      features: [
        'Framing and structural repairs',
        'Trim and molding installation',
        'Custom shelving and storage',
        'Door and window installation',
        'Staircase construction',
      ],
    },
    {
      title: 'Home Additions',
      description: 'Expand your living space with custom home additions that fit your needs and style.',
      features: [
        'Sunrooms',
        'Master suites',
        'Garage conversions',
        'Second-story additions',
        'In-law suites',
      ],
    },
    {
      title: 'Basement Finishing',
      description: 'Transform your basement into a functional living space with our comprehensive finishing services.',
      features: [
        'Full basement renovations',
        'Wet bar installation',
        'Home theater setup',
        'Egress window installation',
        'Custom storage solutions',
      ],
    },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">Our Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-primary">{service.title}</h2>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <svg className="w-4 h-4 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
