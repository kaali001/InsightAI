// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import Projects from './Projects';
import Overview from './OverView';
import Upload from './Upload';
import Export from './Export';
import Settings from './Settings';
import Profile from './Profile';

const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState('Projects');

  const renderPage = () => {
    switch (activePage) {
      case 'Projects':
        return <Projects />;
      case 'Overview':
        return <Overview />;
      case 'Upload':
        return <Upload />;
      case 'Export':
        return <Export />;
      case 'Settings':
        return <Settings />;
      case 'Profile':
        return <Profile />;
      default:
        return <Projects />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 p-6 ml-16 lg:ml-64 bg-gray-50 transition-all duration-300">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
