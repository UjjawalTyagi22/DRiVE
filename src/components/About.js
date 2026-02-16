import React from 'react';
import { Target, Users, Globe, Shield } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-white">
            {/* Mission Hero Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-black text-gray-900 mb-8 tracking-tight">
                        Our Mission: A <span className="text-blue-600">Safer</span> Tomorrow
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        DRiVE (Disaster Resilience in Virtual Education) was founded with a single goal:
                        to bridge the gap in disaster management education through technology and interactive learning.
                    </p>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        <div className="text-center group">
                            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                                <Target className="w-8 h-8 text-blue-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Education First</h3>
                            <p className="text-gray-600">Making complex disaster protocols accessible and easy to understand for everyone.</p>
                        </div>

                        <div className="text-center group">
                            <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors">
                                <Users className="w-8 h-8 text-green-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Community Driven</h3>
                            <p className="text-gray-600">Designed to empower schools, colleges, and local communities to act decisively.</p>
                        </div>

                        <div className="text-center group">
                            <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 transition-colors">
                                <Globe className="w-8 h-8 text-purple-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Global Standards</h3>
                            <p className="text-gray-600">Adopting internationally recognized disaster management frameworks for all our drills.</p>
                        </div>

                        <div className="text-center group">
                            <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 transition-colors">
                                <Shield className="w-8 h-8 text-red-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Security & Trust</h3>
                            <p className="text-gray-600">Your safety data and training progress are protected with the highest security standards.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Story Section */}
            <section className="py-20 bg-blue-600 text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-black mb-8">Why DRiVE?</h2>
                            <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                                Traditional disaster drills are often static and easily forgotten. We believe
                                that interactive, gamified simulations provide the "muscle memory" needed
                                to stay calm and effective during real emergencies.
                            </p>
                            <p className="text-lg text-blue-100 leading-relaxed">
                                Our platform uses advanced data analytics and location-based risk assessment
                                to provide training that matters most to you and your specific region.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                                <blockquote className="text-2xl font-medium italic mb-6">
                                    "Disaster management isn't just about survival; it's about preparation, resilience, and the collective strength of a trained community."
                                </blockquote>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-white/20 w-12 h-12 rounded-full overflow-hidden">
                                        <div className="w-full h-full bg-blue-400 flex items-center justify-center font-bold text-white">UT</div>
                                    </div>
                                    <div>
                                        <p className="font-bold">Ujjawal Tyagi</p>
                                        <p className="text-blue-200 text-sm">Lead Developer, DRiVE</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-700 rounded-full blur-[80px] -ml-32 -mb-32 opacity-50"></div>
            </section>
        </div>
    );
};

export default About;
