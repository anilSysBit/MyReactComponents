import React, { useState, useEffect } from 'react';
import { ExpandMore as ChevronDown , Home, People as Users, Settings, Inventory as Box, ShoppingCart, Description as FileText, Notifications as Bell, BarChart as BarChart2, LaptopMac as Laptop } from "@mui/icons-material";
import './sidebar.css'
import { MenuItemType } from './types';

interface MenuItemProps{
  children:React.ReactNode,
  className?: React.HTMLProps<HTMLElement>['className'];
  customStyling?:boolean;
  header:React.ReactNode,
  menuItems:MenuItemType[],
  isDark?:boolean;
}
const MenuItem: React.FC<{ item: MenuItemType; depth?: number }> = ({ item, depth = 0 }) => {
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



const AnilSideBar: React.FC<MenuItemProps> = ({children,customStyling=false,className,header,menuItems }) => {
  const defaultStyling =()=>{
    if(!customStyling){
      return{
        display:'flex'
      }
    }else{
      return{}
    }
  }
  return (
    <div className={className} style={defaultStyling()}>
      <div className="sidebar">
      <div className="sidebar-header">
        {header}
      </div>
      <nav className="menu">
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </nav>
    </div>
    {children}
    </div>
  );
};

export default AnilSideBar;
