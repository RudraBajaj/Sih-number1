import React from 'react';

const RecommendedMentors = () => {
    const mentors = [
        {
            name: "Sarah Chen",
            role: "Software Engineering",
            company: "San Francisco, CA",
            graduationYear: "Class of 2018",
            skills: ["React", "Node.js", "System Design"],
            extraSkills: 2,
            avatar: "SC",
            isAvailable: true
        },
        {
            name: "Michael Rodriguez",
            role: "Product Management",
            company: "New York, NY",
            graduationYear: "Class of 2016",
            skills: ["Product Strategy", "Data Analytics", "User Research"],
            extraSkills: 1,
            avatar: "MR",
            isAvailable: true
        }
    ];

    return (
        <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <span className="text-xl mr-2">👥</span>
                    <h2 className="text-xl font-semibold text-gray-900">Recommended Mentors</h2>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                    View All
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mentors.map((mentor, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-medium text-gray-700">{mentor.avatar}</span>
                                </div>
                                {mentor.isAvailable && (
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                            </div>

                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                                <p className="text-blue-600 text-sm font-medium">{mentor.role}</p>
                                <p className="text-gray-600 text-sm flex items-center mt-1">
                                    <span className="mr-1">🎓</span>
                                    {mentor.graduationYear}
                                </p>
                                <p className="text-gray-600 text-sm flex items-center">
                                    <span className="mr-1">📍</span>
                                    {mentor.company}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-3">
                                    {mentor.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {mentor.extraSkills > 0 && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                            +{mentor.extraSkills} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                            <span className="mr-1">💬</span>
                            Connect
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedMentors;