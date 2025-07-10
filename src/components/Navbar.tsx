import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
      {/* Brand/Title */}
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">RUMAH & CLUB 1001 BINTANG VESSILIA</h1>
      </div>

      {/* User Profile/Avatar */}
      <div className="flex items-center space-x-4">
        {/* You would typically have a user icon or avatar here */}
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
