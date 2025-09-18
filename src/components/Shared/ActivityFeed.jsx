import React from 'react';

const ActivityFeed = ({ userRole = 'student' }) => {
    const getActivitiesForRole = (role) => {
        const baseActivities = [
            {
                type: "profile",
                title: "Profile completion reminder",
                description: "Complete your profile to get better mentor recommendations",
                time: "2d ago",
                icon: "⚠️",
                color: "yellow"
            }
        ];

        const studentActivities = [
            {
                type: "mentor",
                title: "New mentor connection",
                description: "Sarah Chen accepted your mentorship request",
                time: "30m ago",
                icon: "🤝",
                color: "green"
            },
            {
                type: "event",
                title: "Event registration confirmed",
                description: "Successfully registered for Alumni Networking Mixer",
                time: "2h ago",
                icon: "📅",
                color: "blue"
            },
            {
                type: "job",
                title: "New job posting",
                description: "Software Engineer Intern position at TechCorp matches your profile",
                time: "1d ago",
                icon: "💼",
                color: "purple"
            }
        ];

        const alumniActivities = [
            {
                type: "mentee",
                title: "New mentorship request",
                description: "Alex Johnson wants to connect with you",
                time: "1h ago",
                icon: "👋",
                color: "green"
            },
            {
                type: "event",
                title: "Event hosting reminder",
                description: "Your networking event is tomorrow",
                time: "1d ago",
                icon: "🎯",
                color: "orange"
            }
        ];

        if (role === 'student') {
            return [...studentActivities, ...baseActivities];
        } else if (role === 'alumni') {
            return [...alumniActivities, ...baseActivities];
        }

        return baseActivities;
    };

    const activities = getActivitiesForRole(userRole);

    const getColorClasses = (color) => {
        const colors = {
            green: 'bg-green-100 text-green-600',
            blue: 'bg-blue-100 text-blue-600',
            purple: 'bg-purple-100 text-purple-600',
            yellow: 'bg-yellow-100 text-yellow-600',
            orange: 'bg-orange-100 text-orange-600'
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <span className="text-xl mr-2">📊</span>
                    <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View all activity
                </button>
            </div>

            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColorClasses(activity.color)}`}>
                            <span className="text-sm">{activity.icon}</span>
                        </div>

                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-600">{activity.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityFeed;