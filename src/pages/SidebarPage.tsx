import React, { useState, useEffect } from 'react';
import AnilSideBar from '../components/sidebar/AnilSideBar';
import '../components/sidebar/sidebar.css'
import MaterialSideBar from '../components/sidebar/MaterialSidebar';

function SideBarPage() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.className = 'dark'; // Update className directly
      document.body.setAttribute('data-theme','dark')
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.className = 'light'; // Update className directly
      document.body.setAttribute('data-theme','light')

      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="page-container">
      <AnilSideBar isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
      <div className={`content-area ${isDark ? 'dark' : 'light'}`}>
        <h1 className={`page-header ${isDark ? 'dark' : 'light'}`}>
          Welcome to Admin Dashboard
        </h1>
        <p className={`page-subtext ${isDark ? 'dark' : 'light'}`}>
          Select an option from the sidebar to get started.
        </p>
      </div>
    </div>
  );
}

export default SideBarPage;
