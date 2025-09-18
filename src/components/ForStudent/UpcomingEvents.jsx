import React from 'react';

const UpcomingEvents = ({ userRole = 'student' }) => {
    const events = [
        {
            title: "Tech Career Fair 2024",
            date: "Oct 15, 2024 at 2:00 PM",
            location: "University Convention Center",
            attendees: "250 attendees",
            description: "Meet with top tech companies and explore internship and full-time opportunities in the technology sector.",
            tags: ["Career", "Technology"],
            status: userRole === 'student' ? 'Available' : 'Registered',
            isRegistered: userRole !== 'student'
        },
        {
            title: "Alumni Networking Mixer",
            date: "Oct 22, 2024 at 6:30 PM",
            location: "Alumni Hall",
            attendees: "120 attendees",
            description: "Casual networking event with alumni from various industries. Great opportunity to expand your professional network.",
            tags: ["Networking", "Social"],
            status: "Registered",
            isRegistered: true
        }
    ];

    return (
        <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <span className="text-xl mr-2">📅</span>
                    <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                    View All
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className="space-y-6">
                {events.map((event, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">{event.title}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${event.isRegistered
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                {event.status}
                            </span>
                        </div>

                        <div className="space-y-2 mb-3">
                            <p className="text-sm text-gray-600 flex items-center">
                                <span className="mr-2">📅</span>
                                {event.date}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                                <span className="mr-2">📍</span>
                                {event.location}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                                <span className="mr-2">👥</span>
                                {event.attendees}
                            </p>
                        </div>

                        <p className="text-sm text-gray-700 mb-3">{event.description}</p>

                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                {event.tags.map((tag, tagIndex) => (
                                    <span
                                        key={tagIndex}
                                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {!event.isRegistered && (
                                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
                                    📅 RSVP
                                </button>
                            )}

                            {event.isRegistered && (
                                <div className="flex items-center text-green-600 text-sm font-medium">
                                    <span className="mr-1">✓</span>
                                    Registered
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingEvents;