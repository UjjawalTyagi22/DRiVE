import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    AcademicCapIcon,
    UserCircleIcon,
    BellIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

const DashboardLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Welcome to DRiVE!', message: 'Start your disaster preparedness journey today.', time: 'Just now', read: false },
        { id: 2, title: 'Profile Tip', message: 'Add a profile photo to personalize your account.', time: '2 hours ago', read: false }
    ]);
    const location = useLocation();

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
        { name: 'Modules', href: '/modules', icon: AcademicCapIcon },
        { name: 'Progress', href: '/progress', icon: ChartBarIcon },
        { name: 'Profile', href: '/profile', icon: UserCircleIcon },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Sidebar / Top Nav */}
            <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link to="/dashboard" className="flex items-center space-x-2">
                               <img src="/logo192.png" alt="DRiVE Logo" className="w-10 h-10 object-contain" />
<span className="text-2xl font-bold">DRiVE</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === item.href ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setIsNotificationsOpen(!isNotificationsOpen);
                                        if (!isNotificationsOpen) markAllRead();
                                    }}
                                    className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    <BellIcon className="w-6 h-6" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                                    )}
                                </button>

                                {/* Notifications Dropdown */}
                                {isNotificationsOpen && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
                                        <div className="px-4 py-2 border-b border-gray-50 flex justify-between items-center">
                                            <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
                                            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">New</span>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.length > 0 ? (
                                                notifications.map(n => (
                                                    <div key={n.id} className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <p className="text-xs font-bold text-gray-900">{n.title}</p>
                                                            <span className="text-[10px] text-gray-400">{n.time}</span>
                                                        </div>
                                                        <p className="text-[11px] text-gray-600 leading-normal">{n.message}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-8 text-center">
                                                    <BellIcon className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                                                    <p className="text-xs text-gray-500 font-medium">No new notifications</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="px-4 py-2 bg-gray-50 text-center">
                                            <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest">View All Activity</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link
                                to="/profile"
                                className="hidden md:flex items-center space-x-3 hover:bg-gray-50 p-1.5 rounded-2xl transition-all group"
                            >
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                                    {user?.profilePhoto ? (
                                        <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        user?.firstName?.charAt(0) || <UserCircleIcon className="w-6 h-6" />
                                    )}
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {user ? `${user.firstName} ${user.lastName}` : 'User'}
                                    </p>
                                </div>
                            </Link>

                            <button
                                onClick={logout}
                                className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                                <span>Logout</span>
                            </button>

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 text-gray-700 hover:text-blue-600"
                            >
                                {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t bg-white">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === item.href ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-gray-200">
                                <button
                                    onClick={logout}
                                    className="flex items-center w-full px-3 py-2 text-red-600 font-medium"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
