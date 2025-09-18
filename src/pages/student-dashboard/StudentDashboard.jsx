import React from 'react';
import Header from '../../components/Shared/Header';
import StatsCard from '../../components/Shared/StatsCard';
import QuickActions from '../../components/ForStudent/QuickActions';
import RecommendedMentors from '../../components/ForStudent/RecommendedMentors';
import UpcomingEvents from '../../components/ForStudent/UpcomingEvents';
import ActivityFeed from '../../components/Shared/ActivityFeed';

const StudentDashboard = () => {
    // Student-specific stats data
    const statsData = [
        {
            title: "Active Connections",
            value: "12",
            change: "25% from last month",
            changeType: "positive",
            icon: "👥",
            color: "teal"
        },
        {
            title: "Events Attended",
            value: "8",
            change: "14% from last month",
            changeType: "positive",
            icon: "📅",
            color: "blue"
        },
        {
            title: "Career Resources",
            value: "24",
            change: "8% from last month",
            changeType: "positive",
            icon: "📚",
            color: "purple"
        },
        {
            title: "Profile Views",
            value: "156",
            change: "32% from last month",
            changeType: "positive",
            icon: "👁️",
            color: "orange"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header userRole="student" />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🎓</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Good morning, Alex Johnson! 🎓
                            </h1>
                            <p className="text-gray-600">
                                Computer Science • Junior • Student ID: STU2024001
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statsData.map((stat, index) => (
                        <StatsCard key={index} {...stat} />
                    ))}
                </div>

                {/* Quick Actions */}
                <QuickActions />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <RecommendedMentors />
                        <UpcomingEvents />
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1">
                        <ActivityFeed />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;