import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

export default function Layout() {
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 overflow-hidden p-4 gap-4">
      
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden rounded-2xl shadow-lg"> 
        
        <Header />

        <main className="flex-1 p-8 overflow-y-auto bg-white dark:bg-slate-800"> 
          <Outlet />
        </main>
      </div>
    </div>
  );
}