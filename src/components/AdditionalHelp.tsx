'use client';
import React, { useState } from 'react';
import { Truck, DollarSign, Home, Briefcase, FileText, CreditCard } from 'lucide-react';

type Tab = 'essentials' | 'settle-in' | 'legal-finance';

interface TabContent {
  image: string;
  services: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

const tabsContent: Record<Tab, TabContent> = {
  'essentials': {
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
    services: [
      {
        icon: <Truck className="text-blue-600 flex-shrink-0" size={24} />,
        title: 'Moving Services',
        description: 'Professional packing and transportation of your belongings'
      },
      {
        icon: <Home className="text-blue-600 flex-shrink-0" size={24} />,
        title: 'Storage Solutions',
        description: 'Secure storage facilities for your items during transition'
      }
    ]
  },
  'settle-in': {
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
    services: [
      {
        icon: <Briefcase className="text-blue-600 flex-shrink-0" size={24} />,
        title: 'Job Search Assistance',
        description: 'Help finding employment in your new location'
      },
      {
        icon: <Home className="text-blue-600 flex-shrink-0" size={24} />,
        title: 'Housing Support',
        description: 'Guidance in finding and securing accommodation'
      }
    ]
  },
  'legal-finance': {
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c',
    services: [
      {
        icon: <FileText className="text-blue-600 flex-shrink-0" size={24} />,
        title: 'Visa Assistance',
        description: 'Support with visa applications and documentation'
      },
      {
        icon: <CreditCard className="text-blue-600 flex-shrink-0" size={24} />,
        title: 'Banking Setup',
        description: 'Help setting up local bank accounts and financial services'
      }
    ]
  }
};

export function AdditionalHelp() {
  const [activeTab, setActiveTab] = useState<Tab>('essentials');

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
          <div>
            <span className="text-blue-600">BEYOND MOVING</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Additional help</h2>
          </div>
          <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors mt-4 md:mt-0">View all services →</a>
        </div>

        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab('essentials')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeTab === 'essentials' 
                ? 'bg-blue-600 text-white hover:bg-blue-700 transition-colors' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Essentials
          </button>
          <button 
            onClick={() => setActiveTab('settle-in')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeTab === 'settle-in' 
                ? 'bg-blue-600 text-white hover:bg-blue-700 transition-colors' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Settle-in
          </button>
          <button 
            onClick={() => setActiveTab('legal-finance')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeTab === 'legal-finance' 
                ? 'bg-blue-600 text-white hover:bg-blue-700 transition-colors' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Legal & Finance
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-xl overflow-hidden">
            <img 
              src={tabsContent[activeTab].image}
              alt="Service"
              className="w-full h-64 md:h-96 object-cover transition-opacity duration-300"
            />
          </div>
          <div className="space-y-4">
            {tabsContent[activeTab].services.map((service, index) => (
              <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-2">
                  {service.icon}
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                </div>
                <p className="text-gray-600 ml-12">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}