// js/Components/Admin/Dashboard/StatCard.tsx
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
  trend?: string;
  description?: string;
}

export default function StatCard({ title, value, icon, color, trend, description }: StatCardProps) {
  const colorClasses = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-500' },
    green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-500' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-500' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-500' },
  };

  const { bg, text, border } = colorClasses[color];

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${border}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center`}>
          <i className={`${icon} ${text} text-xl`}></i>
        </div>
      </div>
      {trend && (
        <p className={`${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'} text-sm mt-4`}>
          <i className={`fas fa-arrow-${trend.startsWith('+') ? 'up' : 'down'} mr-1`}></i>
          {trend}
        </p>
      )}
      {description && (
        <p className="text-gray-500 text-sm mt-4">{description}</p>
      )}
    </div>
  );
}