import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // 👁️ Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.phone) {
      const phoneRegex = /^[7-9]\d{9}$/; // Strict 10-digit format starting with 7, 8, or 9
      if (!phoneRegex.test(formData.phone)) {
        setError('Incorrect Phone Number');
        return;
      }
    }

    try {
      const { confirmPassword, ...registrationData } = formData;
      const result = await register(registrationData);

      if (result.success) {
        setUserEmail(email);
        setIsSuccess(true);

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Registration error:', error);
    }
  };

  // Success Screen Component (unchanged)
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-blue-600 relative overflow-hidden flex items-center justify-center p-4 font-inter">
        {/* Subtle pattern for texture */}
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

        <div className="w-full max-w-md relative z-10">
          <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-white/20 p-10 lg:p-12 text-center transform transition-all animate-in fade-in zoom-in duration-500">
            {/* Success Icon - Refined */}
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
              <svg className="w-12 h-12 text-blue-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight leading-tight uppercase">Account Verified</h1>
            <p className="text-gray-500 font-medium mb-8">
              Welcome to the community. Your journey to mastery starts now.
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 mb-10 border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Authenticated ID</p>
              <p className="text-blue-600 font-bold text-sm truncate">{userEmail}</p>
            </div>

            {/* Action Area */}
            <div className="space-y-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-[0.98] transition-all duration-200 text-sm uppercase tracking-widest"
              >
                Access Dashboard
              </button>

              <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                Redirecting you in a few seconds...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original Signup Form (with password toggle)
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 selection:bg-blue-100 font-inter">
      {/* Main Container */}
      <div className="w-full max-w-5xl">
        {/* Professional Card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row">

            {/* Left Panel - Brand Value Proposition */}
            <div className="lg:w-1/2 bg-blue-600 relative overflow-hidden flex flex-col justify-center items-center text-center p-12 text-white min-h-[600px]">
              {/* Subtle pattern for texture */}
              <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

              <div className="relative z-10 w-full max-w-sm">
                <h1 className="text-4xl md:text-5xl font-black mb-8 tracking-tight leading-tight">
                  Start Your <br />
                  <span className="text-blue-100">Safety Journey.</span>
                </h1>

                <p className="text-blue-50 text-lg leading-relaxed mb-12 font-medium opacity-90">
                  Join thousands learning life-saving disaster preparedness skills through our professional curriculum.
                </p>

                {/* Simplified Features List - Centered & Aligned */}
                <div className="w-full flex justify-center">
                  <div className="space-y-6 flex flex-col items-start">
                    <div className="flex items-center space-x-4">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <span className="text-blue-50 text-medium font-medium opacity-90">Interactive Learning Modules</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <span className="text-blue-50 text-medium font-medium opacity-90">Expert-Designed Curriculum</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <span className="text-blue-50 text-medium font-medium opacity-90">Progress & Certificates</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                {/* Header */}
                <div className="mb-8 text-center lg:text-left">
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Create Account</h2>
                  <p className="text-gray-500 font-medium text-sm">Join the DRiVE community today.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-5 py-3 rounded-2xl text-sm font-bold flex items-center mb-4">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3"></div>
                      {error}
                    </div>
                  )}

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="firstName" className="text-[10px] font-bold uppercase tracking-widest text-black-400 ml-1">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-600 focus:bg-white transition-all text-sm font-normal text-gray-900 outline-none placeholder:font-light placeholder:text-gray-400"
                        placeholder="First name"
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="lastName" className="text-[10px] font-bold uppercase tracking-widest text-black-400 ml-1">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-600 focus:bg-white transition-all text-sm font-normal text-gray-900 outline-none placeholder:font-light placeholder:text-gray-400"
                        placeholder="Last name"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-black-400 ml-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-600 focus:bg-white transition-all text-sm font-normal text-gray-900 outline-none"
                      placeholder="name@example.com"
                      disabled={loading}
                    />
                  </div>

                  {/* Phone & Location */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-black-400 ml-1">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-600 focus:bg-white transition-all text-sm font-normal text-gray-900 outline-none placeholder:font-light placeholder:text-gray-400"
                        placeholder="10 digits"
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="location" className="text-[10px] font-bold uppercase tracking-widest text-black-400 ml-1">
                        Location
                      </label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-600 focus:bg-white transition-all text-sm font-normal text-gray-900 outline-none placeholder:font-light placeholder:text-gray-400"
                        placeholder="City, State"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Password fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-black-400 ml-1">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-600 focus:bg-white transition-all text-sm font-normal text-gray-900 outline-none"
                        placeholder="••••••••"
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="confirmPassword" className="text-[10px] font-bold uppercase tracking-widest text--400 ml-1">
                        Confirm
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-600 focus:bg-white transition-all text-sm font-normal text-gray-900 outline-none"
                        placeholder="••••••••"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center text-sm uppercase tracking-widest mt-4"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </span>
                    ) : (
                      'Sign Up to DRiVE'
                    )}
                  </button>

                  {/* Links */}
                  <div className="pt-6 border-t border-gray-50 space-y-4">
                    <p className="text-sm font-bold text-gray-500 text-center">
                      Already have an account?{' '}
                      <Link to="/login" className="text-blue-600 hover:underline">
                        Sign In here
                      </Link>
                    </p>
                    <Link to="/" className="text-xs font- text-black-400 hover:text-blue-600 uppercase tracking-tighter text-center block transition-colors">
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

export default Signup;