import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { ExpandMore as ChevronDown , Home, People as Users, Settings, Inventory as Box, ShoppingCart, Description as FileText, Notifications as Bell, BarChart as BarChart2, LaptopMac as Laptop } from "@mui/icons-material";
import './sidebar.css'
interface MenuItem {
  title: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: <Home  />,
  },
  {
    title: 'User Management',
    icon: <Users />,
    children: [
      { title: 'All Users', icon: <Users  /> },
      { title: 'Roles', icon: <Users  /> },
      { title: 'Permissions', icon: <Users  /> },
    ],
  },
  {
    title: 'Products',
    icon: <Box  />,
    children: [
      { title: 'All Products', icon: <Box /> },
      { 
        title: 'Categories', 
        icon: <Box />,
        children: [
          { title: 'Electronics', icon: <Laptop /> },
          { title: 'Clothing', icon: <Box  /> },
          { title: 'Food', icon: <Box /> },
        ]
      },
      { title: 'Inventory', icon: <Box /> },
    ],
  },
  {
    title: 'Orders',
    icon: <ShoppingCart  />,
    children: [
      { title: 'All Orders', icon: <ShoppingCart  /> },
      { title: 'Pending', icon: <ShoppingCart  /> },
      { title: 'Completed', icon: <ShoppingCart  /> },
    ],
  },
  {
    title: 'Reports',
    icon: <FileText  />,
    children: [
      { title: 'Sales Report', icon: <BarChart2 /> },
      { title: 'User Report', icon: <BarChart2  /> },
    ],
  },
  {
    title: 'Notifications',
    icon: <Bell  />,
  },
  {
    title: 'Settings',
    icon: <Settings  />,
  },
];

const MenuItem: React.FC<{ item: MenuItem; depth?: number }> = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleToggle = () => {
    if (hasChildren) {
      setIsAnimating(true);
      setIsOpen(!isOpen);
      setTimeout(() => setIsAnimating(false), 200);
    }
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className={`menu-item ${isOpen ? 'open' : ''} ${depth > 0 ? 'depth' + (depth * 4 + 4) : ''}`}
      >
        <div className="menu-item-content">
          <span className="icon">{item.icon}</span>
          <span>{item.title}</span>
        </div>
        {hasChildren && (
          <ChevronDown
            className={`chevron ${isOpen ? 'rotate' : ''}`}
          />
        )}
      </button>
      {hasChildren && (
        <div className={`submenu ${isOpen ? 'open' : ''} ${isAnimating ? 'animating' : ''}`}>
          {item.children && item.children.map((child, index) => (
            <MenuItem key={index} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const AnilSideBar: React.FC<{ isDark: boolean; onToggleTheme: () => void }> = ({ isDark, onToggleTheme }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Anil Components</h1>
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>
      <nav className="menu">
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </nav>
    </div>
  );
};

export default AnilSideBar;
