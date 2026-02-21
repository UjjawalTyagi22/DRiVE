import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Footer = () => {
  const { isAuthenticated } = useAuth();
  const authLink = isAuthenticated ? "/modules" : "/signup";

  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* SafeLearn Brand */}
        <div>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-xl font-bold">DRiVE</span>
          </div>
          <p className="text-gray-300 mb-5">
            Empowering students and educators with comprehensive disaster management education for a safer tomorrow.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/ujjawal-tyagi-1399912a5/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        {/* Platform */}
        <div>
          <h3 className="text-white font-bold mb-6 tracking-wider uppercase text-xs">Platform</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to={authLink} className="hover:text-white">Courses</Link></li>
            <li><Link to={authLink} className="hover:text-white">Simulations</Link></li>
            <li><Link to={authLink} className="hover:text-white">Virtual Drills</Link></li>
            <li><Link to={authLink} className="hover:text-white">Resources</Link></li>
          </ul>
        </div>
        {/* Support */}
        <div>
          <h3 className="text-white font-bold mb-6 tracking-wider uppercase text-xs">Support</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to={authLink} className="hover:text-white">Help Center</Link></li>
            <li><Link to={authLink} className="hover:text-white">Documentation</Link></li>
            <li><Link to={authLink} className="hover:text-white">Training</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>
        {/* Company */}
        <div>
          <h3 className="text-white font-bold mb-6 tracking-wider uppercase text-xs">Company</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to={authLink} className="hover:text-white">Careers</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      {/* Bottom copyright area */}
      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
        © 2026 DRiVE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
