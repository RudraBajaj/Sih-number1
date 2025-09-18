import React from 'react';

const QuickActions = () => {
    const actions = [
        {
            title: "Find Mentors",
            description: "Connect with alumni professionals in your field for career guidance and networking opportunities.",
            icon: "👥",
            color: "teal",
            bgColor: "bg-teal-500",
            textColor: "text-white"
        },
        {
            title: "Browse Events",
            description: "Discover upcoming networking events, workshops, and career fairs hosted by the alumni network.",
            icon: "📅",
            color: "blue",
            bgColor: "bg-blue-500",
            textColor: "text-white"
        },
        {
            title: "Career Resources",
            description: "Access job postings, resume templates, and career development tools shared by alumni.",
            icon: "📚",
            color: "purple",
            bgColor: "bg-purple-500",
            textColor: "text-white"
        }
    ];

    return (
        <div className="mb-8">
            <div className="flex items-center mb-6">
                <span className="text-xl mr-2">⚡</span>
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {actions.map((action, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center`}>
                                <span className="text-xl">{action.icon}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                                <div className="flex justify-end">
                                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;