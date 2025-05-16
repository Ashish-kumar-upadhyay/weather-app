import React from 'react';
import { Cloud } from 'lucide-react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Cloud className="text-blue-400 animate-pulse" size={48} />
      <p className="mt-4 text-gray-600">Loading weather data...</p>
    </div>
  );
};

export default Loading;