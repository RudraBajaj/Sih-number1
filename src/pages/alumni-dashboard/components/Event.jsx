import React, { useState } from 'react';

export default function Event() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [showFundModal, setShowFundModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    maxAttendees: ''
  });

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Annual Alumni Meetup 2024",
      date: "2024-12-15 at 6:00 PM",
      location: "College Auditorium",
      category: "Networking",
      status: "Upcoming",
      attendees: 45,
      maxAttendees: 100,
      fundingNeeded: 25000,
      fundingRaised: 15000,
      description: "Join us for our biggest alumni gathering of the year! Network, share experiences, and reconnect with old friends.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Career Guidance Workshop",
      date: "2024-11-20 at 2:00 PM", 
      location: "Online (Zoom)",
      category: "Career",
      status: "Upcoming",
      attendees: 23,
      maxAttendees: 50,
      fundingNeeded: 10000,
      fundingRaised: 8000,
      description: "Learn from industry experts about career transitions, skill development, and job market trends.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Tech Talk: AI in Industry",
      date: "2024-10-25 at 7:00 PM",
      location: "Innovation Center",
      category: "Technology", 
      status: "Completed",
      attendees: 67,
      maxAttendees: 80,
      fundingNeeded: 15000,
      fundingRaised: 15000,
      description: "Discover how AI is transforming industries. Featuring talks from alumni working at top tech companies.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Entrepreneurship Panel",
      date: "2024-11-30 at 4:00 PM",
      location: "Business Center",
      category: "Business",
      status: "Upcoming",
      attendees: 12,
      maxAttendees: 40,
      fundingNeeded: 20000,
      fundingRaised: 5000,
      description: "Meet successful alumni entrepreneurs and learn about starting your own business.",
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=200&fit=crop"
    }
  ]);

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === '' || event.category === selectedCategory;
    const matchesStatus = selectedStatus === '' || event.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  const handleRSVP = (event) => {
    setSelectedEvent(event);
    setShowRSVPModal(true);
  };

  const handleFund = (event) => {
    setSelectedEvent(event);
    setShowFundModal(true);
  };

  const confirmRSVP = () => {
    setEvents(events.map(event => 
      event.id === selectedEvent.id 
        ? { ...event, attendees: event.attendees + 1 }
        : event
    ));
    alert(`RSVP confirmed for ${selectedEvent.title}!`);
    setShowRSVPModal(false);
  };

  const handleCreateEvent = () => {
    const eventToAdd = {
      id: events.length + 1,
      ...newEvent,
      attendees: 0,
      status: "Pending Approval",
      fundingRaised: 0,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop"
    };
    
    setEvents([...events, eventToAdd]);
    alert("Event submitted for admin approval!");
    setShowCreateModal(false);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      location: '',
      category: '',
      maxAttendees: ''
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Networking": "bg-blue-100/60 text-blue-800 border-blue-200/50",
      "Career": "bg-green-100/60 text-green-800 border-green-200/50", 
      "Technology": "bg-purple-100/60 text-purple-800 border-purple-200/50",
      "Business": "bg-orange-100/60 text-orange-800 border-orange-200/50"
    };
    return colors[category] || "bg-gray-100/60 text-gray-800 border-gray-200/50";
  };

  const getStatusColor = (status) => {
    const colors = {
      "Upcoming": "bg-green-100/60 text-green-800 border-green-200/50",
      "Completed": "bg-gray-100/60 text-gray-800 border-gray-200/50",
      "Pending Approval": "bg-yellow-100/60 text-yellow-800 border-yellow-200/50"
    };
    return colors[status] || "bg-gray-100/60 text-gray-800 border-gray-200/50";
  };

  return (
    <div className="w-full min-h-screen pt-20 px-2 py-6 zoom-90">
      <div className="w-full max-w-[95vw] mx-auto bg-slate-200/25 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-6 animate-fade-in">
        {/* Animated Header */}
        <div className="mb-6 transform hover:scale-105 transition duration-300">
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 mb-6">
            <h1 className="text-4xl font-bold text-slate-800 mb-2 flex items-center animate-pulse">
              📅 Events
            </h1>
            <p className="text-slate-600">Discover upcoming events and connect with fellow alumni</p>
          </div>
        </div>

        {/* Event Management Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Event Management</h2>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition duration-200 transform hover:scale-105 shadow-lg"
          >
            ✨ Create New Event
          </button>
        </div>

        {/* Interactive Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-white/40 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none hover:bg-white/50 transition duration-200"
          >
            <option value="">All Categories</option>
            <option value="Networking">Networking</option>
            <option value="Career">Career</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
          </select>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 bg-white/40 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none hover:bg-white/50 transition duration-200"
          >
            <option value="">All Events</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Pending Approval">Pending Approval</option>
          </select>
          <button 
            onClick={() => {setSelectedCategory(''); setSelectedStatus('');}}
            className="px-4 py-3 bg-slate-300/50 text-slate-700 rounded-xl hover:bg-slate-300/70 transition duration-200 transform hover:scale-105"
          >
            Clear Filters
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event, index) => (
            <div 
              key={event.id} 
              className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 overflow-hidden hover:bg-white/60 transition duration-300 transform hover:scale-105 hover:shadow-2xl animate-slide-up"
              style={{animationDelay: `${index * 100}ms`}}
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-110 transition duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium border backdrop-blur-md ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium border backdrop-blur-md ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                {event.fundingNeeded && (
                  <button
                    onClick={() => handleFund(event)}
                    className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-yellow-600 transition duration-200"
                  >
                    💰 Fund Event
                  </button>
                )}
              </div>

              {/* Event Content */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{event.title}</h3>
                <p className="text-slate-600 text-sm mb-3">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <p className="text-slate-600 text-sm flex items-center">
                    <span className="text-blue-500 mr-2">📅</span>
                    {event.date}
                  </p>
                  <p className="text-slate-600 text-sm flex items-center">
                    <span className="text-red-500 mr-2">📍</span>
                    {event.location}
                  </p>
                </div>

                {/* Attendance & Funding Progress */}
                <div className="mb-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>Attendance</span>
                      <span>{event.attendees}/{event.maxAttendees}</span>
                    </div>
                    <div className="w-full bg-slate-200/50 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition duration-300" 
                        style={{width: `${(event.attendees / event.maxAttendees) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  {event.fundingNeeded && (
                    <div>
                      <div className="flex justify-between text-sm text-slate-600 mb-1">
                        <span>Funding</span>
                        <span>₹{event.fundingRaised}/₹{event.fundingNeeded}</span>
                      </div>
                      <div className="w-full bg-slate-200/50 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full transition duration-300" 
                          style={{width: `${(event.fundingRaised / event.fundingNeeded) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {event.status === "Upcoming" ? (
                    <button 
                      onClick={() => handleRSVP(event)}
                      className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition duration-200 transform hover:scale-105"
                    >
                      📧 RSVP
                    </button>
                  ) : event.status === "Completed" ? (
                    <button className="flex-1 bg-slate-400 text-white py-2 px-3 rounded-lg text-sm font-medium">
                      📷 View Photos
                    </button>
                  ) : (
                    <button className="flex-1 bg-yellow-500 text-white py-2 px-3 rounded-lg text-sm font-medium">
                      ⏳ Pending Approval
                    </button>
                  )}
                  <button className="flex-1 bg-slate-300/60 text-slate-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-slate-300/80 transition duration-200 transform hover:scale-105">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modals */}
        
        {/* Create Event Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full mx-4 border border-white/30 animate-slide-up max-h-[80vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Create New Event</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Event Description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="3"
                />
                <input
                  type="datetime-local"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="Networking">Networking</option>
                  <option value="Career">Career</option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                </select>
                <input
                  type="number"
                  placeholder="Max Attendees"
                  value={newEvent.maxAttendees}
                  onChange={(e) => setNewEvent({...newEvent, maxAttendees: e.target.value})}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={handleCreateEvent}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition duration-200"
                >
                  Create Event
                </button>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-slate-300/60 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-300/80 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RSVP Modal */}
        {showRSVPModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full mx-4 border border-white/30 animate-slide-up">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Confirm RSVP</h3>
              <p className="text-slate-600 mb-4">Are you sure you want to RSVP for "{selectedEvent?.title}"?</p>
              <div className="flex gap-3">
                <button 
                  onClick={confirmRSVP}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
                >
                  Confirm RSVP
                </button>
                <button 
                  onClick={() => setShowRSVPModal(false)}
                  className="flex-1 bg-slate-300/60 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-300/80 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Fund Event Modal */}
        {showFundModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full mx-4 border border-white/30 animate-slide-up">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Fund Event</h3>
              <p className="text-slate-600 mb-4">Support "{selectedEvent?.title}" with a donation</p>
              <div className="mb-4">
                <p className="text-sm text-slate-600 mb-2">Funding Progress: ₹{selectedEvent?.fundingRaised}/₹{selectedEvent?.fundingNeeded}</p>
                <div className="w-full bg-slate-200/50 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{width: `${selectedEvent ? (selectedEvent.fundingRaised / selectedEvent.fundingNeeded) * 100 : 0}%`}}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button className="bg-yellow-100/60 text-yellow-800 py-2 px-3 rounded-lg text-sm font-medium hover:bg-yellow-100/80 transition border border-yellow-200/50">₹1,000</button>
                <button className="bg-yellow-100/60 text-yellow-800 py-2 px-3 rounded-lg text-sm font-medium hover:bg-yellow-100/80 transition border border-yellow-200/50">₹2,500</button>
                <button className="bg-yellow-100/60 text-yellow-800 py-2 px-3 rounded-lg text-sm font-medium hover:bg-yellow-100/80 transition border border-yellow-200/50">₹5,000</button>
                <button className="bg-yellow-100/60 text-yellow-800 py-2 px-3 rounded-lg text-sm font-medium hover:bg-yellow-100/80 transition border border-yellow-200/50">Custom</button>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    alert(`Thank you for your donation to ${selectedEvent.title}!`);
                    setShowFundModal(false);
                  }}
                  className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 transition duration-200"
                >
                  Donate
                </button>
                <button 
                  onClick={() => setShowFundModal(false)}
                  className="flex-1 bg-slate-300/60 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-300/80 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full max-w-[95vw] mx-auto mt-8 bg-slate-200/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
        <div className="text-center text-slate-600 text-sm">
          <p>&copy; 2025 Alumni Network. Built with ❤️ for connecting minds.</p>
        </div>
      </footer>
    </div>
  );
}
