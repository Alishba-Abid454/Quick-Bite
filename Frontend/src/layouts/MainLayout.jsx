/**
 * MainLayout Component
 * Layout for authenticated pages with Navbar and Footer
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { LayoutWrapper } from '../styles/GlobalStyles';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <LayoutWrapper>
        <Outlet />
      </LayoutWrapper>
      <Footer />
    </>
  );
};

export default MainLayout;