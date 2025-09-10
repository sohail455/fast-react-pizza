import React from 'react';
import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/UserName';
function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-500 px-4 py-4">
      <Link to={'/'} className="text-xl font-semibold tracking-[5px]">
        Fast React Pizza co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
