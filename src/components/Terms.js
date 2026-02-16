import React from 'react';

const Terms = () => {
    return (
        <div className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-black text-gray-900 mb-8 text-center">Terms of Service</h1>

                <div className="prose prose-blue max-w-none text-gray-600 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing and using the DRiVE (Disaster Resilience in Virtual Education) platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of License</h2>
                        <p>DRiVE grants you a personal, non-transferable, non-exclusive license to use the educational content and tools provided on the platform for individual or classroom learning purposes.</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>You may not modify or copy the materials for commercial gain.</li>
                            <li>You may not use the platform for any illegal activities.</li>
                            <li>You may not attempt to decompile or reverse engineer any software contained on the DRiVE website.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Accuracy of Materials</h2>
                        <p>The materials appearing on the DRiVE website could include technical, typographical, or photographic errors. While we strive for absolute accuracy in our disaster preparedness drills, DRiVE does not warrant that any of the materials on its website are accurate, complete, or current.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitations</h2>
                        <p>In no event shall DRiVE or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DRiVE's website.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Governing Law</h2>
                        <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which our main office is located, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
