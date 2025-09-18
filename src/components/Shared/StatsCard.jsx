import React from 'react';

const StatsCard = ({
    title,
    value,
    change,
    changeType = 'positive',
    icon,
    color = 'blue'
}) => {
    const colorClasses = {
        teal: 'border-teal-200 bg-teal-50',
        blue: 'border-blue-200 bg-blue-50',
        purple: 'border-purple-200 bg-purple-50',
        orange: 'border-orange-200 bg-orange-50'
    };

    const changeColorClass = changeType === 'positive'
        ? 'text-green-600'
        : 'text-red-600';

    return (
        <div className={`bg-white rounded-lg border-2 ${colorClasses[color]} p-6`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                </div>
                <div className="text-2xl">{icon}</div>
            </div>

            {change && (
                <div className="flex items-center mt-4">
                    <span className={`text-sm ${changeColorClass} flex items-center`}>
                        {changeType === 'positive' ? '↗️' : '↘️'}
                        <span className="ml-1">{change}</span>
                    </span>
                </div>
            )}
        </div>
    );
};

export default StatsCard;