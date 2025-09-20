import React, { useState, useRef, useEffect } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Alumni",
      status: "Active",
      batch: "2021",
      department: "CS",
      joinDate: "2025-09-18",
      lastLogin: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Student",
      status: "Pending",
      batch: "2025",
      department: "AI",
      joinDate: "2025-09-17",
      lastLogin: "1 day ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael@example.com",
      role: "Alumni",
      status: "Active",
      batch: "2020",
      department: "ME",
      joinDate: "2025-09-16",
      lastLogin: "5 minutes ago",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "Faculty",
      status: "Active",
      batch: "N/A",
      department: "CS",
      joinDate: "2025-09-15",
      lastLogin: "1 hour ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    }
  ]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All Roles');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [darkMode, setDarkMode] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

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

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const getStatusColor = (status) => {
    if (darkMode) {
      const colors = {
        "Active": "bg-green-900 text-green-300 border-green-700",
        "Pending": "bg-yellow-900 text-yellow-300 border-yellow-700", 
        "Suspended": "bg-red-900 text-red-300 border-red-700",
        "Inactive": "bg-gray-700 text-gray-300 border-gray-600"
      };
      return colors[status] || "bg-gray-700 text-gray-300 border-gray-600";
    } else {
      const colors = {
        "Active": "bg-green-100 text-green-800 border-green-200",
        "Pending": "bg-yellow-100 text-yellow-800 border-yellow-200", 
        "Suspended": "bg-red-100 text-red-800 border-red-200",
        "Inactive": "bg-gray-100 text-gray-800 border-gray-200"
      };
      return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleColor = (role) => {
    if (darkMode) {
      const colors = {
        "Alumni": "bg-blue-900 text-blue-300 border-blue-700",
        "Student": "bg-green-900 text-green-300 border-green-700",
        "Faculty": "bg-purple-900 text-purple-300 border-purple-700",
        "Admin": "bg-red-900 text-red-300 border-red-700"
      };
      return colors[role] || "bg-gray-700 text-gray-300 border-gray-600";
    } else {
      const colors = {
        "Alumni": "bg-blue-100 text-blue-800 border-blue-200",
        "Student": "bg-green-100 text-green-800 border-green-200",
        "Faculty": "bg-purple-100 text-purple-800 border-purple-200",
        "Admin": "bg-red-100 text-red-800 border-red-200"
      };
      return colors[role] || "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
    showNotification(`User ${selectedUsers.includes(userId) ? 'deselected' : 'selected'}`);
  };

  const handleSelectAll = () => {
    const allSelected = selectedUsers.length === users.length;
    setSelectedUsers(allSelected ? [] : users.map(u => u.id));
    showNotification(allSelected ? 'All users deselected' : 'All users selected');
  };

  const handleUserAction = (userId, action) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { 
              ...user, 
              status: action === 'approve' ? 'Active' : 
                     action === 'suspend' ? 'Suspended' : 
                     action === 'activate' ? 'Active' : user.status 
            }
          : user
      )
    );
    showNotification(`User ${action}d successfully`);
  };

  const handleBulkAction = (action) => {
    const actionMap = {
      'approve': 'Active',
      'suspend': 'Suspended',
      'activate': 'Active'
    };
    
    setUsers(prev => 
      prev.map(user => 
        selectedUsers.includes(user.id) 
          ? { ...user, status: actionMap[action] || user.status }
          : user
      )
    );
    setSelectedUsers([]);
    showNotification(`${selectedUsers.length} users ${action}d successfully`);
  };

  const handleLogout = () => {
    showNotification('Logging out...');
    setTimeout(() => {
      alert('Logged out successfully! This would redirect to login page.');
    }, 1000);
  };

  const handleChangePassword = () => {
    setShowChangePasswordModal(true);
    setProfileDropdownOpen(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    showNotification(`Editing ${user.name}...`);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All Roles' || user.role === filterRole;
    const matchesStatus = filterStatus === 'All Status' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

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
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-sm opacity-70">Welcome back, Administrator</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                showNotification(`Switched to ${darkMode ? 'light' : 'dark'} mode`);
              }}
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
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 text-red-600 hover:bg-red-50 ${darkMode ? 'hover:bg-red-900/20' : ''}`}
                    >
                      🚪 Logout
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
            User Management
          </h1>
          <p className="text-lg font-medium opacity-80">
            Manage user registrations, roles, and permissions
          </p>
        </header>

        {/* Controls Section */}
        <div className={`rounded-xl p-4 sm:p-6 mb-6 shadow-sm border ${cardClasses}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="col-span-1 md:col-span-1">
              <label className="block text-sm font-bold mb-2 uppercase tracking-wide">
                Search Users
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 rounded-lg font-medium text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
                placeholder="Search by name, email, or department..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value) showNotification(`Searching for: ${e.target.value}`);
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold uppercase tracking-wide">
                Filter by Role
              </label>
              <select
                className={`w-full px-3 py-2 rounded-lg font-medium text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
                value={filterRole}
                onChange={(e) => {
                  setFilterRole(e.target.value);
                  showNotification(`Filtering by role: ${e.target.value}`);
                }}
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
                Filter by Status
              </label>
              <select
                className={`w-full px-3 py-2 rounded-lg font-medium text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  showNotification(`Filtering by status: ${e.target.value}`);
                }}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Suspended</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className={`rounded-xl p-4 mb-6 shadow-sm border ${cardClasses}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="font-semibold opacity-80">
                {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
              </div>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => handleBulkAction('approve')}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 transition-colors"
                >
                  Approve Selected
                </button>
                <button 
                  onClick={() => handleBulkAction('suspend')}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors"
                >
                  Suspend Selected
                </button>
                <button 
                  onClick={() => showNotification(`Exporting ${selectedUsers.length} users...`)}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors"
                >
                  Export Selected
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-sm opacity-70">
            Showing {filteredUsers.length} of {users.length} users
            {searchTerm && ` matching "${searchTerm}"`}
            {filterRole !== 'All Roles' && ` with role "${filterRole}"`}
            {filterStatus !== 'All Status' && ` with status "${filterStatus}"`}
          </p>
        </div>

        {/* Data Table */}
        <div className={`rounded-xl shadow-sm border overflow-hidden ${cardClasses}`}>
          <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className="text-xl font-bold flex items-center gap-2">
              👥 All Users
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide">User</th>
                  <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide">Batch/Dept</th>
                  <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide">Join Date</th>
                  <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide">Last Login</th>
                  <th className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center opacity-70">
                      No users found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className={`transition-colors ${hoverClasses}`}>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-lg object-cover border-2 border-gray-200"
                          />
                          <div>
                            <div className="font-bold text-sm">{user.name}</div>
                            <div className="opacity-70 text-xs">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-sm opacity-80">
                          {user.batch} • {user.department}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{user.joinDate}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm opacity-70">{user.lastLogin}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {user.status === 'Pending' && (
                            <button 
                              onClick={() => handleUserAction(user.id, 'approve')}
                              className="px-2 py-1 bg-green-600 text-white rounded text-xs font-bold hover:bg-green-700 transition-colors"
                            >
                              Approve
                            </button>
                          )}
                          {user.status === 'Suspended' && (
                            <button 
                              onClick={() => handleUserAction(user.id, 'activate')}
                              className="px-2 py-1 bg-green-600 text-white rounded text-xs font-bold hover:bg-green-700 transition-colors"
                            >
                              Activate
                            </button>
                          )}
                          <button 
                            onClick={() => handleEditUser(user)}
                            className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </button>
                          {user.status !== 'Suspended' && (
                            <button 
                              onClick={() => handleUserAction(user.id, 'suspend')}
                              className="px-2 py-1 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700 transition-colors"
                            >
                              Suspend
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className={`p-4 border-t ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="font-semibold text-sm opacity-80">
                Showing {Math.min(filteredUsers.length, 10)} of <strong>{filteredUsers.length}</strong> results
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => showNotification('Previous page loaded')}
                  className={`px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    darkMode 
                      ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm">
                  1
                </button>
                <button 
                  onClick={() => showNotification('Next page loaded')}
                  className={`px-3 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    darkMode 
                      ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add User Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setShowAddUserModal(true);
              showNotification('Opening add user form...');
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg"
          >
            + Add New User
          </button>
        </div>

        {/* Change Password Modal */}
        {showChangePasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`rounded-lg p-6 max-w-md w-full mx-4 ${cardClasses}`}>
              <h3 className="text-lg font-bold mb-4">Change Password</h3>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-200 text-gray-900'
                  }`}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode 
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
                  className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                    darkMode 
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
    </div>
  );
}