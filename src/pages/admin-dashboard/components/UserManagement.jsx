import React, { useState } from 'react';

export default function UserManagement() {
    const [users] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", role: "Alumni", status: "Active", batch: "2021", department: "CS", joinDate: "2025-09-18", lastLogin: "2 hours ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
        { id: 2, name: "Sarah Wilson", email: "sarah@example.com", role: "Student", status: "Pending", batch: "2025", department: "AI", joinDate: "2025-09-17", lastLogin: "1 day ago", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=40&h=40&fit=crop&crop=face" },
        { id: 3, name: "Michael Chen", email: "michael@example.com", role: "Alumni", status: "Active", batch: "2020", department: "ME", joinDate: "2025-09-16", lastLogin: "5 minutes ago", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
        { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Faculty", status: "Active", batch: "N/A", department: "CS", joinDate: "2025-09-15", lastLogin: "1 hour ago", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" }
    ]);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('All Roles');
    const [filterStatus, setFilterStatus] = useState('All Status');

    const getStatusColor = (status) => {
        const colors = {
            "Active": "badge-success",
            "Pending": "badge-warning",
            "Suspended": "badge-danger",
            "Inactive": "badge-secondary"
        };
        return colors[status] || "badge-secondary";
    };

    const getRoleColor = (role) => {
        const colors = {
            "Alumni": "badge-primary",
            "Student": "badge-success",
            "Faculty": "badge-purple",
            "Admin": "badge-danger"
        };
        return colors[role] || "badge-secondary";
    };

    const handleSelectUser = (userId) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSelectAll = () => {
        setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u.id));
    };

    return (
        <div className="alumni-dashboard-container">
            <div className="w-full min-h-screen pt-20 px-2 sm:px-4 lg:px-6 py-6">
                <div className="w-full max-w-[98vw] mx-auto">

                    {/* Header */}
                    <div className="glass-card-strong p-6 sm:p-8 mb-6 sm:mb-8 animate-slide-up">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">User Management</h1>
                                <p className="text-slate-600 text-base sm:text-lg">Manage user registrations, roles, and permissions</p>
                            </div>
                            <div className="flex space-x-3">
                                <button className="btn btn-secondary">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                    </svg>
                                    Export
                                </button>
                                <button className="btn btn-primary">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add User
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Filters and Search */}
                    <div className="glass-card p-6 mb-8 animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search users..."
                                    className="input pl-10"
                                />
                                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="input">
                                <option>All Roles</option>
                                <option>Alumni</option>
                                <option>Student</option>
                                <option>Faculty</option>
                                <option>Admin</option>
                            </select>
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input">
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Pending</option>
                                <option>Suspended</option>
                                <option>Inactive</option>
                            </select>
                            <button className="btn btn-secondary">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                                </svg>
                                More Filters
                            </button>
                        </div>

                        {selectedUsers.length > 0 && (
                            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <span className="text-blue-800 font-medium">{selectedUsers.length} users selected</span>
                                <div className="flex space-x-2">
                                    <button className="btn btn-primary text-sm px-3 py-1">Approve</button>
                                    <button className="btn btn-warning text-sm px-3 py-1">Suspend</button>
                                    <button className="btn btn-danger text-sm px-3 py-1">Delete</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Users Table */}
                    <div className="glass-card overflow-hidden animate-slide-up">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.length === users.length}
                                                onChange={handleSelectAll}
                                                className="rounded"
                                            />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch/Dept</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.includes(user.id)}
                                                    onChange={() => handleSelectUser(user.id)}
                                                    className="rounded"
                                                />
                                            </td>
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
                                                <span className={`badge ${getRoleColor(user.role)}`}>{user.role}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`badge ${getStatusColor(user.status)}`}>{user.status}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.batch} • {user.department}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.joinDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.lastLogin}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                                    <button className="text-green-600 hover:text-green-900">Approve</button>
                                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <button className="btn btn-secondary">Previous</button>
                                <button className="btn btn-secondary">Next</button>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{' '}
                                        <span className="font-medium">4</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        <button className="btn btn-secondary rounded-l-md">Previous</button>
                                        <button className="btn btn-primary">1</button>
                                        <button className="btn btn-secondary rounded-r-md">Next</button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="glass-card mt-8 p-4 sm:p-6 text-center">
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                            <p className="text-slate-600 text-sm sm:text-base">
                                © 2025 Alumni Network - User Management
                            </p>
                            <div className="flex space-x-4 sm:space-x-6 text-sm">
                                <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">Bulk Actions</a>
                                <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">Import Users</a>
                                <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">Settings</a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
