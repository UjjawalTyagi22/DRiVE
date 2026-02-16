import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Thank you for your message! Our team will get back to you shortly.');
    };

    return (
        <div className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-600">Have questions? We're here to help you build a safer tomorrow.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Support Channels</h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-2xl">
                                        <Mail className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Email Support</p>
                                        <p className="text-gray-600">ujjawalt207@gmail.com</p>
                                        <p className="text-sm text-gray-400 mt-1">Typical response: 2-4 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-100 p-3 rounded-2xl">
                                        <Phone className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Phone Support</p>
                                        <p className="text-gray-600">+91 123456789</p>
                                        <p className="text-sm text-gray-400 mt-1">Mon-Fri: 9AM - 6PM IST</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-100 p-3 rounded-2xl">
                                        <MapPin className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Location</p>
                                        <p className="text-gray-600">Ghaziabad, Uttar Pradesh, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl transform hover:scale-[1.02] transition-transform">
                            <h3 className="text-xl font-bold mb-2">Academic Partnerships</h3>
                            <p className="text-blue-100 mb-4">Looking to implement DRiVE in your school or institution? Contact our academic outreach team directly.</p>
                            <span className="font-bold border-b-2 border-white/30 pb-1">ujjawalt207@gmail.com</span>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {status && (
                                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-sm font-medium">
                                    {status}
                                </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="" required />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Work Email</label>
                                <input type="email" className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="" required />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                <textarea className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 h-32 resize-none" placeholder="How can we help your institution?" required></textarea>
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-2">
                                <Send className="w-5 h-5" />
                                <span>Send Inquiry</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
