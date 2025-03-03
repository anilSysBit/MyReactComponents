import React, { useState, useEffect } from 'react';
import AnilSideBar from '../components/sidebar/AnilSideBar';
import '../components/sidebar/sidebar.css'
import MaterialSideBar from '../components/sidebar/MaterialSidebar';
import { MenuItemType } from '../components/sidebar/types';
import { ExpandMore as ChevronDown , Home, People as Users, Settings, Inventory as Box, ShoppingCart, Description as FileText, Notifications as Bell, BarChart as BarChart2, LaptopMac as Laptop } from "@mui/icons-material";
import ThemeToggle from '../components/sidebar/ThemeToggle';
function SideBarPage() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.className = 'dark'; // Update className directly
      // document.body.setAttribute('data-theme','dark')
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.className = 'light'; // Update className directly
      // document.body.setAttribute('data-theme','light')

      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const menuItems: MenuItemType[] = [
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
  
  const SideBarHeader =()=>{
    return(
    <div className='flex justify-between w-full'>
        <h1 className='text-black font-bold text-xl dark:text-white'>Anil components</h1>
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      </div>
    )
  }
  return (
    <div className="flex">
      <AnilSideBar  className='flex' customStyling header={<SideBarHeader/>} menuItems={menuItems} isDark={isDark}>
        <div className="another-container p-2">
          <h1 className='text-black text-2xl'>Example of React  Sidebar components</h1>
        </div>
      </AnilSideBar>

    </div>
  );
}

export default SideBarPage;
