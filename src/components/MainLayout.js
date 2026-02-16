import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children, hideFooter = false }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            {!hideFooter && <Footer />}
        </div>
    );
};

export default MainLayout;
