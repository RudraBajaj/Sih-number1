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
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Alumni",
      status: "Pending",
      joinDate: "2025-09-18",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Student",
      status: "Approved",
      joinDate: "2025-09-17",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      email: "michael@example.com",
      role: "Alumni",
      status: "Approved",
      joinDate: "2025-09-16",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Emily Davis",
      email: "emily@example.com",
      role: "Faculty",
      status: "Pending",
      joinDate: "2025-09-15",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    }
  ];

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
    <div className="professional-dashboard">
      <style jsx>{`
        .professional-dashboard {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          color: #ffffff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
        }

        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .dashboard-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .dashboard-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00d4ff 0%, #ff6b6b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .dashboard-subtitle {
          font-size: 1.25rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .tab-navigation {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 3rem;
          background: rgba(15, 23, 42, 0.8);
          padding: 0.5rem;
          border-radius: 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tab-button {
          padding: 1rem 2rem;
          background: transparent;
          color: #94a3b8;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .tab-button.active {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          color: #ffffff;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
        }

        .tab-button:hover {
          color: #ffffff;
          background: rgba(59, 130, 246, 0.2);
        }

        .filters-section {
          background: rgba(15, 23, 42, 0.8);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-label {
          font-weight: 700;
          color: #ffffff;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-select {
          padding: 1rem;
          background: rgba(30, 41, 59, 0.9);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #ffffff;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }

        .filter-actions {
          display: flex;
          gap: 1rem;
        }

        .btn {
          padding: 1rem 2rem;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          color: #ffffff;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(59, 130, 246, 0.4);
        }

        .btn-secondary {
          background: rgba(75, 85, 99, 0.8);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover {
          background: rgba(107, 114, 128, 0.9);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: rgba(15, 23, 42, 0.8);
          border-radius: 20px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #10b981, #8b5cf6, #f59e0b);
        }

        .stat-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-icon {
          font-size: 2.5rem;
          filter: grayscale(1) brightness(1.2);
        }

        .stat-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .stat-subtitle {
          font-size: 1rem;
          color: #94a3b8;
          margin-top: 0.5rem;
          font-weight: 500;
        }

        .stat-value {
          font-size: 3rem;
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .stat-label {
          font-size: 1rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .stat-growth {
          font-size: 1.1rem;
          color: #10b981;
          font-weight: 700;
          margin-top: 0.5rem;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .content-section {
          background: rgba(15, 23, 42, 0.8);
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .section-subtitle {
          color: #94a3b8;
          font-size: 1rem;
          margin-top: 0.5rem;
          font-weight: 500;
        }

        .user-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .user-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(30, 41, 59, 0.5);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .user-item:hover {
          background: rgba(51, 65, 85, 0.7);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .user-avatar {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          object-fit: cover;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .user-info {
          flex: 1;
        }

        .user-name {
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
          font-size: 1.1rem;
        }

        .user-email {
          color: #94a3b8;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .badge {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .badge-success {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .badge-warning {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .badge-danger {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .badge-primary {
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .badge-secondary {
          background: rgba(107, 114, 128, 0.2);
          color: #6b7280;
          border: 1px solid rgba(107, 114, 128, 0.3);
        }

        .badge-purple {
          background: rgba(139, 92, 246, 0.2);
          color: #8b5cf6;
          border: 1px solid rgba(139, 92, 246, 0.3);
        }

        .event-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .event-item {
          padding: 1.5rem;
          background: rgba(30, 41, 59, 0.5);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .event-item:hover {
          background: rgba(51, 65, 85, 0.7);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .event-header {
          display: flex;
          justify-content: between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .event-title {
          font-weight: 700;
          color: #ffffff;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .event-date {
          color: #94a3b8;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .event-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
          font-size: 0.9rem;
        }

        .event-organizer {
          color: #94a3b8;
          font-weight: 500;
        }

        .event-attendees {
          color: #10b981;
          font-weight: 600;
        }

        .system-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .metric-item {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          transition: all 0.3s ease;
        }

        .metric-item:hover {
          background: rgba(51, 65, 85, 0.7);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .metric-label {
          color: #94a3b8;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .metric-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
        }

        .data-table {
          width: 100%;
          background: rgba(15, 23, 42, 0.8);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .table-header {
          background: rgba(30, 41, 59, 0.8);
          padding: 1.5rem 2rem;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }

        .table-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .table-content {
          padding: 2rem;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        th {
          font-weight: 700;
          color: #ffffff;
          background: rgba(30, 41, 59, 0.5);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        td {
          color: #ffffff;
          font-weight: 500;
        }

        tr:hover {
          background: rgba(51, 65, 85, 0.3);
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          border-radius: 8px;
        }

        .btn-success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          border: none;
        }

        .btn-danger {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: #ffffff;
          border: none;
        }

        .btn-info {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          color: #ffffff;
          border: none;
        }

        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-title {
            font-size: 2rem;
          }

          .filters-grid {
            grid-template-columns: 1fr;
          }

          .tab-navigation {
            flex-wrap: wrap;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">Monitor and manage your platform with powerful analytics</p>
        </header>

        <nav className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button
            className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </nav>

        <div className="filters-section">
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">User Role</label>
              <select
                className="filter-select"
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
            <div className="filter-group">
              <label className="filter-label">Date Range</label>
              <select
                className="filter-select"
                value={selectedFilter.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              >
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Activity Type</label>
              <select
                className="filter-select"
                value={selectedFilter.activityType}
                onChange={(e) => handleFilterChange('activityType', e.target.value)}
              >
                <option>All Activities</option>
                <option>Registrations</option>
                <option>Events</option>
                <option>Communications</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select
                className="filter-select"
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
          <div className="filter-actions">
            <button className="btn btn-primary">Apply Filters</button>
            <button className="btn btn-secondary" onClick={resetFilters}>Reset</button>
          </div>
        </div>

        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">{stat.icon}</div>
                <div>
                  <h3 className="stat-title">{stat.title}</h3>
                  <p className="stat-subtitle">{stat.subtitle}</p>
                </div>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-growth">{stat.growth}</div>
            </div>
          ))}
        </div>

        <div className="content-grid">
          <div className="content-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Recent Users</h2>
                <p className="section-subtitle">Manage user registrations and role requests</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setShowAddUserModal(true)}
              >
                Add User
              </button>
            </div>
            
            <div className="user-list">
              {recentUsers.map((user, index) => (
                <div key={index} className="user-item">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="user-avatar"
                  />
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                  <span className={`badge ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="content-section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Upcoming Events</h2>
                <p className="section-subtitle">Manage institutional events and attendance</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setShowCreateEventModal(true)}
              >
                Create Event
              </button>
            </div>

            <div className="event-list">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="event-item">
                  <div className="event-header">
                    <div>
                      <div className="event-title">{event.title}</div>
                      <div className="event-date">{event.date}</div>
                    </div>
                    <span className={`badge ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="event-meta">
                    <span className="event-organizer">Organized by {event.organizer}</span>
                    <span className="event-attendees">{event.attendees} attendees</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">System Metrics</h2>
              <p className="section-subtitle">Real-time system performance monitoring</p>
            </div>
          </div>
          <div className="system-metrics">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <div className="metric-label">{metric.label}</div>
                <div className="metric-value">
                  {metric.value}
                  <span className={`badge ${getStatusColor(metric.status)}`} style={{ marginLeft: '0.5rem', fontSize: '0.7rem' }}>
                    {metric.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="data-table">
          <div className="table-header">
            <h2 className="table-title">User Management</h2>
          </div>
          <div className="table-content">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <div className="user-item" style={{ background: 'transparent', border: 'none', padding: 0 }}>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="user-avatar"
                          style={{ width: '32px', height: '32px' }}
                        />
                        <div className="user-info">
                          <div className="user-name" style={{ fontSize: '1rem' }}>{user.name}</div>
                          <div className="user-email" style={{ fontSize: '0.85rem' }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-primary`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.joinDate}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-success btn-sm">Approve</button>
                        <button className="btn btn-info btn-sm">Edit</button>
                        <button className="btn btn-danger btn-sm">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="content-section" style={{ marginTop: '2rem' }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">Event Management</h2>
              <p className="section-subtitle">Upcoming events and registration status</p>
            </div>
          </div>
          
          <div className="event-list">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="event-item">
                <div className="event-header">
                  <div>
                    <div className="event-title">{event.title}</div>
                    <div className="event-date">{event.date}</div>
                  </div>
                  <span className={`badge ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                <div className="event-meta">
                  <span className="event-organizer">By {event.organizer}</span>
                  <span className="event-attendees">{event.attendees} registered</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}