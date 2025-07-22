import React from 'react';
import {
  FileText,
  Search,
  Archive,
  CheckCircle
} from 'lucide-react';

const iconMap = {
  posts: <FileText className="text-blue-500 w-6 h-6" />,
  found: <Search className="text-gray-600 w-6 h-6" />,
  total: <Archive className="text-gray-600 w-6 h-6" />,
};

const MetricsCard = ({ type, count, label }) => {
  return (
    <div className="flex items-center even:bg-white odd:bg-blue-500 odd:text-white even:text-gray-800  justify-center gap-4 p-4  text-gray-700 border border-gray-300 rounded-xl w-full max-w-xs">
      <div className="bg-gray-100  p-3 rounded-full">
        {iconMap[type]}
      </div>
      <div>
        <h3 className="text-lg font-semibold ">{label}</h3>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>  
  );
};

export default MetricsCard;
