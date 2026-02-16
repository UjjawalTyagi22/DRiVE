import React from 'react';

const Privacy = () => {
    return (
        <div className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-black text-gray-900 mb-8 text-center">Privacy Policy</h1>

                <div className="prose prose-blue max-w-none text-gray-600 space-y-8">
                    <p className="text-lg font-medium italic">Last updated: February 5, 2026</p>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                        <p>We collect information that you provide directly to us, such as when you create an account, participate in virtual simulations, or communicate with us for support. This may include:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Name and email address.</li>
                            <li>Academic institution or school affiliation.</li>
                            <li>Progress data and performance analytics from learning modules.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our disaster management services. Specifically, we use it to:</p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Personalize your learning experience.</li>
                            <li>Generate certifications and progress reports.</li>
                            <li>Monitor the security and performance of our virtual drills.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Security</h2>
                        <p>We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third Parties</h2>
                        <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
