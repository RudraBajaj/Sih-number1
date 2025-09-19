import React from 'react';
import logoRemoved from '../../assets/images/logo-removed.png';
const Header = ({ userRole = 'student' }) => {
    const getUserRoleConfig = () => {
        switch (userRole) {
            case 'student':
                return {
                    logo: 'AlumNexus',
                    navItems: ['Dashboard', 'Events'],
                    userColor: 'bg-blue-500'
                };
            case 'alumni':
                return {
                    logo: 'AlumNexus',
                    navItems: ['Dashboard', 'Events', 'Mentoring'],
                    userColor: 'bg-green-500'
                };
            case 'admin':
                return {
                    logo: 'AlumNexus',
                    navItems: ['Dashboard', 'Users', 'Events', 'Analytics'],
                    userColor: 'bg-purple-500'
                };
            default:
                return {
                    logo: 'AlumNexus',
                    navItems: ['Dashboard'],
                    userColor: 'bg-gray-500'
                };
        }
    };

    const config = getUserRoleConfig();

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <img
                            src={logoRemoved}
                            alt="AlumNexus Logo"
                            className="w-8 h-8 rounded object-cover"
                        />
                        <span className="text-xl font-bold text-gray-900">{config.logo}</span>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {config.navItems.map((item, index) => (
                            <button
                                key={index}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${item === 'Dashboard'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {item === 'Dashboard' && (
                                    <span className="mr-2">📊</span>
                                )}
                                {item === 'Events' && (
                                    <span className="mr-2">📅</span>
                                )}
                                {item}
                            </button>
                        ))}
                    </nav>

                    {/* User Profile */}
                    <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${config.userColor} rounded-full flex items-center justify-center`}>
                            <span className="text-white font-medium text-sm">A</span>
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;