import Link from 'next/link';
import React from 'react';
import ConnectWalletButton from '@/components/cta/ConnectWalletBtn';
import { MdDiamond } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import GoToPortfolio from '../cta/GoToPortfolio';

const Navbar = () => {
  return (
    <div className="w-full h-[87px] border-b-[1px] border-gray-600 flex items-center px-16 bg-[#18181a] gap-44">
      <div className="flex items-center gap-20 text-lg font-semibold text-white">
        {/* Left elements */}
        <Link href="/">
          <MdDiamond className="w-8 h-auto cursor-pointer" />
        </Link>
        <Link href="/collection" className="relative transition duration-300">
          <div className="hover:border-b-2 border-gray-400 pb-1">Collections</div>
        </Link>
        <Link href="/listen" className="relative transition duration-300">
          <div className="hover:border-b-2 border-gray-400 pb-1">Listen</div>
        </Link>
      </div>
      <div className="flex-grow flex justify-center">
        {/* Center input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search..."
            className="px-12 py-3 rounded-lg w-full bg-[#27282d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {/* Right elements */}
        <ConnectWalletButton />
        <GoToPortfolio />
      </div>
    </div>
  );
};

export default Navbar;