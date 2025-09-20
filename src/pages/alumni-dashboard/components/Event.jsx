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
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop&crop=center&auto=format&q=80"
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
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&crop=center&auto=format&q=80"
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
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&crop=center&auto=format&q=80"
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
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=400&fit=crop&crop=center&auto=format&q=80"
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
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop&crop=center&auto=format&q=80"
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
      "Networking": "badge-primary",
      "Career": "badge-success", 
      "Technology": "badge-warning",
      "Business": "badge-secondary"
    };
    return colors[category] || "badge-secondary";
  };

  const getStatusColor = (status) => {
    const colors = {
      "Upcoming": "badge-success",
      "Completed": "badge-secondary",
      "Pending Approval": "badge-warning"
    };
    return colors[status] || "badge-secondary";
  };

  return (
    <div className="alumni-dashboard-container">
      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div 
            className="modal-content w-full max-w-md sm:max-w-lg p-6 sm:p-8 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Create New Event</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                className="input"
              />
              <textarea
                placeholder="Event Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                className="input resize-none"
                rows="3"
              />
              <input
                type="datetime-local"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                className="input"
              />
              <input
                type="text"
                placeholder="Location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                className="input"
              />
              <select
                value={newEvent.category}
                onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                className="input"
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
                className="input"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button 
                onClick={handleCreateEvent}
                className="btn btn-success flex-1 py-3 order-2 sm:order-1"
              >
                Create Event
              </button>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="btn btn-secondary py-3 px-6 order-1 sm:order-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RSVP Modal */}
      {showRSVPModal && (
        <div className="modal-overlay" onClick={() => setShowRSVPModal(false)}>
          <div 
            className="modal-content w-full max-w-md p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Confirm RSVP</h3>
            <p className="text-slate-600 mb-6">Are you sure you want to RSVP for "{selectedEvent?.title}"?</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={confirmRSVP}
                className="btn btn-primary flex-1 py-3 order-2 sm:order-1"
              >
                Confirm RSVP
              </button>
              <button 
                onClick={() => setShowRSVPModal(false)}
                className="btn btn-secondary py-3 px-6 order-1 sm:order-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fund Event Modal */}
      {showFundModal && (
        <div className="modal-overlay" onClick={() => setShowFundModal(false)}>
          <div 
            className="modal-content w-full max-w-lg p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Fund Event</h3>
            <p className="text-slate-600 mb-6">Support "{selectedEvent?.title}" with a donation</p>
            <div className="mb-6">
              <p className="text-sm text-slate-600 mb-2">Funding Progress: ₹{selectedEvent?.fundingRaised}/₹{selectedEvent?.fundingNeeded}</p>
              <div className="progress">
                <div 
                  className="progress-bar" 
                  style={{width: `${selectedEvent ? (selectedEvent.fundingRaised / selectedEvent.fundingNeeded) * 100 : 0}%`}}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="btn btn-secondary py-3">₹1,000</button>
              <button className="btn btn-secondary py-3">₹2,500</button>
              <button className="btn btn-secondary py-3">₹5,000</button>
              <button className="btn btn-secondary py-3">Custom</button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => {
                  alert(`Thank you for your donation to ${selectedEvent.title}!`);
                  setShowFundModal(false);
                }}
                className="btn btn-warning flex-1 py-3 order-2 sm:order-1"
              >
                Donate
              </button>
              <button 
                onClick={() => setShowFundModal(false)}
                className="btn btn-secondary py-3 px-6 order-1 sm:order-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full min-h-screen pt-20 px-2 sm:px-4 lg:px-6 py-6 bg-gray-300 ">
        <div className="w-full max-w-[98vw] mx-auto">
          {/* Header */}
          <div className="glass-card-strong p-6 sm:p-8 mb-6 sm:mb-8 animate-slide-up">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
                  <span className="text-gradient">Events</span>
                </h1>
                <p className="text-slate-600 text-base sm:text-lg">Discover upcoming events and connect with fellow alumni</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="btn btn-success text-base px-6 sm:px-8 py-3 sm:py-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Event
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="glass-card p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
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
                className="input"
              >
                <option value="">All Events</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
                <option value="Pending Approval">Pending Approval</option>
              </select>
              <button 
                onClick={() => {setSelectedCategory(''); setSelectedStatus('');}}
                className="btn btn-secondary sm:col-span-1 lg:col-span-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Filters
              </button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredEvents.map((event, index) => (
              <div 
                key={event.id} 
                className="glass-card card-hover overflow-hidden animate-slide-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                {/* Event Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`badge ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <span className={`badge ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  {event.fundingNeeded && (
                    <button
                      onClick={() => handleFund(event)}
                      className="absolute top-4 right-4 btn btn-warning text-xs px-3 py-1"
                    >
                      Fund Event
                    </button>
                  )}
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{event.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{event.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-slate-600 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 012 0v4m8-4v4m-5 6H9m5 0a1 1 0 001 1v8a1 1 0 01-1 1H9a1 1 0 01-1-1v-8a1 1 0 011-1m5 0V9a1 1 0 00-1-1H9a1 1 0 00-1 1v2.618a3 3 0 01-.78 2.01L7 15l1.22 1.372a3 3 0 00.78 2.01V21" />
                      </svg>
                      {event.date}
                    </p>
                    <p className="text-slate-600 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </p>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex justify-between text-sm text-slate-600 mb-2">
                        <span>Attendance</span>
                        <span>{event.attendees}/{event.maxAttendees}</span>
                      </div>
                      <div className="progress">
                        <div 
                          className="progress-bar bg-blue-500" 
                          style={{width: `${(event.attendees / event.maxAttendees) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                    
                    {event.fundingNeeded && (
                      <div>
                        <div className="flex justify-between text-sm text-slate-600 mb-2">
                          <span>Funding</span>
                          <span>₹{event.fundingRaised}/₹{event.fundingNeeded}</span>
                        </div>
                        <div className="progress">
                          <div 
                            className="progress-bar bg-yellow-500" 
                            style={{width: `${(event.fundingRaised / event.fundingNeeded) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {event.status === "Upcoming" ? (
                      <button 
                        onClick={() => handleRSVP(event)}
                        className="btn btn-primary flex-1 py-3"
                      >
                        RSVP
                      </button>
                    ) : event.status === "Completed" ? (
                      <button className="btn btn-secondary flex-1 py-3">
                        View Photos
                      </button>
                    ) : (
                      <button className="btn btn-warning flex-1 py-3">
                        Pending Approval
                      </button>
                    )}
                    <button className="btn btn-secondary py-3 px-6">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer className="glass-card mt-8 p-4 sm:p-6 text-center">
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
