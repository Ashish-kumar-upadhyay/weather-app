import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-4">
      <div className="flex items-start">
        <AlertCircle className="text-red-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-red-800 font-medium">Error</p>
          <p className="text-red-700 text-sm mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Error;