'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="px-4 md:px-6 py-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link href={"/"} className="text-3xl font-extrabold">Relocately</Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              <Link href={"/blogs"} className="text-gray-600 hover:text-gray-900 font-semibold">Blogs</Link>
              <Link href={"/contact"} className="text-gray-600 hover:text-gray-900 font-semibold">Contact</Link>
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 text-gray-700 border rounded-lg">English</button>
              <button className="px-4 py-2 bg-black text-white rounded-lg">Start now →</button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 py-2">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 py-2">Blog</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 py-2">Country guides</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 py-2">Services</a>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <button className="px-4 py-2 text-gray-700 border rounded-lg w-full">English</button>
                <button className="px-4 py-2 bg-black text-white rounded-lg w-full">Start now →</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}