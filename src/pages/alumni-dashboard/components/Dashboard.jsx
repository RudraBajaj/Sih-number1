export default function Dashboard() {
  const recentAlumni = [
    {
      name: "Arjun Sharma",
      role: "Software Development Engineer at Microsoft India",
      batch: "Batch 2021",
      location: "Bangalore, Karnataka",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Priya Gupta", 
      role: "ML Engineer at Amazon Development Centre",
      batch: "Batch 2020",
      location: "Hyderabad, Telangana",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Rohit Verma",
      role: "Senior Software Engineer at Google India", 
      batch: "Batch 2019",
      location: "Gurgaon, Haryana",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Sneha Agarwal",
      role: "Data Scientist at Zomato",
      batch: "Batch 2022", 
      location: "Delhi NCR",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const upcomingEvents = [
    {
      title: "CU TechFest 2024 - Alumni Reunion",
      date: "2024-12-20 at 10:00 AM",
      location: "Chandigarh University Campus, Mohali",
      attendees: 89
    },
    {
      title: "Hackathon Success Workshop by Alumni", 
      date: "2024-11-25 at 2:00 PM",
      location: "CU Innovation Lab, Block A",
      attendees: 45
    },
    {
      title: "Research Paper Writing Masterclass",
      date: "2024-10-30 at 4:00 PM", 
      location: "Online (MS Teams)",
      attendees: 67
    },
    {
      title: "AI/ML Industry Trends 2024",
      date: "2024-12-05 at 6:00 PM",
      location: "CU Auditorium, Kharar Campus", 
      attendees: 23
    }
  ];

  return (
    <div className="w-full min-h-screen pt-20 px-2 py-6 zoom-90">
      <div
        className="w-full max-w-[95vw] mx-auto bg-slate-200/25 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-6"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)"
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Dashboard
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            Overview of your activities and key metrics.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-blue-100/60 backdrop-blur-md rounded-2xl p-5 border border-blue-200/50 hover:scale-105 transition duration-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">3247</div>
              <div className="text-blue-800 font-medium text-sm">Total Alumni</div>
            </div>
          </div>
          <div className="bg-green-100/60 backdrop-blur-md rounded-2xl p-5 border border-green-200/50 hover:scale-105 transition duration-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">156</div>
              <div className="text-green-800 font-medium text-sm">Recent Graduates</div>
            </div>
          </div>
          <div className="bg-orange-100/60 backdrop-blur-md rounded-2xl p-5 border border-orange-200/50 hover:scale-105 transition duration-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">8</div>
              <div className="text-orange-800 font-medium text-sm">Upcoming Events</div>
            </div>
          </div>
          <div className="bg-purple-100/60 backdrop-blur-md rounded-2xl p-5 border border-purple-200/50 hover:scale-105 transition duration-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">67</div>
              <div className="text-purple-800 font-medium text-sm">Active Mentors</div>
            </div>
          </div>
        </div>

        {/* Recently Joined Alumni */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center">
            <span className="text-xl mr-2">🌟</span>
            Recently Joined Alumni
          </h2>
          <div className="space-y-3">
            {recentAlumni.map((alumnus, index) => (
              <div key={index} className="bg-white/40 backdrop-blur-md rounded-xl p-4 border border-white/30 hover:bg-white/50 transition duration-200">
                <div className="flex items-center space-x-3">
                  <img 
                    src={alumnus.avatar} 
                    alt={alumnus.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800">{alumnus.name}</h3>
                    <p className="text-slate-600 font-medium text-sm">{alumnus.role} • {alumnus.batch}</p>
                    <p className="text-slate-500 flex items-center mt-1 text-sm">
                      <span className="text-red-500 mr-1">📍</span>
                      {alumnus.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center">
            <span className="text-xl mr-2">📅</span>
            Upcoming Events
          </h2>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white/40 backdrop-blur-md rounded-xl p-4 border border-white/30 hover:bg-white/50 transition duration-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{event.title}</h3>
                    <p className="text-slate-600 mb-1 flex items-center text-sm">
                      <span className="text-blue-500 mr-2">📅</span>
                      {event.date}
                    </p>
                    <p className="text-slate-600 flex items-center text-sm">
                      <span className="text-red-500 mr-2">📍</span>
                      {event.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">{event.attendees}</div>
                    <div className="text-xs text-slate-600">attendees</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full max-w-[95vw] mx-auto mt-8 bg-slate-200/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
        <div className="text-center text-slate-600 text-sm">
          <p>&copy; 2025 Alumni Network. Built with ❤️ for connecting minds.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
