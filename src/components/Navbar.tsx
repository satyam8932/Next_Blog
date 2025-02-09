'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="px-4 md:px-6 py-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link href={"/"} className="text-3xl font-extrabold">MetaExpat</Link>

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
              <LanguageSwitcher />
              <Link href={"/action"}>
                <button className="px-4 py-2 bg-black text-white rounded-lg">Start now →</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link href={"/blogs"} className="text-gray-600 hover:text-gray-900 font-semibold">Blogs</Link>
              <Link href={"/contact"} className="text-gray-600 hover:text-gray-900 font-semibold">Contact</Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <LanguageSwitcher />
                <Link href={"/action"}>
                  <button className="px-4 py-2 bg-black text-white rounded-lg">Start now →</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}