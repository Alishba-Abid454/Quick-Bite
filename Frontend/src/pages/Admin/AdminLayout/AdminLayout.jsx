/**
 * AdminLayout Component
 * Layout for admin pages with sidebar
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import {
  AdminLayoutContainer,
  AdminContent,
  AdminMain,
} from './AdminLayout.styles';

const AdminLayout = () => {
  return (
    <AdminLayoutContainer>
      <AdminSidebar />
      <AdminMain>
        <AdminContent>
          <Outlet />
        </AdminContent>
      </AdminMain>
    </AdminLayoutContainer>
  );
};

export default AdminLayout;