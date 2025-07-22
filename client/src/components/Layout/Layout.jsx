import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from '../footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Header />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;