import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <Link to="/" className="relative">
        <img 
          src="/assets/emotions-app-logo.png" 
          alt="Emotions Logo" 
          className="h-6 md:h-8 relative"
        />
      </Link>
    </div>
  );
};

export default Header; 