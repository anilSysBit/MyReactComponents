import React, { useState } from 'react';
import { Home, SportsSoccer, Event, Group, ExpandLess, ExpandMore } from '@mui/icons-material';

interface SidebarProps {}

const MaterialSideBar: React.FC<SidebarProps> = () => {
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  const toggleSubMenu = (index: number) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-6">
          <h2 className="text-xl font-bold text-center">Sports App</h2>
        </div>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <Home className="mr-2" /> Home
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700">
              <SportsSoccer className="mr-2" /> Matches
            </a>
          </li>
          <li>
            <button
              className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700"
              onClick={() => toggleSubMenu(0)}
            >
              <Event className="mr-2" /> Events
              <span className={`ml-auto transform ${openSubMenu === 0 ? 'rotate-180' : ''}`}>
                {openSubMenu === 0 ? <ExpandLess /> : <ExpandMore />}
              </span>
            </button>
            {openSubMenu === 0 && (
              <ul className="pl-6 space-y-2">
                <li>
                  <a href="#" className="px-4 py-2 hover:bg-gray-700">Upcoming Events</a>
                </li>
                <li>
                  <a href="#" className="px-4 py-2 hover:bg-gray-700">Past Events</a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700"
              onClick={() => toggleSubMenu(1)}
            >
              <Group className="mr-2" /> Teams
              <span className={`ml-auto transform ${openSubMenu === 1 ? 'rotate-180' : ''}`}>
                {openSubMenu === 1 ? <ExpandLess /> : <ExpandMore />}
              </span>
            </button>
            {openSubMenu === 1 && (
              <ul className="pl-6 space-y-2">
                <li>
                  <a href="#" className="px-4 py-2 hover:bg-gray-700">All Teams</a>
                </li>
                <li>
                  <a href="#" className="px-4 py-2 hover:bg-gray-700">My Teams</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-6 bg-gray-100">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Welcome to the Sports Management Dashboard.</p>
      </div>
    </div>
  );
};

export default MaterialSideBar;
