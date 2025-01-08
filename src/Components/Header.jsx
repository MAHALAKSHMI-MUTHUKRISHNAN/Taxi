import React from 'react';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faBox } from '@fortawesome/free-solid-svg-icons';
import { UserButton } from '@clerk/clerk-react';

function Header() {
  const headerMenu = [
    {
      id: 1,
      name: 'Ride',
      icon: faCar,
    },
    {
      id: 2,
      name: 'Package',
      icon: faBox,
    },
  ];

  const activeMenuId = 1; // Example: Make "Ride" active

  return (
    <div className="p-5 pb-3 pl-10 border-b-4 border-gray-200 flex items-center justify-between flex-wrap">
      <div>
        <a href="/">
          <img src={logo} alt="Company Logo" width={70} height={70} />
        </a>
      </div>
      <div className="flex gap-6 items-center">
        {headerMenu.map((menu) => (
          <div
            key={menu.id}
            className={`flex items-center gap-2 ${
              menu.id === activeMenuId ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            <FontAwesomeIcon icon={menu.icon} className="text-xl" aria-label={menu.name} />
            <span>{menu.name}</span>
          </div>
        ))}
      </div>
      {UserButton ? (
        <UserButton />
      ) : (
        <div className="text-gray-500">Loading...</div>
      )}
    </div>
  );
}

export default Header;
