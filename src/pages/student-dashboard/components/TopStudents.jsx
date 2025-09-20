export default function TopStudents() {
  const topStudents = [
    {
      rank: 1,
      name: "Arjun Sharma",
      batch: "2021",
      department: "Computer Science",
      cgpa: "9.8",
      achievements: ["Microsoft Intern", "Google Summer of Code", "Hackathon Winner"],
      currentRole: "SDE at Microsoft",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      rank: 2,
      name: "Priya Gupta",
      batch: "2020",
      department: "Artificial Intelligence",
      cgpa: "9.7",
      achievements: ["Research Publications", "AI Competition Winner", "Dean's List"],
      currentRole: "ML Engineer at Amazon",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=100&h=100&fit=crop&crop=face"
    },
    {
      rank: 3,
      name: "Rohit Verma",
      batch: "2019",
      department: "Computer Science",
      cgpa: "9.6",
      achievements: ["Open Source Contributor", "Startup Founder", "Technical Lead"],
      currentRole: "Senior SDE at Google",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      rank: 4,
      name: "Sneha Agarwal",
      batch: "2022",
      department: "Data Science",
      cgpa: "9.5",
      achievements: ["Data Science Olympiad", "Industry Projects", "Research Assistant"],
      currentRole: "Data Scientist at Zomato",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      rank: 5,
      name: "Vikash Kumar",
      batch: "2018",
      department: "Computer Science",
      cgpa: "9.4",
      achievements: ["Product Management Cert", "Leadership Awards", "Innovation Projects"],
      currentRole: "Product Manager at Flipkart",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    {
      rank: 6,
      name: "Anjali Singh",
      batch: "2021",
      department: "Electronics & Communication",
      cgpa: "9.3",
      achievements: ["Hardware Design Awards", "Patent Filed", "Industry Collaboration"],
      currentRole: "Hardware Engineer at Samsung",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const getRankColor = (rank) => {
    if (rank === 1) return "bg-yellow-100/80 border-yellow-300 text-yellow-800";
    if (rank === 2) return "bg-gray-100/80 border-gray-300 text-gray-800";
    if (rank === 3) return "bg-orange-100/80 border-orange-300 text-orange-800";
    return "bg-blue-100/80 border-blue-300 text-blue-800";
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "🏆";
  };

  return (
    <div className="w-full min-h-screen pt-20 px-2 py-6 zoom-90 bg-gray-300">
      <div className="w-full max-w-[95vw] mx-auto bg-slate-200/25 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 mb-6">
            <h1 className="text-4xl font-bold text-slate-800 mb-2 flex items-center">
              🏆 Top Students
            </h1>
            <p className="text-slate-600">Celebrating academic excellence and outstanding achievements</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <select className="px-4 py-2 bg-white/40 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none">
            <option>All Batches</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
            <option>2019</option>
            <option>2018</option>
          </select>
          <select className="px-4 py-2 bg-white/40 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none">
            <option>All Departments</option>
            <option>Computer Science</option>
            <option>Artificial Intelligence</option>
            <option>Data Science</option>
            <option>Electronics & Communication</option>
          </select>
          <select className="px-4 py-2 bg-white/40 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none">
            <option>Sort by CGPA</option>
            <option>Sort by Achievements</option>
            <option>Sort by Batch</option>
          </select>
          <button className="px-4 py-2 bg-slate-300/50 text-slate-700 rounded-xl hover:bg-slate-300/70 transition">
            Clear Filters
          </button>
        </div>

        {/* Top Students List */}
        <div className="space-y-4">
          {topStudents.map((student, index) => (
            <div key={index} className={`bg-white/40 backdrop-blur-md rounded-xl p-6 border border-white/30 hover:bg-white/50 transition duration-200 ${student.rank <= 3 ? 'ring-2 ring-yellow-300/50' : ''}`}>
              <div className="flex items-center space-x-6">
                {/* Rank */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 backdrop-blur-md ${getRankColor(student.rank)}`}>
                  <div className="text-center">
                    <div className="text-2xl">{getRankIcon(student.rank)}</div>
                    <div className="text-xs font-bold">#{student.rank}</div>
                  </div>
                </div>

                {/* Avatar */}
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/50"
                />

                {/* Student Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{student.name}</h3>
                      <p className="text-slate-600 font-medium">Batch {student.batch} • {student.department}</p>
                      <p className="text-slate-500 text-sm mt-1">{student.currentRole}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-100/60 rounded-lg px-3 py-1 border border-green-200/50">
                        <span className="text-green-800 font-bold text-lg">CGPA: {student.cgpa}</span>
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mt-3">
                    <p className="text-slate-600 text-sm font-medium mb-2">Key Achievements:</p>
                    <div className="flex flex-wrap gap-2">
                      {student.achievements.map((achievement, achievementIndex) => (
                        <span
                          key={achievementIndex}
                          className="bg-blue-100/60 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium border border-blue-200/50"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition">
                    Connect
                  </button>
                  <button className="bg-slate-300/60 text-slate-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-slate-300/80 transition">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
