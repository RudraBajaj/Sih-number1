import React, { useState } from 'react';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedFilter, setSelectedFilter] = useState({
        userRole: 'All Roles',
        dateRange: 'Last 30 days',
        activityType: 'All Activities',
        status: 'All Status'
    });
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);

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

    const recentUsers = [
        { name: "John Doe", email: "john@example.com", role: "Alumni", status: "Pending", joinDate: "2025-09-18", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
        { name: "Sarah Wilson", email: "sarah@example.com", role: "Student", status: "Approved", joinDate: "2025-09-17", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=40&h=40&fit=crop&crop=face" },
        { name: "Michael Chen", email: "michael@example.com", role: "Alumni", status: "Approved", joinDate: "2025-09-16", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
        { name: "Emily Davis", email: "emily@example.com", role: "Faculty", status: "Pending", joinDate: "2025-09-15", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" }
    ];

    const upcomingEvents = [
        { title: "Alumni Meetup 2024", date: "Dec 15, 2024", attendees: 45, status: "Published", organizer: "Admin" },
        { title: "Career Workshop", date: "Nov 20, 2024", attendees: 23, status: "Draft", organizer: "Sarah Wilson" },
        { title: "Tech Talk: AI", date: "Nov 10, 2024", attendees: 67, status: "Published", organizer: "Admin" }
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
    };

    const resetFilters = () => {
        setSelectedFilter({
            userRole: 'All Roles',
            dateRange: 'Last 30 days',
            activityType: 'All Activities',
            status: 'All Status'
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            "Pending": "badge-warning",
            "Approved": "badge-success",
            "Rejected": "badge-danger",
            "Published": "badge-success",
            "Draft": "badge-secondary",
            "healthy": "badge-success",
            "warning": "badge-warning",
            "normal": "badge-primary"
        };
        return colors[status] || "badge-secondary";
    };

    return (
        <div className="alumni-dashboard-container">
            {/* Add User Modal */}
            {showAddUserModal && (
                <div className="modal-overlay" onClick={() => setShowAddUserModal(false)}>
                    <div
                        className="modal-content max-w-2xl w-full p-6 sm:p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Add New User</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" placeholder="Full Name" className="input" />
                            <input type="email" placeholder="Email Address" className="input" />
                            <input type="tel" placeholder="Phone Number" className="input" />
                            <select className="input">
                                <option>Select Role</option>
                                <option>Alumni</option>
                                <option>Student</option>
                                <option>Faculty</option>
                                <option>Admin</option>
                            </select>
                            <input type="text" placeholder="Batch/Year" className="input" />
                            <input type="text" placeholder="Department" className="input" />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                onClick={() => setShowAddUserModal(false)}
                                className="btn btn-primary flex-1 py-3"
                            >
                                Add User
                            </button>
                            <button
                                onClick={() => setShowAddUserModal(false)}
                                className="btn btn-secondary py-3 px-6"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Event Modal */}
            {showCreateEventModal && (
                <div className="modal-overlay" onClick={() => setShowCreateEventModal(false)}>
                    <div
                        className="modal-content max-w-2xl w-full p-6 sm:p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Create New Event</h3>
                        <div className="space-y-4">
                            <input type="text" placeholder="Event Title" className="input" />
                            <textarea placeholder="Event Description" className="input resize-none" rows="3" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="datetime-local" className="input" />
                                <input type="text" placeholder="Location" className="input" />
                                <select className="input">
                                    <option>Select Category</option>
                                    <option>Networking</option>
                                    <option>Career</option>
                                    <option>Technology</option>
                                    <option>Business</option>
                                </select>
                                <input type="number" placeholder="Max Attendees" className="input" />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                onClick={() => setShowCreateEventModal(false)}
                                className="btn btn-success flex-1 py-3"
                            >
                                Create Event
                            </button>
                            <button
                                onClick={() => setShowCreateEventModal(false)}
                                className="btn btn-secondary py-3 px-6"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full min-h-screen pt-20 px-2 sm:px-4 lg:px-6 py-6">
                <div className="w-full max-w-[98vw] mx-auto">

                    {/* Admin Navigation */}
                    <div className="glass-card p-2 mb-6 sm:mb-8 animate-fade-in">
                        <div className="flex space-x-1 overflow-x-auto">
                            {[
                                { id: 'overview', name: 'Overview', icon: '📊' },
                                { id: 'users', name: 'User Management', icon: '👥' },
                                { id: 'events', name: 'Events', icon: '📅' },
                                { id: 'analytics', name: 'Analytics', icon: '📈' },
                                { id: 'monitoring', name: 'System Monitoring', icon: '🖥️' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`btn flex-shrink-0 py-3 px-4 sm:px-6 text-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {activeTab === 'overview' && (
                        <>
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {statsData.map((stat, index) => (
                                    <div
                                        key={index}
                                        className={`glass-card card-hover p-6 animate-slide-up animated-border`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                                                <span className="text-2xl">{stat.icon}</span>
                                            </div>
                                            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                                                {stat.growth}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">{stat.title}</h3>
                                        <p className="text-slate-600 text-sm mb-4">{stat.subtitle}</p>
                                        <div className="flex items-baseline space-x-2">
                                            <span className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</span>
                                            <span className="text-slate-500 text-sm">{stat.label}</span>
                                        </div>
                                        <div className="mt-4">
                                            <button className="btn btn-secondary w-full text-sm">
                                                {stat.title.split(' ')[0]} {stat.title.split(' ')[1]} →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Filters */}
                            <div className="glass-card p-6 mb-8 animate-fade-in">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center mb-4 sm:mb-0">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                                        </svg>
                                        Quick Filters
                                    </h3>
                                    <button
                                        onClick={resetFilters}
                                        className="btn btn-secondary text-sm px-4 py-2"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Reset
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">User Role</label>
                                        <select
                                            value={selectedFilter.userRole}
                                            onChange={(e) => handleFilterChange('userRole', e.target.value)}
                                            className="input"
                                        >
                                            <option>All Roles</option>
                                            <option>Alumni</option>
                                            <option>Students</option>
                                            <option>Faculty</option>
                                            <option>Admin</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
                                        <select
                                            value={selectedFilter.dateRange}
                                            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                                            className="input"
                                        >
                                            <option>Last 30 days</option>
                                            <option>Last 7 days</option>
                                            <option>This Month</option>
                                            <option>Last Month</option>
                                            <option>This Year</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Activity Type</label>
                                        <select
                                            value={selectedFilter.activityType}
                                            onChange={(e) => handleFilterChange('activityType', e.target.value)}
                                            className="input"
                                        >
                                            <option>All Activities</option>
                                            <option>Registrations</option>
                                            <option>Events</option>
                                            <option>Donations</option>
                                            <option>Logins</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                                        <select
                                            value={selectedFilter.status}
                                            onChange={(e) => handleFilterChange('status', e.target.value)}
                                            className="input"
                                        >
                                            <option>All Status</option>
                                            <option>Active</option>
                                            <option>Pending</option>
                                            <option>Suspended</option>
                                            <option>Archived</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    <span className="badge badge-primary">Students Only</span>
                                    <span className="badge badge-success">Alumni Only</span>
                                    <span className="badge badge-warning">Pending Approval</span>
                                    <span className="badge badge-secondary">This Week</span>
                                </div>
                            </div>

                            {/* Management Sections */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* User Management */}
                                <div className="glass-card p-6 animate-slide-up">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold text-slate-900">User Management</h3>
                                        <button
                                            onClick={() => setShowAddUserModal(true)}
                                            className="btn btn-primary text-sm px-4 py-2"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add User
                                        </button>
                                    </div>
                                    <p className="text-slate-600 text-sm mb-6">Manage user registrations and role requests</p>

                                    <div className="space-y-4">
                                        {recentUsers.map((user, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={user.avatar}
                                                        alt={user.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-slate-900">{user.name}</p>
                                                        <p className="text-slate-500 text-sm">{user.email}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="badge badge-secondary text-xs">{user.role}</span>
                                                    <span className={`badge ${getStatusColor(user.status)} text-xs`}>
                                                        {user.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6">
                                        <select className="input mb-4">
                                            <option>All Users</option>
                                            <option>Alumni</option>
                                            <option>Students</option>
                                            <option>Faculty</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Events Management */}
                                <div className="glass-card p-6 animate-slide-up">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold text-slate-900">Events Management</h3>
                                        <button
                                            onClick={() => setShowCreateEventModal(true)}
                                            className="btn btn-success text-sm px-4 py-2"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Create Event
                                        </button>
                                    </div>
                                    <p className="text-slate-600 text-sm mb-6">Manage institutional events and attendance</p>

                                    <div className="flex space-x-4 mb-6">
                                        <button className="btn btn-primary text-sm px-4 py-2">Upcoming Events</button>
                                        <button className="btn btn-secondary text-sm px-4 py-2">Past Events</button>
                                    </div>

                                    <div className="space-y-4">
                                        {upcomingEvents.map((event, index) => (
                                            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-medium text-slate-900">{event.title}</h4>
                                                        <p className="text-slate-500 text-sm">{event.date}</p>
                                                        <p className="text-slate-400 text-xs">Organized by {event.organizer}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className={`badge ${getStatusColor(event.status)} text-xs`}>
                                                            {event.status}
                                                        </span>
                                                        <p className="text-slate-500 text-xs mt-1">{event.attendees} attendees</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'users' && (
                        <div className="glass-card p-6 animate-slide-up">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
                                <button
                                    onClick={() => setShowAddUserModal(true)}
                                    className="btn btn-primary"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add User
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {recentUsers.map((user, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                            <div className="text-sm text-gray-500">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="badge badge-secondary">{user.role}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`badge ${getStatusColor(user.status)}`}>{user.status}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.joinDate}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'events' && (
                        <div className="glass-card p-6 animate-slide-up">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">Events Management</h2>
                                <button
                                    onClick={() => setShowCreateEventModal(true)}
                                    className="btn btn-success"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Create Event
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {upcomingEvents.map((event, index) => (
                                    <div key={index} className="glass-card p-4 card-hover">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-bold text-slate-900">{event.title}</h3>
                                            <span className={`badge ${getStatusColor(event.status)}`}>{event.status}</span>
                                        </div>
                                        <p className="text-slate-600 text-sm mb-2">{event.date}</p>
                                        <p className="text-slate-500 text-xs mb-4">By {event.organizer}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">{event.attendees} attendees</span>
                                            <button className="btn btn-primary text-xs px-3 py-1">Manage</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="space-y-6">
                            <div className="glass-card p-6 animate-slide-up">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Analytics Overview</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600">89%</div>
                                        <div className="text-slate-600 text-sm">User Engagement</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-green-600">1,247</div>
                                        <div className="text-slate-600 text-sm">Active Users</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-purple-600">24</div>
                                        <div className="text-slate-600 text-sm">Events This Month</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-orange-600">₹2.4L</div>
                                        <div className="text-slate-600 text-sm">Donations Raised</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'monitoring' && (
                        <div className="glass-card p-6 animate-slide-up">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">System Monitoring</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {systemMetrics.map((metric, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <span className="font-medium text-slate-900">{metric.label}</span>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-bold text-slate-900">{metric.value}</span>
                                            <span className={`badge ${getStatusColor(metric.status)}`}>{metric.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <footer className="glass-card mt-8 p-4 sm:p-6 text-center">
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                            <p className="text-slate-600 text-sm sm:text-base">
                                © 2025 Alumni Network - Admin Dashboard
                            </p>
                            <div className="flex space-x-4 sm:space-x-6 text-sm">
                                <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">System Logs</a>
                                <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">Settings</a>
                                <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">Help</a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
