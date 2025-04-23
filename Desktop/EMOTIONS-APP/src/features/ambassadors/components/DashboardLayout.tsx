import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <Link to="/" className="flex items-center">
        <img
          src="/assets/emotions-logo-black.png"
          alt="Emotions Dashboard Logo"
          className="h-8 w-auto"
        />
      </Link>
    </div>
  );
};

export default DashboardLayout; 