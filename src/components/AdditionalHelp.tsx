'use client';
import React, { useState } from 'react';
import { Truck, DollarSign, Home, Briefcase, FileText, CreditCard, User } from 'lucide-react';

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
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    services: [
      {
        icon: <User className="text-blue-600 flex-shrink-0" size={24} />,
        title: 'Consultation',
        description: 'Meet with a professional and get help'
      },
      {
        icon: <Home className="text-blue-600 flex-shrink-0" size={24} />,
        title: 'Advice',
        description: 'Professional advice for your next move'
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
    <section className="max-w-7xl mx-auto px-4 md:px-20 py-28 bg-gradient-to-b from-gray-50 to-white rounded-3xl">
      <div className='text-center mb-16'>
        <span className="text-blue-600">BEYOND MOVING</span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">Additional help</h2>
      </div>
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('essentials')}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeTab === 'essentials'
              ? 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
              : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          Essentials
        </button>
        <button
          onClick={() => setActiveTab('settle-in')}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeTab === 'settle-in'
              ? 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
              : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          Settle-in
        </button>
        <button
          onClick={() => setActiveTab('legal-finance')}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeTab === 'legal-finance'
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
    </section>
  );
}