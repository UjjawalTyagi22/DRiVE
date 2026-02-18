import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Main Container - Made slightly smaller */}
      <div className="w-full max-w-5xl">
        {/* Glassmorphism Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row">

            {/* Left Panel - Illustration - Made more compact */}
            <div className="lg:w-1/2 bg-blue-700 relative overflow-hidden rounded-l-3xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-8 left-8 w-28 h-28 bg-white rounded-full"></div>
                <div className="absolute top-28 right-16 w-16 h-16 bg-white rounded-full"></div>
                <div className="absolute bottom-16 left-16 w-24 h-24 bg-white rounded-full"></div>
              </div>

              {/* Content - More compact */}
              <div className="relative z-10 flex flex-col justify-center items-center text-center p-10 text-white min-h-[450px]">
                {/* Hero Illustration - Matching Signup Page */}
                <div className="mb-6">
                  {/* Circular icon container */}
                  <div className="relative group">
                    {/* Outer glow ring */}
                    <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Main circular container */}
                    <div className="relative w-56 h-56 bg-blue-500/10 backdrop-blur-lg rounded-full overflow-hidden shadow-[0_20px_50px_rgba(30,58,138,0.4)] border-2 border-blue-400/30 transition-all duration-500 group-hover:shadow-[0_25px_60px_rgba(30,58,138,0.6)] group-hover:scale-105 flex items-center justify-center">
                      {/* Icon */}
                      <img
                        src="/assets/emergency-siren.png"
                        alt="Emergency Alert"
                        className="w-32 h-32 object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform duration-500"
                        style={{
                          filter: 'brightness(0) saturate(100%) invert(47%) sepia(96%) saturate(2447%) hue-rotate(201deg) brightness(102%) contrast(101%)'
                        }}
                      />

                      {/* Inner overlay for depth */}
                      <div className="absolute inset-0 bg-blue-900/10 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Text Content */}
                <h1 className="text-3xl font-bold mb-5 text-white">
                  Welcome Back to DRiVE
                </h1>
                <p className="text-lg text-blue-100 leading-relaxed max-w-sm mb-8 opacity-90">
                  Continue your disaster preparedness learning journey.
                  <span className="text-blue-50 font-medium block mt-1">Build resilience, save lives.</span>
                </p>

                {/* Enhanced Stats - Slightly smaller */}
                <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
                  <div className="group cursor-pointer">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                      <div className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors">50K+</div>
                      <div className="text-blue-200 text-xs font-medium mt-1">Students</div>
                      <div className="w-6 h-0.5 bg-blue-400 mx-auto mt-1.5 rounded-full"></div>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                      <div className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors">500+</div>
                      <div className="text-blue-200 text-xs font-medium mt-1">Schools</div>
                      <div className="w-6 h-0.5 bg-emerald-400 mx-auto mt-1.5 rounded-full"></div>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                      <div className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors">95%</div>
                      <div className="text-blue-200 text-xs font-medium mt-1">Success</div>
                      <div className="w-6 h-0.5 bg-purple-400 mx-auto mt-1.5 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Form - More compact */}
            <div className="lg:w-1/2 p-10">
              <div className="max-w-sm mx-auto">
                {/* Header */}
                <div className="text-center mb-7">
                  <div className="flex justify-center items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      <span className="text-white font-bold text-2xl">D</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                  <p className="text-gray-600">Enter your credentials to access your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      placeholder="Enter your email"
                      disabled={loading}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      placeholder="Enter your password"
                      disabled={loading}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>

                  {/* Links */}
                  <div className="text-center space-y-4">
                    <p className="text-gray-600">
                      Don't have an account?{' '}
                      <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                        Create one
                      </Link>
                    </p>
                    <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm block">
                      ← Back to Home
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
