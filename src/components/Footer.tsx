import React from 'react';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0A0B14] text-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row space-y-7 justify-between mb-5">
          <div>
            <h3 className="text-2xl font-bold mb-6">MetaExpat</h3>
            <p className="text-gray-400 mb-4">Monday - Friday, 9 AM - 6 PM</p>
            <p className="text-gray-400">support@metaexpat.com</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/blogs" className="hover:text-white">Blogs</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Youtube</a></li>
              <li><a href="#" className="hover:text-white">Facebook</a></li>
              <li><a href="#" className="hover:text-white">TikTok</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between pt-8 border-t border-gray-800 text-gray-400 text-sm space-y-4 md:space-y-0">
          <p>© {year} MetaExpat. All Rights Reserved.</p>
          <div className="space-x-4">
            <a href="/policy" className="hover:text-white">Privacy policy</a>
            <a href="/terms" className="hover:text-white">Terms and conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}