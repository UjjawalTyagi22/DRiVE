import React from 'react';
import { Play, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Hero = ({ stats }) => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side content */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Learn Disaster{' '}
              <span className="text-blue-600">Preparedness</span>
              <span className="md:block"> the Smart Way</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Interactive disaster management education for schools and colleges.
              Learn life-saving skills through gamified lessons, virtual drills,
              and region-specific training.
            </p>
            <div className="flex space-x-4 mb-12">
              <Link to={isAuthenticated ? "/dashboard" : "/signup"} className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Learning
              </Link>
              <button
                onClick={() => alert('Demo coming soon! Sign up to stay updated.')}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Play className="w-5 h-5" />
                <span className="font-semibold">Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-lg mx-auto md:mx-0">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side mockup */}
          <div className="relative group">
            {/* Main Mockup Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 p-2 lg:p-4 transition-transform duration-500 group-hover:scale-[1.02]">
              {/* Browser/System Bar */}
              <div className="flex items-center space-x-2 mb-3 lg:mb-4 px-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>

              {/* Image Container */}
              <div className="rounded-xl overflow-hidden bg-white shadow-inner">
                <img
                  src="/Gemini_Generated_Image_ueu2faueu2faueu2.png"
                  alt="DRiVE Platform Interface"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Status Card */}
              <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex items-center space-x-4 animate-bounce-subtle">
                <div className="bg-green-100 p-2 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Course Verified</div>
                  <div className="text-xs text-gray-500 font-medium tracking-tight">ISO 22301 Standards</div>
                </div>
              </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60 -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;