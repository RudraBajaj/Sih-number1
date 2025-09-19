import React, { useState, useEffect, useRef } from 'react';

// ShootingStars Component - Converted from TypeScript
const ShootingStars = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className
}) => {
  const [star, setStar] = useState(null);
  const svgRef = useRef(null);

  const getRandomStartPoint = () => {
    const side = Math.floor(Math.random() * 4);
    const offset = Math.random() * window.innerWidth;
    switch (side) {
      case 0:
        return { x: offset, y: 0, angle: 45 };
      case 1:
        return { x: window.innerWidth, y: offset, angle: 135 };
      case 2:
        return { x: offset, y: window.innerHeight, angle: 225 };
      case 3:
        return { x: 0, y: offset, angle: 315 };
      default:
        return { x: 0, y: 0, angle: 45 };
    }
  };

  useEffect(() => {
    const createStar = () => {
      const { x, y, angle } = getRandomStartPoint();
      const newStar = {
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      };
      setStar(newStar);
      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      setTimeout(createStar, randomDelay);
    };

    createStar();
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  useEffect(() => {
    const moveStar = () => {
      if (star) {
        setStar((prevStar) => {
          if (!prevStar) return null;
          const newX = prevStar.x + prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180);
          const newY = prevStar.y + prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180);
          const newDistance = prevStar.distance + prevStar.speed;
          const newScale = 1 + newDistance / 100;

          if (newX < -20 || newX > window.innerWidth + 20 || newY < -20 || newY > window.innerHeight + 20) {
            return null;
          }

          return {
            ...prevStar,
            x: newX,
            y: newY,
            distance: newDistance,
            scale: newScale,
          };
        });
      }
    };

    const animationFrame = requestAnimationFrame(moveStar);
    return () => cancelAnimationFrame(animationFrame);
  }, [star]);

  return (
    <svg
      ref={svgRef}
      className={`fixed inset-0 z-[1] ${className || ''}`}
      style={{ pointerEvents: 'none' }}
    >
      {star && (
        <rect
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill={`url(#gradient${star.id})`}
          transform={`rotate(${star.angle} ${star.x + (starWidth * star.scale) / 2} ${star.y + starHeight / 2})`}
        />
      )}
      <defs>
        {star && (
          <linearGradient id={`gradient${star.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
            <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
          </linearGradient>
        )}
      </defs>
    </svg>
  );
};

// StarsBackground Component - Converted from TypeScript
const StarsBackground = ({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  className
}) => {
  const [stars, setStars] = useState([]);
  const canvasRef = useRef(null);

  const generateStars = (width, height) => {
    const area = width * height;
    const numStars = Math.floor(area * starDensity);
    return Array.from({ length: numStars }, () => {
      const shouldTwinkle = allStarsTwinkle || Math.random() < twinkleProbability;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.05 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed: shouldTwinkle
          ? minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
          : null,
      };
    });
  };

  useEffect(() => {
    const updateStars = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        setStars(generateStars(width, height));
      }
    };

    updateStars();
    const resizeObserver = new ResizeObserver(updateStars);
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    return () => {
      if (canvasRef.current) {
        resizeObserver.unobserve(canvasRef.current);
      }
    };
  }, [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        if (star.twinkleSpeed !== null) {
          star.opacity = 0.5 + Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.5);
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-[0] ${className || ''}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [userProfile, setUserProfile] = useState({
    name: "Arjun Sharma",
    email: "arjun.sharma@example.com",
    phone: "+91 98765 43210",
    batch: "2021",
    department: "Computer Science Engineering",
    currentRole: "Software Development Engineer",
    company: "Microsoft India",
    location: "Bangalore, Karnataka",
    experience: "3 years",
    skills: ["React", "Node.js", "Python", "AWS", "MongoDB"],
    bio: "Passionate software engineer with expertise in full-stack development. Love building scalable applications and mentoring junior developers.",
    linkedin: "https://linkedin.com/in/arjun-sharma",
    github: "https://github.com/arjunsharma",
    website: "https://arjunsharma.dev",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    status: "online",
    joinedDate: "September 2024"
  });

  const achievements = [
    { id: 1, title: "Top Contributor", description: "Donated ₹50,000+ to various causes", icon: "🏆" },
    { id: 2, title: "Event Organizer", description: "Organized 5 successful alumni events", icon: "🎯" },
    { id: 3, title: "Mentor", description: "Mentored 10+ junior alumni", icon: "👨‍🏫" },
    { id: 4, title: "Network Builder", description: "Connected 100+ alumni", icon: "🌐" }
  ];

  const activities = [
    { id: 1, type: "donation", title: "Donated ₹15,000 to Student Scholarship Fund", time: "2 days ago" },
    { id: 2, type: "event", title: "RSVP'd for Annual Alumni Meetup 2024", time: "1 week ago" },
    { id: 3, type: "connection", title: "Connected with Priya Gupta", time: "2 weeks ago" },
    { id: 4, type: "achievement", title: "Earned 'Top Contributor' badge", time: "1 month ago" }
  ];

  const connections = [
    { name: "Priya Gupta", role: "ML Engineer at Amazon", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=50&h=50&fit=crop&crop=face", status: "online" },
    { name: "Rohit Verma", role: "Senior SDE at Google", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face", status: "offline" },
    { name: "Sneha Agarwal", role: "Data Scientist at Zomato", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face", status: "online" },
    { name: "Vikash Kumar", role: "PM at Flipkart", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face", status: "offline" }
  ];

  const handleUpdateProfile = () => {
    alert("Profile updated successfully!");
    setShowUpdateModal(false);
    setIsEditing(false);
  };

  return (
    <div className="alumni-dashboard-container relative min-h-screen">
      {/* Shooting Stars and Stars Background */}
      <div className="fixed inset-0 overflow-hidden bg-slate-900">
        <StarsBackground 
          starDensity={0.00015}
          allStarsTwinkle={true}
          twinkleProbability={0.7}
          minTwinkleSpeed={0.5}
          maxTwinkleSpeed={1}
        />
        <ShootingStars
          minSpeed={10}
          maxSpeed={30}
          minDelay={1200}
          maxDelay={4200}
          starColor="#9E00FF"
          trailColor="#2EB9DF"
          starWidth={10}
          starHeight={1}
        />
      </div>

      {/* Update Profile Modal */}
      {showUpdateModal && (
        <div className="modal-overlay" onClick={() => setShowUpdateModal(false)}>
          <div 
            className="modal-content max-w-2xl w-full p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Update Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" defaultValue={userProfile.name} className="input" />
              <input type="email" placeholder="Email" defaultValue={userProfile.email} className="input" />
              <input type="tel" placeholder="Phone" defaultValue={userProfile.phone} className="input" />
              <input type="text" placeholder="Current Role" defaultValue={userProfile.currentRole} className="input" />
              <input type="text" placeholder="Company" defaultValue={userProfile.company} className="input" />
              <input type="text" placeholder="Location" defaultValue={userProfile.location} className="input" />
              <textarea placeholder="Bio" defaultValue={userProfile.bio} className="input sm:col-span-2 resize-none" rows="3" />
              <input type="url" placeholder="LinkedIn URL" defaultValue={userProfile.linkedin} className="input" />
              <input type="url" placeholder="GitHub URL" defaultValue={userProfile.github} className="input" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button 
                onClick={handleUpdateProfile}
                className="btn btn-primary flex-1 py-3 order-2 sm:order-1"
              >
                Update Profile
              </button>
              <button 
                onClick={() => setShowUpdateModal(false)}
                className="btn btn-secondary py-3 px-6 order-1 sm:order-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen pt-20 px-2 sm:px-4 lg:px-6 py-6">
        <div className="w-full max-w-[98vw] mx-auto">
          
          {/* Hero Section with "Your Profile" Heading */}
          <div className="text-center mb-12 sm:mb-16 animate-slide-up">
            <div className="inline-block">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Your Profile
              </h1>
              <div className="w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"></div>
            </div>
            <p className="text-slate-300 text-lg sm:text-xl mt-6 max-w-2xl mx-auto">
              Manage your professional journey and connect with fellow alumni
            </p>
          </div>

          {/* Profile Header - Clean White Card */}
          <div className="glass-card-strong p-6 sm:p-8 mb-6 sm:mb-8 animate-slide-up animated-border">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="relative flex-shrink-0">
                <img 
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-gray-200 shadow-xl"
                />
                <span className={`status-dot absolute bottom-2 right-2 w-6 h-6 ${userProfile.status === 'online' ? 'status-online' : 'status-offline'}`}></span>
                <button className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{userProfile.name}</h1>
                    <p className="text-lg text-slate-600 font-medium mb-1">{userProfile.currentRole} at {userProfile.company}</p>
                    <p className="text-slate-500 mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {userProfile.location}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="badge badge-primary">{userProfile.batch}</span>
                      <span className="badge badge-secondary">{userProfile.department}</span>
                      <span className="badge badge-success">{userProfile.experience} experience</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowUpdateModal(true)}
                    className="btn btn-primary px-6 py-3"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Navigation - Clean White Card */}
          <div className="glass-card p-2 mb-6 sm:mb-8 animate-fade-in">
            <div className="flex space-x-1 overflow-x-auto">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'achievements', name: 'Achievements' },
                { id: 'activity', name: 'Activity' },
                { id: 'connections', name: 'Connections' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`btn flex-shrink-0 py-3 px-4 sm:px-6 ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === 'overview' && (
                <div className="space-y-6 sm:space-y-8">
                  {/* Bio - Clean White Card */}
                  <div className="glass-card p-6 animate-slide-up">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">About Me</h3>
                    <p className="text-slate-600 leading-relaxed">{userProfile.bio}</p>
                  </div>

                  {/* Skills - Clean White Card */}
                  <div className="glass-card p-6 animate-slide-up">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.skills.map((skill, index) => (
                        <span key={index} className="badge badge-secondary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info - Clean White Card */}
                  <div className="glass-card p-6 animate-slide-up">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Email</p>
                          <p className="font-medium text-slate-900">{userProfile.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Phone</p>
                          <p className="font-medium text-slate-900">{userProfile.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-6">
                      <a href={userProfile.linkedin} className="btn btn-primary">
                        LinkedIn
                      </a>
                      <a href={userProfile.github} className="btn btn-secondary">
                        GitHub
                      </a>
                      {userProfile.website && (
                        <a href={userProfile.website} className="btn btn-success">
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={achievement.id} className="glass-card card-hover p-6 text-center animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                      <div className="text-4xl mb-4">{achievement.icon}</div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{achievement.title}</h3>
                      <p className="text-slate-600 text-sm">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={activity.id} className="glass-card card-hover p-4 sm:p-6 animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900 text-sm sm:text-base">{activity.title}</p>
                          <p className="text-slate-500 text-xs sm:text-sm">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'connections' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {connections.map((connection, index) => (
                    <div key={index} className="glass-card card-hover p-4 sm:p-6 animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img 
                            src={connection.avatar}
                            alt={connection.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-200"
                          />
                          <span className={`status-dot absolute -bottom-1 -right-1 ${connection.status === 'online' ? 'status-online' : 'status-offline'}`}></span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 truncate">{connection.name}</h4>
                          <p className="text-slate-600 text-sm truncate">{connection.role}</p>
                          <div className="flex space-x-2 mt-2">
                            <button className="btn btn-primary text-xs px-3 py-1">
                              Message
                            </button>
                            <button className="btn btn-secondary text-xs px-3 py-1">
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 sm:space-y-8">
              {/* Quick Stats - Clean White Card */}
              <div className="glass-card p-6 animate-fade-in">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Profile Views</span>
                    <span className="font-bold text-blue-600">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Connections</span>
                    <span className="font-bold text-green-600">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Events Attended</span>
                    <span className="font-bold text-purple-600">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Donations</span>
                    <span className="font-bold text-orange-600">₹45,000</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity Summary - Clean White Card */}
              <div className="glass-card p-6 animate-fade-in">
                <h3 className="text-lg font-bold text-slate-900 mb-4">This Month</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm">📅</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">3 Events Attended</p>
                      <p className="text-xs text-slate-500">Last: Tech Talk AI</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-sm">💝</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">₹15,000 Donated</p>
                      <p className="text-xs text-slate-500">To scholarship fund</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-sm">🤝</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">5 New Connections</p>
                      <p className="text-xs text-slate-500">Growing network</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Member Since - Clean White Card */}
              <div className="glass-card p-6 text-center animate-fade-in animated-border">
                <h3 className="font-bold text-lg mb-2 text-slate-900">Member Since</h3>
                <p className="text-2xl font-bold text-blue-600">{userProfile.joinedDate}</p>
                <p className="text-slate-500 text-sm mt-2">Welcome to our community!</p>
              </div>
            </div>
          </div>

          {/* Footer - Clean White Card */}
          <footer className="glass-card mt-6 sm:mt-8 p-4 sm:p-6 text-center">
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
