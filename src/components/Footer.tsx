import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#0A0B14] text-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">MetaExpat</h3>
            <p className="text-gray-400 mb-4">24 hours Monday - Friday</p>
            <p className="text-gray-400">support@metaexpat.com</p>
            <p className="text-gray-400">+1 347 745 6101</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Careers <span className="bg-blue-600 text-xs px-2 py-1 rounded">Hiring</span></a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">For Vendors</a></li>
              <li><a href="#" className="hover:text-white">Affiliate Program</a></li>
              <li><a href="#" className="hover:text-white">Services</a></li>
              <li><a href="#" className="hover:text-white">Moving Cost Calculator</a></li>
              <li><a href="#" className="hover:text-white">Country guides</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Socials</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Facebook</a></li>
              <li><a href="#" className="hover:text-white">Facebook Community</a></li>
              <li><a href="#" className="hover:text-white">X / Twitter</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between pt-8 border-t border-gray-800 text-gray-400 text-sm space-y-4 md:space-y-0">
          <p>Copyright © MetaExpat</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-white">Privacy policy</a>
            <a href="#" className="hover:text-white">Terms and conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}