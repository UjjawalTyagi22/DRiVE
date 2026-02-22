import React, { useRef } from 'react';
import { Shield, Award, Calendar, Download, Share2, CheckCircle2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const Certificate = ({ userName, moduleTitle, date, certificateId }) => {
    const certificateRef = useRef();

    const handleDownload = () => {
        const element = certificateRef.current;
        const opt = {
            margin: 0,
            filename: `Certificate_${moduleTitle.replace(/\s+/g, '_')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="max-w-4xl mx-auto p-2 md:p-4 animate-in fade-in zoom-in duration-700">
            <div
                ref={certificateRef}
                className="relative bg-white border-[6px] md:border-[16px] border-double border-blue-900/10 p-6 md:p-20 shadow-2xl rounded-sm overflow-hidden"
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-blue-50 rounded-full -mr-16 md:-mr-32 -mt-16 md:-mt-32 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-blue-50 rounded-full -ml-16 md:-ml-32 -mb-16 md:-mb-32 opacity-50"></div>
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>

                {/* Certificate Content */}
                <div className="relative z-10 text-center">
                    {/* Shield Icon */}
                    <div className="flex justify-center mb-4 md:mb-10">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 animate-pulse"></div>
                            <Shield className="w-10 h-10 md:w-20 md:h-20 text-blue-900 relative" />
                            <Award className="w-5 h-5 md:w-8 md:h-8 text-amber-500 absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-white rounded-full p-0.5 md:p-1 shadow-lg" />
                        </div>
                    </div>

                    <p className="text-blue-900 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm mb-2 md:mb-4">
                        Certificate of Achievement
                    </p>

                    <h1 className="text-gray-500 font-serif text-sm md:text-lg mb-3 md:mb-8">
                        This is to certify that
                    </h1>

                    <h2 className="text-2xl md:text-5xl font-black text-gray-900 mb-3 md:mb-8 underline decoration-blue-900/20 underline-offset-4 md:underline-offset-8">
                        {userName || "Valued Learner"}
                    </h2>

                    <p className="text-gray-600 font-serif text-sm md:text-lg mb-4 md:mb-10 mx-auto max-w-xs md:max-w-xl leading-relaxed">
                        has successfully completed the comprehensive professional training module in
                    </p>

                    <h3 className="text-base md:text-3xl font-black text-blue-900 mb-6 md:mb-12 uppercase tracking-wide">
                        {moduleTitle || "Disaster Management & Safety"}
                    </h3>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-3 gap-2 md:gap-12 items-center mt-6 md:mt-16 pt-6 md:pt-12 border-t border-gray-100">
                        {/* Date */}
                        <div className="text-center">
                            <div className="font-serif italic text-gray-400 text-xs md:text-base mb-1 md:mb-2">
                                October 20, 2024
                            </div>
                            <div className="h-0.5 bg-gray-200 w-full mb-1 md:mb-2"></div>
                            <p className="text-[8px] md:text-xs font-black uppercase tracking-widest text-gray-500 flex items-center justify-center">
                                <Calendar className="w-2 h-2 md:w-3 md:h-3 mr-0.5 md:mr-1" />
                                Date of Issue
                            </p>
                        </div>

                        {/* Verified Seal */}
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 md:w-24 md:h-24 rounded-full border-2 md:border-4 border-amber-400/30 flex items-center justify-center mb-1 md:mb-2 relative">
                                <div className="absolute inset-1 md:inset-2 border border-dashed md:border-2 border-amber-400/20 rounded-full"></div>
                                <CheckCircle2 className="w-5 h-5 md:w-12 md:h-12 text-amber-500" />
                            </div>
                            <p className="text-[7px] md:text-[10px] font-black uppercase tracking-widest text-amber-600">
                                Verified
                            </p>
                        </div>

                        {/* Signature */}
                        <div className="text-center">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Signature_of_Joe_Biden.svg"
                                alt="Signature"
                                className="h-6 md:h-12 mx-auto mb-1 md:mb-2 opacity-70 grayscale contrast-125"
                            />
                            <div className="h-0.5 bg-gray-200 w-full mb-1 md:mb-2"></div>
                            <p className="text-[8px] md:text-xs font-black uppercase tracking-widest text-gray-500">
                                Director
                            </p>
                        </div>
                    </div>

                    {/* Verification ID */}
                    <div className="mt-4 md:mt-16 pt-3 md:pt-8 text-[7px] md:text-[10px] font-mono text-gray-400 uppercase tracking-tighter">
                        ID: {certificateId || "SAFE-2024-XXXX-XXXX"}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 md:mt-12 flex justify-center space-x-3 md:space-x-4 no-print">
                <button
                    onClick={handleDownload}
                    className="flex items-center space-x-2 bg-blue-900 text-white px-4 md:px-8 py-3 md:py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-blue-900/20 text-sm md:text-base"
                >
                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Download PDF</span>
                </button>
                <button className="flex items-center space-x-2 bg-white text-gray-900 px-4 md:px-8 py-3 md:py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all border border-gray-200 shadow-lg text-sm md:text-base">
                    <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Share</span>
                </button>
            </div>
        </div>
    );
};

export default Certificate;