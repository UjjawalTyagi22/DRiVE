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
    <div className="min-h-screen bg-white flex items-center justify-center p-4 selection:bg-blue-100">
      {/* Main Container */}
      <div className="w-full max-w-5xl">
        {/* Professional Card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row">

            {/* Left Panel - Simplified Brand Message */}
            <div className="lg:w-1/2 bg-blue-600 relative overflow-hidden flex flex-col justify-center items-center text-center p-12 text-white min-h-[550px]">
              {/* Subtle pattern for texture */}
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

              <div className="relative z-10 w-full max-w-sm">
                <h1 className="text-5xl font-black mb-8 tracking-tight leading-tight">
                  Master Disaster <br />
                  <span className="text-blue-100">Preparedness.</span>
                </h1>

                <p className="text-blue-50 text-lg leading-relaxed font-medium opacity-90">
                  Join 50,000+ students and professionals in building a safer, more resilient world through expert-led training.
                </p>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                {/* Header */}
                <div className="mb-10 text-center lg:text-left">
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h2>
                  <p className="text-gray-500 font-medium ">Please enter your details to sign in.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-2xl text-sm font-bold flex items-center">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3"></div>
                      {error}
                    </div>
                  )}

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-black-400 ml-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-600 focus:bg-white transition-all text-sm font-normal text-gray-900 outline-none"
                      placeholder="name@example.com"
                      disabled={loading}
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-black-400">
                        Password
                      </label>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-600 focus:bg-white transition-all text-sm font-normal text-gray-900 outline-none placeholder:font-light placeholder:text-gray-400"
                      placeholder="••••••••"
                      disabled={loading}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center text-sm uppercase tracking-widest"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      'Sign In to Dashboard'
                    )}
                  </button>

                  {/* Links */}
                  <div className="pt-6 border-t border-gray-50 space-y-4">
                    <p className="text-sm font-bold text-gray-500 text-center">
                      Don't have an account?{' '}
                      <Link to="/signup" className="text-blue-600 hover:underline">
                        Create one for free
                      </Link>
                    </p>
                    <Link to="/" className="text-xs font-old text-black-400 hover:text-blue-600 uppercase tracking-tighter text-center block transition-colors">
                      ← Return to Homepage
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