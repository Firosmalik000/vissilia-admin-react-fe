import React from 'react';
import Logo from '@/assets/icon/logo.png';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm h-[80px] flex items-center justify-between px-6">
      {/* Brand/Title */}
      <div className="flex items-center">
        <span className="text-xl font-semibold text-gray-800">RUMAH & CLUB 1001 BINTANG VESSILIA</span>
      </div>

      {/* User Profile/Avatar */}
      <div className="flex items-center space-x-4">
        {/* You would typically have a user icon or avatar here */}
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600">
          <img src={Logo} alt="Logo" className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
