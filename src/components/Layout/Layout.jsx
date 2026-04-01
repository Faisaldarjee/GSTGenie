import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import './Layout.css';

const Layout = ({ children, title }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <TopBar title={title} />
        <main className="content-inner animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
