import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [darkMode, setDarkMode] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState({
        userRole: 'All Roles',
        dateRange: 'Last 30 days',
        activityType: 'All Activities',
        status: 'All Status'
    });
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [notification, setNotification] = useState(null);

    const profileDropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const statsData = [
        {
            title: "Manage Users",
            subtitle: "Oversee user registrations, approvals, and role management",
            value: "1,247",
            label: "total users",
            growth: "+12.5%",
            color: "blue",
            icon: "👥"
        },
        {
            title: "Create Events",
            subtitle: "Plan and manage institutional events and activities",
            value: "24",
            label: "active events",
            growth: "+8.3%",
            color: "green",
            icon: "📅"
        },
        {
            title: "View Analytics",
            subtitle: "Monitor platform performance and user engagement",
            value: "89",
            label: "engagement rate",
            growth: "+15.2%",
            color: "purple",
            icon: "📊"
        },
        {
            title: "System Reports",
            subtitle: "Generate comprehensive reports and system monitoring",
            value: "156",
            label: "reports generated",
            growth: "+22.1%",
            color: "orange",
            icon: "📋"
        }
    ];

    const [recentUsers, setRecentUsers] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "Alumni",
            status: "Pending",
            joinDate: "2025-09-18",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
        },
        {
            id: 2,
            name: "Sarah Wilson",
            email: "sarah@example.com",
            role: "Student",
            status: "Approved",
            joinDate: "2025-09-17",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=40&h=40&fit=crop&crop=face"
        },
        {
            id: 3,
            name: "Michael Chen",
            email: "michael@example.com",
            role: "Alumni",
            status: "Approved",
            joinDate: "2025-09-16",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
        },
        {
            id: 4,
            name: "Emily Davis",
            email: "emily@example.com",
            role: "Faculty",
            status: "Pending",
            joinDate: "2025-09-15",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
        }
    ]);

    const upcomingEvents = [
        {
            title: "Alumni Meetup 2024",
            date: "Dec 15, 2024",
            attendees: 45,
            status: "Published",
            organizer: "Admin"
        },
        {
            title: "Career Workshop",
            date: "Nov 20, 2024",
            attendees: 23,
            status: "Draft",
            organizer: "Sarah Wilson"
        },
        {
            title: "Tech Talk: AI",
            date: "Nov 10, 2024",
            attendees: 67,
            status: "Published",
            organizer: "Admin"
        }
    ];

    const systemMetrics = [
        { label: "Server Uptime", value: "99.9%", status: "healthy" },
        { label: "Database Performance", value: "Good", status: "healthy" },
        { label: "Active Sessions", value: "234", status: "normal" },
        { label: "Storage Usage", value: "67%", status: "warning" }
    ];

    const handleFilterChange = (filterType, value) => {
        setSelectedFilter(prev => ({
            ...prev,
            [filterType]: value
        }));
        showNotification(`Filter updated: ${filterType} set to ${value}`);
    };

    const resetFilters = () => {
        setSelectedFilter({
            userRole: 'All Roles',
            dateRange: 'Last 30 days',
            activityType: 'All Activities',
            status: 'All Status'
        });
        showNotification('All filters reset successfully');
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleUserAction = (userId, action) => {
        setRecentUsers(prev =>
            prev.map(user =>
                user.id === userId
                    ? { ...user, status: action === 'approve' ? 'Approved' : action === 'reject' ? 'Rejected' : user.status }
                    : user
            )
        );
        showNotification(`User ${action}d successfully`);
    };


    const handleChangePassword = () => {
        setShowChangePasswordModal(true);
        setProfileDropdownOpen(false);
    };

    const getStatusColor = (status) => {
        if (darkMode) {
            const colors = {
                "Pending": "bg-yellow-900 text-yellow-300 border-yellow-700",
                "Approved": "bg-green-900 text-green-300 border-green-700",
                "Rejected": "bg-red-900 text-red-300 border-red-700",
                "Published": "bg-green-900 text-green-300 border-green-700",
                "Draft": "bg-gray-700 text-gray-300 border-gray-600",
                "healthy": "bg-green-900 text-green-300 border-green-700",
                "warning": "bg-yellow-900 text-yellow-300 border-yellow-700",
                "normal": "bg-blue-900 text-blue-300 border-blue-700"
            };
            return colors[status] || "bg-gray-700 text-gray-300 border-gray-600";
        } else {
            const colors = {
                "Pending": "bg-yellow-100 text-yellow-800 border-yellow-200",
                "Approved": "bg-green-100 text-green-800 border-green-200",
                "Rejected": "bg-red-100 text-red-800 border-red-200",
                "Published": "bg-green-100 text-green-800 border-green-200",
                "Draft": "bg-gray-100 text-gray-800 border-gray-200",
                "healthy": "bg-green-100 text-green-800 border-green-200",
                "warning": "bg-yellow-100 text-yellow-800 border-yellow-200",
                "normal": "bg-blue-100 text-blue-800 border-blue-200"
            };
            return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const themeClasses = darkMode
        ? "bg-gray-900 text-white"
        : "bg-gray-50 text-gray-900";

    const cardClasses = darkMode
        ? "bg-gray-800 border-gray-700"
        : "bg-white border-gray-200";

    const hoverClasses = darkMode
        ? "hover:bg-gray-700"
        : "hover:bg-gray-100";

    return (
        <div className={`min-h-screen transition-colors duration-300 ${themeClasses}`}>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Top Navigation Bar */}
                <div className={`flex justify-between items-center mb-6 p-4 rounded-xl shadow-sm border ${cardClasses}`}>
                    <div>
                        <h1 className="text-2xl font-bold">Admin Panel</h1>
                        <p className="text-sm opacity-70">Welcome back, Administrator</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`p-2 rounded-lg transition-colors ${hoverClasses}`}
                            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>

                        {/* Profile Badge */}
                        <div className="relative" ref={profileDropdownRef}>
                            <button
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${hoverClasses}`}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full border-2 border-blue-500"
                                />
                                <div className="text-left">
                                    <div className="font-semibold text-sm">Admin User</div>
                                    <div className="text-xs opacity-70">Super Admin</div>
                                </div>
                                <svg className={`w-4 h-4 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Profile Dropdown */}
                            {profileDropdownOpen && (
                                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${cardClasses}`}>
                                    <div className="py-2">
                                        <button
                                            onClick={handleChangePassword}
                                            className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${hoverClasses}`}
                                        >
                                            🔒 Change Password
                                        </button>
                                        <button>
                                            <Link
                                                to="/login"
                                                
                                                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 text-red-600 hover:bg-red-50 ${darkMode ? 'hover:bg-red-900/20' : ''}`}
                                            >
                                                🚪 Logout
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Notification */}
                {notification && (
                    <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
                        {notification}
                    </div>
                )}

                {/* Header */}
                <header className="mb-6 text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                    <p className="text-lg font-medium opacity-80">
                        Monitor and manage your platform with powerful analytics
                    </p>
                </header>

                {/* Tab Navigation */}
                <nav className={`flex flex-wrap gap-1 sm:gap-2 mb-6 p-1 rounded-xl shadow-sm border ${cardClasses}`}>
                    {['overview', 'users', 'events', 'analytics'].map((tab) => (
                        <button
                            key={tab}
                            className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all capitalize ${activeTab === tab
                                ? 'bg-blue-600 text-white shadow-md'
                                : `opacity-70 ${hoverClasses}`
                                }`}
                            onClick={() => {
                                setActiveTab(tab);
                                showNotification(`Switched to ${tab} tab`);
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                {/* Filters Section */}
                <div className={`rounded-xl p-4 sm:p-6 mb-6 shadow-sm border ${cardClasses}`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold uppercase tracking-wide">
                                User Role
                            </label>
                            <select
                                className={`w-full px-3 py-2 rounded-lg font-medium text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-gray-50 border-gray-200 text-gray-900'
                                    }`}
                                value={selectedFilter.userRole}
                                onChange={(e) => handleFilterChange('userRole', e.target.value)}
                            >
                                <option>All Roles</option>
                                <option>Alumni</option>
                                <option>Student</option>
                                <option>Faculty</option>
                                <option>Admin</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold uppercase tracking-wide">
                                Date Range
                            </label>
                            <select
                                className={`w-full px-3 py-2 rounded-lg font-medium text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-gray-50 border-gray-200 text-gray-900'
                                    }`}
                                value={selectedFilter.dateRange}
                                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                            >
                                <option>Last 30 days</option>
                                <option>Last 7 days</option>
                                <option>Last 90 days</option>
                                <option>This year</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold uppercase tracking-wide">
                                Activity Type
                            </label>
                            <select
                                className={`w-full px-3 py-2 rounded-lg font-medium text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-gray-50 border-gray-200 text-gray-900'
                                    }`}
                                value={selectedFilter.activityType}
                                onChange={(e) => handleFilterChange('activityType', e.target.value)}
                            >
                                <option>All Activities</option>
                                <option>Registrations</option>
                                <option>Events</option>
                                <option>Communications</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold uppercase tracking-wide">
                                Status
                            </label>
                            <select
                                className={`w-full px-3 py-2 rounded-lg font-medium text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-gray-50 border-gray-200 text-gray-900'
                                    }`}
                                value={selectedFilter.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                            >
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Pending</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => showNotification('Filters applied successfully')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors"
                        >
                            Apply Filters
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${darkMode
                                ? 'bg-gray-600 text-white hover:bg-gray-700'
                                : 'bg-gray-500 text-white hover:bg-gray-600'
                                }`}
                            onClick={resetFilters}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {statsData.map((stat, index) => (
                        <div
                            key={index}
                            className={`rounded-xl p-4 shadow-sm border transition-all cursor-pointer transform hover:scale-105 ${cardClasses} ${hoverClasses}`}
                            onClick={() => showNotification(`Viewing ${stat.title} details`)}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="text-2xl">{stat.icon}</div>
                                <div>
                                    <h3 className="text-lg font-bold">{stat.title}</h3>
                                    <p className="text-sm opacity-70">{stat.subtitle}</p>
                                </div>
                            </div>
                            <div className="text-2xl font-black mb-1">{stat.value}</div>
                            <div className="text-sm opacity-70 uppercase tracking-wide font-semibold">
                                {stat.label}
                            </div>
                            <div className="text-sm text-green-600 font-bold mt-1">{stat.growth}</div>
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Recent Users */}
                    <div className={`rounded-xl shadow-sm border ${cardClasses}`}>
                        <div className={`flex justify-between items-center p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div>
                                <h2 className="text-xl font-bold">Recent Users</h2>
                                <p className="text-sm opacity-70">Manage user registrations and role requests</p>
                            </div>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors"
                                onClick={() => {
                                    setShowAddUserModal(true);
                                    showNotification('Opening add user modal...');
                                }}
                            >
                                Add User
                            </button>
                        </div>

                        <div className="p-4 space-y-3">
                            {recentUsers.map((user, index) => (
                                <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                    }`}>
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-lg object-cover border-2 border-gray-200"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-sm truncate">{user.name}</div>
                                        <div className="opacity-70 text-sm truncate">{user.email}</div>
                                    </div>
                                    <div className="flex gap-1">
                                        {user.status === 'Pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleUserAction(user.id, 'approve')}
                                                    className="px-2 py-1 bg-green-600 text-white rounded text-xs font-bold hover:bg-green-700 transition-colors"
                                                >
                                                    ✓
                                                </button>
                                                <button
                                                    onClick={() => handleUserAction(user.id, 'reject')}
                                                    className="px-2 py-1 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700 transition-colors"
                                                >
                                                    ✗
                                                </button>
                                            </>
                                        )}
                                        <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${getStatusColor(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className={`rounded-xl shadow-sm border ${cardClasses}`}>
                        <div className={`flex justify-between items-center p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div>
                                <h2 className="text-xl font-bold">Upcoming Events</h2>
                                <p className="text-sm opacity-70">Manage institutional events and attendance</p>
                            </div>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors"
                                onClick={() => {
                                    setShowCreateEventModal(true);
                                    showNotification('Opening create event modal...');
                                }}
                            >
                                Create Event
                            </button>
                        </div>

                        <div className="p-4 space-y-3">
                            {upcomingEvents.map((event, index) => (
                                <div key={index} className={`p-3 rounded-lg border transition-colors cursor-pointer ${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                    }`}
                                    onClick={() => showNotification(`Viewing ${event.title} details`)}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="font-bold text-sm">{event.title}</div>
                                            <div className="opacity-70 text-sm">{event.date}</div>
                                        </div>
                                        <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${getStatusColor(event.status)}`}>
                                            {event.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="opacity-70">By {event.organizer}</span>
                                        <span className="text-green-600 font-semibold">{event.attendees} attendees</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* System Metrics */}
                <div className={`rounded-xl p-4 sm:p-6 mb-6 shadow-sm border ${cardClasses}`}>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold">System Metrics</h2>
                        <p className="text-sm opacity-70">Real-time system performance monitoring</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {systemMetrics.map((metric, index) => (
                            <div key={index} className={`p-4 rounded-lg border text-center cursor-pointer transition-all hover:scale-105 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                                }`}
                                onClick={() => showNotification(`Viewing ${metric.label} details`)}
                            >
                                <div className="text-sm opacity-70 uppercase tracking-wide font-semibold mb-2">
                                    {metric.label}
                                </div>
                                <div className="text-xl font-black">
                                    {metric.value}
                                    <span className={`ml-2 px-2 py-1 rounded text-xs font-bold border ${getStatusColor(metric.status)}`}>
                                        {metric.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Table */}
                <div className={`rounded-xl shadow-sm border overflow-hidden ${cardClasses}`}>
                    <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h2 className="text-xl font-bold">User Management</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-full">
                            <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide">User</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide">Role</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide">Status</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide">Join Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                {recentUsers.map((user, index) => (
                                    <tr key={index} className={`transition-colors ${hoverClasses}`}>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-8 h-8 rounded-lg object-cover border border-gray-200"
                                                />
                                                <div>
                                                    <div className="font-bold text-sm">{user.name}</div>
                                                    <div className="opacity-70 text-xs">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-bold border ${darkMode
                                                ? 'bg-blue-900 text-blue-300 border-blue-700'
                                                : 'bg-blue-100 text-blue-800 border-blue-200'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-bold border ${getStatusColor(user.status)}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm">{user.joinDate}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-wrap gap-1">
                                                <button
                                                    onClick={() => handleUserAction(user.id, 'approve')}
                                                    className="px-2 py-1 bg-green-600 text-white rounded text-xs font-bold hover:bg-green-700 transition-colors"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => showNotification(`Editing ${user.name}...`)}
                                                    className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleUserAction(user.id, 'reject')}
                                                    className="px-2 py-1 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700 transition-colors"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modals */}
                {showChangePasswordModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className={`rounded-lg p-6 max-w-md w-full mx-4 ${cardClasses}`}>
                            <h3 className="text-lg font-bold mb-4">Change Password</h3>
                            <div className="space-y-4">
                                <input
                                    type="password"
                                    placeholder="Current Password"
                                    className={`w-full px-3 py-2 rounded-lg border ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-gray-50 border-gray-200 text-gray-900'
                                        }`}
                                />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    className={`w-full px-3 py-2 rounded-lg border ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-gray-50 border-gray-200 text-gray-900'
                                        }`}
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm New Password"
                                    className={`w-full px-3 py-2 rounded-lg border ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-gray-50 border-gray-200 text-gray-900'
                                        }`}
                                />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => {
                                        showNotification('Password changed successfully');
                                        setShowChangePasswordModal(false);
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
                                >
                                    Update Password
                                </button>
                                <button
                                    onClick={() => setShowChangePasswordModal(false)}
                                    className={`px-4 py-2 rounded-lg font-bold transition-colors ${darkMode
                                        ? 'bg-gray-600 text-white hover:bg-gray-700'
                                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                        }`}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}