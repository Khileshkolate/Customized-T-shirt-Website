import React from 'react';

const StatsCard = ({ title, value, icon, change, trend, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </div>
      
      {change && (
        <div className="flex items-center gap-1 text-sm">
          <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
            {trend === 'up' ? '↗' : '↘'} {change}
          </span>
          <span className="text-gray-500">from last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;