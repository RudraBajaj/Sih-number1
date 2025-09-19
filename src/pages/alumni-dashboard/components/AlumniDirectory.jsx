import React, { useState, useEffect } from 'react';

export default function AlumniDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedAlumnus, setSelectedAlumnus] = useState(null);
  const [connectMessage, setConnectMessage] = useState('');

  const alumni = [
    {
      id: 1,
      name: "Arjun Sharma",
      batch: "2021",
      department: "Computer Science Engineering",
      role: "Software Development Engineer",
      company: "Microsoft India",
      location: "Bangalore, Karnataka",
      status: "online",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Priya Gupta",
      batch: "2020",
      department: "Artificial Intelligence",
      role: "ML Engineer",
      company: "Amazon Development Centre",
      location: "Hyderabad, Telangana",
      status: "online",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Rohit Verma",
      batch: "2019",
      department: "Computer Science Engineering",
      role: "Senior Software Engineer",
      company: "Google India",
      location: "Gurgaon, Haryana",
      status: "offline",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Sneha Agarwal",
      batch: "2022",
      department: "Artificial Intelligence",
      role: "Data Scientist",
      company: "Zomato",
      location: "Delhi NCR",
      status: "online",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Vikash Kumar",
      batch: "2018",
      department: "Computer Science Engineering",
      role: "Senior Product Manager",
      company: "Flipkart",
      location: "Bangalore, Karnataka",
      status: "offline",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Anjali Singh",
      batch: "2021",
      department: "Electronics & Communication",
      role: "Hardware Engineer",
      company: "Samsung R&D",
      location: "Noida, Uttar Pradesh",
      status: "online",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 7,
      name: "Rahul Joshi",
      batch: "2020",
      department: "Mechanical Engineering",
      role: "Design Engineer",
      company: "Tata Motors",
      location: "Pune, Maharashtra",
      status: "online",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 8,
      name: "Nidhi Kapoor",
      batch: "2019",
      department: "Artificial Intelligence",
      role: "AI Research Scientist",
      company: "Paytm",
      location: "Noida, Uttar Pradesh",
      status: "offline",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const filtered = alumni.filter(person => {
      const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBatch = selectedBatch === '' || person.batch === selectedBatch;
      const matchesDepartment = selectedDepartment === '' || person.department === selectedDepartment;
      
      return matchesSearch && matchesBatch && matchesDepartment;
    });
    setFilteredAlumni(filtered);
  }, [searchTerm, selectedBatch, selectedDepartment]);

  const handleConnect = (alumnus) => {
    setSelectedAlumnus(alumnus);
    setShowConnectModal(true);
  };

  const handleSendMessage = () => {
    if (connectMessage.trim()) {
      alert(`Connection request sent to ${selectedAlumnus.name}!`);
      setShowConnectModal(false);
      setConnectMessage('');
    } else {
      alert('Please write a message before sending the request.');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBatch('');
    setSelectedDepartment('');
  };

  return (
    <div className="alumni-dashboard-container">
      {/* Beautiful Modal with proper backdrop */}
      {showConnectModal && (
        <div 
          className="modal-overlay"
          onClick={() => setShowConnectModal(false)}
        >
          <div 
            className="modal-content w-full max-w-lg p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                <img 
                  src={selectedAlumnus?.avatar} 
                  alt={selectedAlumnus?.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white/60 shadow-lg"
                />
                <span className={`status-dot absolute -bottom-1 -right-1 ${selectedAlumnus?.status === 'online' ? 'status-online' : 'status-offline'}`}></span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-800 mb-1">{selectedAlumnus?.name}</h3>
                <p className="text-slate-600 font-medium">{selectedAlumnus?.role}</p>
                <p className="text-slate-500 text-sm">{selectedAlumnus?.company}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Personal Message
              </label>
              <textarea
                value={connectMessage}
                onChange={(e) => setConnectMessage(e.target.value)}
                placeholder="Hi! I'd love to connect and learn about your experience at..."
                className="input resize-none"
                rows="4"
              />
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={handleSendMessage}
                className="btn btn-primary flex-1 py-4"
              >
                <span>✨</span>
                Send Connection Request
              </button>
              <button 
                onClick={() => setShowConnectModal(false)}
                className="btn btn-secondary py-4 px-6"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Wider container */}
      <div className="w-full min-h-screen pt-20 px-1 sm:px-2 py-6">
        <div className="w-full max-w-[98vw] mx-auto">
          {/* Header */}
          <div className="glass-card-strong p-8 mb-8 animate-slide-up">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-3">
                  👥 Alumni Directory
                </h1>
                <p className="text-slate-600 text-lg">
                  Connect with <span className="font-bold text-indigo-600">{filteredAlumni.length}</span> amazing professionals from our network
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center p-4 glass-card rounded-2xl">
                  <div className="text-3xl font-bold text-emerald-600">{alumni.filter(a => a.status === 'online').length}</div>
                  <div className="text-sm text-slate-600 font-medium">Online Now</div>
                </div>
                <div className="text-center p-4 glass-card rounded-2xl">
                  <div className="text-3xl font-bold text-indigo-600">{alumni.length}</div>
                  <div className="text-sm text-slate-600 font-medium">Total Alumni</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="glass-card p-6 mb-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="🔍 Search by name, company, or role..."
                    className="input"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors text-lg font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
              
              <select 
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="input"
              >
                <option value="">All Batches</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </select>
              
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="input"
              >
                <option value="">All Departments</option>
                <option value="Computer Science Engineering">Computer Science</option>
                <option value="Artificial Intelligence">AI & ML</option>
                <option value="Electronics & Communication">ECE</option>
                <option value="Mechanical Engineering">Mechanical</option>
              </select>

              <button 
                onClick={clearFilters}
                className="btn btn-secondary"
              >
                🗑️ Clear All
              </button>
            </div>
            
            {(searchTerm || selectedBatch || selectedDepartment) && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-4 border-t border-white/30 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-slate-700">
                    {filteredAlumni.length} results found
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
          </div>

          {/* Alumni Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredAlumni.map((person, index) => (
              <div 
                key={person.id} 
                className="glass-card card-hover p-6 animate-slide-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="flex flex-col h-full">
                  {/* Profile Header */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={person.avatar} 
                        alt={person.name}
                        className="w-16 h-16 rounded-full object-cover border-3 border-white/50 shadow-lg"
                      />
                      <span className={`status-dot absolute -bottom-1 -right-1 ${person.status === 'online' ? 'status-online' : 'status-offline'}`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-800 truncate mb-1">{person.name}</h3>
                      <p className="text-slate-600 text-sm truncate">{person.batch} • {person.department}</p>
                    </div>
                  </div>
                  
                  {/* Role Card */}
                  <div className="glass-card p-4 mb-6 flex-1 bg-gradient-blue text-white">
                    <div className="text-sm font-bold mb-2">{person.role}</div>
                    <div className="text-sm opacity-90 flex items-center">
                      <span className="mr-2">🏢</span>
                      {person.company}
                    </div>
                    <div className="text-xs opacity-80 flex items-center mt-2">
                      <span className="mr-1">📍</span>
                      {person.location}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => handleConnect(person)}
                      className="btn btn-primary py-3 text-sm"
                    >
                      <span>🤝</span>
                      Connect
                    </button>
                    <button className="btn btn-success py-3 text-sm">
                      <span>💬</span>
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAlumni.length === 0 && (
            <div className="glass-card text-center py-16 animate-bounce">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">No alumni found</h3>
              <p className="text-slate-600 mb-8 text-lg">Try adjusting your search criteria or explore different filters</p>
              <button 
                onClick={clearFilters}
                className="btn btn-primary text-lg px-8 py-4"
              >
                <span>🔄</span>
                Reset All Filters
              </button>
            </div>
          )}

          {/* Statistics Footer */}
          <div className="glass-card p-8 mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div className="animate-bounce" style={{animationDelay: '0.1s'}}>
                <div className="text-3xl font-bold bg-gradient-blue text-transparent bg-clip-text">{alumni.length}</div>
                <div className="text-sm text-slate-600 font-semibold">Total Alumni</div>
              </div>
              <div className="animate-bounce" style={{animationDelay: '0.2s'}}>
                <div className="text-3xl font-bold bg-gradient-green text-transparent bg-clip-text">{alumni.filter(a => a.status === 'online').length}</div>
                <div className="text-sm text-slate-600 font-semibold">Online Now</div>
              </div>
              <div className="animate-bounce" style={{animationDelay: '0.3s'}}>
                <div className="text-3xl font-bold bg-gradient-purple text-transparent bg-clip-text">{new Set(alumni.map(a => a.company)).size}</div>
                <div className="text-sm text-slate-600 font-semibold">Companies</div>
              </div>
              <div className="animate-bounce" style={{animationDelay: '0.4s'}}>
                <div className="text-3xl font-bold bg-gradient-orange text-transparent bg-clip-text">{new Set(alumni.map(a => a.batch)).size}</div>
                <div className="text-sm text-slate-600 font-semibold">Batches</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="glass-card mt-8 p-6 text-center">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-slate-600">
                &copy; 2025 Alumni Network. Built with ❤️ for connecting minds.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors font-medium">Privacy Policy</a>
                <a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors font-medium">Terms of Service</a>
                <a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors font-medium">Contact Us</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
