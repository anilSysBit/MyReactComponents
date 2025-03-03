import React, { useState, useEffect } from 'react';
import AnilSideBar from '../components/sidebar/AnilSideBar';
import MaterialSideBar from '../components/sidebar/MaterialSidebar';
import { MenuItemType } from '../components/sidebar/types';
import { ExpandMore as ChevronDown , Home, People as Users, Settings, Inventory as Box, ShoppingCart, Description as FileText, Notifications as Bell, BarChart as BarChart2, LaptopMac as Laptop } from "@mui/icons-material";
import ThemeToggle from '../components/sidebar/ThemeToggle';
function SideBarPage() {


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
    <div className='flex justify-between w-full p-2'>
      <h1 className='text-black dark:text-white font-bold text-xl'>
        Anil components
      </h1>
      </div>
    )
  }
  return (
    <div className="flex">
      <AnilSideBar  className='flex' customStyling header={<SideBarHeader/>} menuItems={menuItems}>
        <div className="another-container p-2">
          <h1 className='text-black text-2xl'>Example of React  Sidebar components</h1>
        </div>
      </AnilSideBar>

    </div>
  );
}

export default SideBarPage;
