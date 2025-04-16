import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-8 mt-auto">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-col items-center md:items-start gap-2">
        <span className="font-bold text-lg">Fittounsi</span>
        <span className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Fittounsi. All rights reserved.</span>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Link to="/about-us" className="hover:underline text-gray-300">About Us</Link>
        <a href="mailto:contact@fittounsi.com" className="hover:underline text-gray-300">Contact</a>
        <div className="flex gap-2">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 text-gray-300">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 text-gray-300">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 text-gray-300">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
        <Link to="/privacy-policy" className="hover:underline text-gray-300">Privacy Policy</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
