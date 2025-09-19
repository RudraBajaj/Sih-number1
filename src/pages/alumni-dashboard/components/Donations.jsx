import React, { useState } from 'react';

export default function Donations() {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedCause, setSelectedCause] = useState(null);
  const [showContributionsModal, setShowContributionsModal] = useState(false);

  const [userContributions] = useState([
    {
      id: 1,
      cause: "Student Scholarship Fund",
      amount: 15000,
      date: "2024-11-15",
      status: "Completed",
      impact: "Helped 2 students with tuition fees",
      category: "Education"
    },
    {
      id: 2,
      cause: "Infrastructure Development",
      amount: 25000,
      date: "2024-10-20",
      status: "Completed",
      impact: "Contributed to new computer lab setup",
      category: "Infrastructure"
    },
    {
      id: 3,
      cause: "Research & Innovation",
      amount: 10000,
      date: "2024-09-10",
      status: "Completed",
      impact: "Funded research equipment purchase",
      category: "Research"
    },
    {
      id: 4,
      cause: "Alumni Network Events",
      amount: 5000,
      date: "2024-08-25",
      status: "Completed",
      impact: "Sponsored networking dinner for 50 alumni",
      category: "Events"
    }
  ]);

  const totalContributed = userContributions.reduce((sum, contrib) => sum + contrib.amount, 0);

  const donationStats = [
    { label: "Total Raised", amount: "₹12,45,000", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", icon: "💰" },
    { label: "Active Donors", amount: "234", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", icon: "👥" },
    { label: "Projects Funded", amount: "18", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200", icon: "🎯" },
    { label: "This Month", amount: "₹85,000", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", icon: "📈" }
  ];

  const donationCauses = [
    {
      id: 1,
      title: "Student Scholarship Fund",
      description: "Support deserving students with financial assistance for their education journey",
      raised: 750000,
      target: 1000000,
      donors: 89,
      urgency: "High",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Infrastructure Development", 
      description: "Upgrade campus facilities, laboratories, and learning spaces for better education",
      raised: 450000,
      target: 800000,
      donors: 67,
      urgency: "Medium",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Research & Innovation Lab",
      description: "Fund cutting-edge research projects and innovation labs for breakthrough discoveries",
      raised: 320000,
      target: 600000,
      donors: 43,
      urgency: "Medium",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Alumni Network Events",
      description: "Organize networking events, workshops, and professional development sessions",
      raised: 125000,
      target: 200000,
      donors: 35,
      urgency: "Low",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop"
    }
  ];

  const recentDonors = [
    { name: "Arjun Sharma", amount: "₹25,000", time: "2 hours ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" },
    { name: "Priya Gupta", amount: "₹15,000", time: "5 hours ago", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?w=50&h=50&fit=crop&crop=face" },
    { name: "Rohit Verma", amount: "₹50,000", time: "1 day ago", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" },
    { name: "Sneha Agarwal", amount: "₹10,000", time: "2 days ago", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" }
  ];

  const handleDonate = (cause, amount = selectedAmount || customAmount) => {
    if (!amount || amount <= 0) {
      alert("Please select or enter a valid amount");
      return;
    }
    alert(`Thank you for your ₹${amount} donation to ${cause.title}! Redirecting to payment gateway...`);
    setShowDonateModal(false);
    setSelectedAmount('');
    setCustomAmount('');
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      "High": "bg-red-100 text-red-800 border-red-200",
      "Medium": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Low": "bg-green-100 text-green-800 border-green-200"
    };
    return colors[urgency] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Education": "bg-blue-100 text-blue-800",
      "Infrastructure": "bg-purple-100 text-purple-800",
      "Research": "bg-green-100 text-green-800",
      "Events": "bg-orange-100 text-orange-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="alumni-dashboard-container">
      {/* Donate Modal */}
      {showDonateModal && (
        <div className="modal-overlay" onClick={() => setShowDonateModal(false)}>
          <div 
            className="modal-content max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-6 mb-8">
              <img 
                src={selectedCause?.image} 
                alt={selectedCause?.title}
                className="w-20 h-20 rounded-xl object-cover shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{selectedCause?.title}</h3>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(selectedCause?.urgency)}`}>
                    {selectedCause?.urgency} Priority
                  </span>
                  <span className="text-slate-500 text-sm">•</span>
                  <span className="text-slate-600 text-sm">{selectedCause?.donors} donors</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-lg font-semibold text-slate-700 mb-3">
                <span>₹{selectedCause?.raised?.toLocaleString()} raised</span>
                <span>₹{selectedCause?.target?.toLocaleString()} goal</span>
              </div>
              <div className="progress mb-2">
                <div 
                  className="progress-bar" 
                  style={{width: `${selectedCause ? (selectedCause.raised / selectedCause.target) * 100 : 0}%`}}
                ></div>
              </div>
              <p className="text-sm text-slate-500">{selectedCause ? Math.round((selectedCause.raised / selectedCause.target) * 100) : 0}% funded</p>
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold text-slate-700 mb-4">Choose Amount</label>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {['1000', '2500', '5000', '10000'].map(amount => (
                  <button 
                    key={amount}
                    onClick={() => {setSelectedAmount(amount); setCustomAmount('');}}
                    className={`btn py-4 text-lg ${selectedAmount === amount ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {setCustomAmount(e.target.value); setSelectedAmount('');}}
                  placeholder="Enter custom amount"
                  className="input pl-12 text-lg py-4"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 text-lg">₹</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => handleDonate(selectedCause)}
                className="btn btn-success flex-1 py-4 text-lg"
                disabled={!selectedAmount && !customAmount}
              >
                <span>💝</span>
                Donate ₹{selectedAmount || customAmount || '0'}
              </button>
              <button 
                onClick={() => setShowDonateModal(false)}
                className="btn btn-secondary py-4 px-8"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Your Donations Modal */}
      {showContributionsModal && (
        <div className="modal-overlay" onClick={() => setShowContributionsModal(false)}>
          <div 
            className="modal-content max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold text-gradient">Your Donation History</h3>
              <button 
                onClick={() => setShowContributionsModal(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="glass-card p-8 mb-8 text-center bg-gradient-green text-white">
              <div className="text-5xl font-bold mb-2">
                ₹{totalContributed.toLocaleString()}
              </div>
              <div className="text-xl opacity-90 mb-3">Total Contributed</div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">🏆</span>
                <span className="text-lg font-semibold">Top 5% Contributor</span>
              </div>
            </div>

            <div className="grid gap-6">
              {userContributions.map((contribution, index) => (
                <div 
                  key={contribution.id} 
                  className="glass-card card-hover p-6 animate-slide-up"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-xl font-bold text-slate-800">{contribution.cause}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(contribution.category)}`}>
                          {contribution.category}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-3">{contribution.impact}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>📅 {contribution.date}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          ✅ {contribution.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-600">
                        ₹{contribution.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-6 mt-8 text-center">
              <p className="text-slate-600 text-lg">
                Thank you for making a difference in so many lives! 🙏
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full min-h-screen pt-20 px-1 sm:px-2 py-6">
        <div className="w-full max-w-[98vw] mx-auto">
          {/* Header */}
          <div className="glass-card-strong p-8 mb-8 animate-slide-up">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-3 flex items-center">
                  💝 Donations
                </h1>
                <p className="text-slate-600 text-lg">Support our alma mater and help future generations succeed</p>
              </div>
              <button 
                onClick={() => setShowContributionsModal(true)}
                className="btn btn-primary text-lg px-8 py-4"
              >
                <span>📊</span>
                Your Donation History
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {donationStats.map((stat, index) => (
              <div 
                key={index}
                className="glass-card card-hover text-center p-6 animate-slide-up"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.amount}
                </div>
                <div className="text-slate-700 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Donation Causes */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Active Causes</h2>
                <div className="text-slate-600 font-medium">
                  {donationCauses.length} causes need your support
                </div>
              </div>
              
              <div className="grid gap-8">
                {donationCauses.map((cause, index) => (
                  <div 
                    key={cause.id} 
                    className="glass-card card-hover p-6 animate-fade-in"
                    style={{animationDelay: `${index * 200}ms`}}
                  >
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={cause.image} 
                          alt={cause.title}
                          className="w-full lg:w-40 h-40 object-cover rounded-xl shadow-lg"
                        />
                        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${getUrgencyColor(cause.urgency)}`}>
                          {cause.urgency}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800 mb-3">{cause.title}</h3>
                        <p className="text-slate-600 mb-4">{cause.description}</p>
                        
                        <div className="mb-6">
                          <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                            <span>₹{cause.raised.toLocaleString()} raised</span>
                            <span>₹{cause.target.toLocaleString()} goal</span>
                          </div>
                          <div className="progress">
                            <div 
                              className="progress-bar" 
                              style={{width: `${(cause.raised / cause.target) * 100}%`}}
                            ></div>
                          </div>
                          <p className="text-xs text-slate-500 mt-2">
                            {cause.donors} donors • {Math.round((cause.raised / cause.target) * 100)}% funded
                          </p>
                        </div>

                        <button 
                          onClick={() => {setSelectedCause(cause); setShowDonateModal(true);}}
                          className="btn btn-success w-full lg:w-auto px-8 py-3"
                        >
                          <span>💝</span>
                          Donate Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Recent Donors */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                  <span className="mr-3 text-2xl">🌟</span>
                  Recent Donors
                </h3>
                <div className="space-y-4">
                  {recentDonors.map((donor, index) => (
                    <div 
                      key={index} 
                      className="glass-card p-4 card-hover animate-slide-up"
                      style={{animationDelay: `${index * 100}ms`}}
                    >
                      <div className="flex items-center space-x-4">
                        <img 
                          src={donor.avatar} 
                          alt={donor.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white/50 shadow"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-800 truncate">{donor.name}</h4>
                          <p className="text-slate-500 text-xs">{donor.time}</p>
                        </div>
                        <div className="text-emerald-600 font-bold">{donor.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="btn btn-secondary w-full mt-6">
                  View All Donors
                </button>
              </div>

              {/* Quick Donate */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <span className="mr-3 text-2xl">⚡</span>
                  Quick Donate
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  Make a quick donation to our general fund
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {['1000', '2500', '5000', '10000'].map(amount => (
                    <button 
                      key={amount}
                      onClick={() => handleDonate({title: "General Fund"}, amount)}
                      className="btn btn-secondary py-3 text-sm font-semibold"
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => {
                    setSelectedCause({title: "General Fund", description: "Support various college initiatives"});
                    setShowDonateModal(true);
                  }}
                  className="btn btn-success w-full py-3"
                >
                  <span>🎯</span>
                  Custom Amount
                </button>
              </div>

              {/* Your Impact */}
              <div className="glass-card p-6 bg-gradient-blue text-white">
                <h3 className="text-xl font-bold mb-6">Your Impact</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Students Helped</span>
                    <span className="text-2xl font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Projects Funded</span>
                    <span className="text-2xl font-bold">4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Contributed</span>
                    <span className="text-2xl font-bold">₹{totalContributed.toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white/20 rounded-xl text-center">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="font-semibold">Top 5% Contributor</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="glass-card mt-8 p-6 text-center">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-slate-600">
                &copy; 2025 Alumni Network. Built with ❤️ for connecting minds.
              </p>
              <div className="flex space-x-6">
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
