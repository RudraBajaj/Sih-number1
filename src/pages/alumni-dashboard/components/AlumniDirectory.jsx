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
      {/* Professional Modal */}
      {showConnectModal && (
        <div 
          className="modal-overlay"
          onClick={() => setShowConnectModal(false)}
        >
          <div 
            className="modal-content w-full max-w-md sm:max-w-lg p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
              <div className="relative flex-shrink-0">
                <img 
                  src={selectedAlumnus?.avatar} 
                  alt={selectedAlumnus?.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-200"
                />
                <span className={`status-dot absolute -bottom-1 -right-1 ${selectedAlumnus?.status === 'online' ? 'status-online' : 'status-offline'}`}></span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 truncate">{selectedAlumnus?.name}</h3>
                <p className="text-slate-600 font-medium text-sm sm:text-base truncate">{selectedAlumnus?.role}</p>
                <p className="text-slate-500 text-xs sm:text-sm truncate">{selectedAlumnus?.company}</p>
              </div>
            </div>
            
            <div className="mb-6 sm:mb-8">
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Personal Message
              </label>
              <textarea
                value={connectMessage}
                onChange={(e) => setConnectMessage(e.target.value)}
                placeholder="Hi! I'd love to connect and learn about your experience..."
                className="input resize-none"
                rows="4"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={handleSendMessage}
                className="btn btn-primary flex-1 py-3 sm:py-4 order-2 sm:order-1"
              >
                Send Connection Request
              </button>
              <button 
                onClick={() => setShowConnectModal(false)}
                className="btn btn-secondary py-3 sm:py-4 px-4 sm:px-6 order-1 sm:order-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full min-h-screen pt-20 px-2 sm:px-4 lg:px-6 py-6 bg-gray-300">
        <div className="w-full max-w-[98vw] mx-auto">
          {/* Header */}
          <div className="glass-card-strong p-6 sm:p-8 mb-6 sm:mb-8 animate-slide-up">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
                  <span className="text-gradient">Alumni Directory</span>
                </h1>
                <p className="text-slate-600 text-base sm:text-lg">
                  Connect with <span className="font-bold text-blue-600">{filteredAlumni.length}</span> professionals from our network
                </p>
              </div>
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="text-center p-3 sm:p-4 glass-card rounded-xl">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600">{alumni.filter(a => a.status === 'online').length}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">Online Now</div>
                </div>
                <div className="text-center p-3 sm:p-4 glass-card rounded-xl">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">{alumni.length}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">Total Alumni</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="glass-card p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, company, or role..."
                    className="input pl-10 pr-10"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
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
                className="btn btn-secondary w-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="hide-mobile">Clear All</span>
              </button>
            </div>
            
            {(searchTerm || selectedBatch || selectedDepartment) && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 sm:mt-6 pt-4 border-t border-gray-200 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-base sm:text-lg font-semibold text-slate-900">
                    {filteredAlumni.length} results found
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
          </div>

          {/* Alumni Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {filteredAlumni.map((person, index) => (
              <div 
                key={person.id} 
                className="glass-card card-hover p-4 sm:p-6 animate-slide-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="flex flex-col h-full">
                  {/* Profile Header */}
                  <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={person.avatar} 
                        alt={person.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-200"
                      />
                      <span className={`status-dot absolute -bottom-1 -right-1 ${person.status === 'online' ? 'status-online' : 'status-offline'}`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate mb-1">{person.name}</h3>
                      <p className="text-slate-600 text-xs sm:text-sm truncate">{person.batch} • {person.department}</p>
                    </div>
                  </div>
                  
                  {/* Role Card */}
                  <div className="glass-card p-3 sm:p-4 mb-4 sm:mb-6 flex-1 bg-blue-50 border-blue-200">
                    <div className="text-sm font-bold text-blue-900 mb-2">{person.role}</div>
                    <div className="text-sm text-blue-700 flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="truncate">{person.company}</span>
                    </div>
                    <div className="text-xs text-blue-600 flex items-center">
                      <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{person.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button 
                      onClick={() => handleConnect(person)}
                      className="btn btn-primary py-2 sm:py-3 text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                      <span className="hide-mobile">Connect</span>
                    </button>
                    <button className="btn btn-success py-2 sm:py-3 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="hide-mobile">Message</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAlumni.length === 0 && (
            <div className="glass-card text-center py-12 sm:py-16 animate-slide-up">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">No alumni found</h3>
              <p className="text-slate-600 mb-6 sm:mb-8 text-base sm:text-lg">Try adjusting your search criteria or explore different filters</p>
              <button 
                onClick={clearFilters}
                className="btn btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Statistics Footer */}
          <div className="glass-card p-6 sm:p-8 mb-6 sm:mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{alumni.length}</div>
                <div className="text-sm text-slate-600 font-semibold">Total Alumni</div>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <div className="text-2xl sm:text-3xl font-bold text-green-600">{alumni.filter(a => a.status === 'online').length}</div>
                <div className="text-sm text-slate-600 font-semibold">Online Now</div>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">{new Set(alumni.map(a => a.company)).size}</div>
                <div className="text-sm text-slate-600 font-semibold">Companies</div>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
                <div className="text-2xl sm:text-3xl font-bold text-orange-600">{new Set(alumni.map(a => a.batch)).size}</div>
                <div className="text-sm text-slate-600 font-semibold">Batches</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="glass-card p-4 sm:p-6 text-center">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-slate-600 text-sm sm:text-base">
                © 2025 Alumni Network. Built with care for connecting minds.
              </p>
              <div className="flex space-x-4 sm:space-x-6 text-sm">
                <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">Privacy Policy</a>
                <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">Terms of Service</a>
                <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">Contact Us</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
