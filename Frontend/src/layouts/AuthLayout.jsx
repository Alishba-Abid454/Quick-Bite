/**
 * AuthLayout Component
 * Layout for authentication pages (Login, Signup)
 * No navbar, centered content
 */

import React from 'react';
import { WithoutLayoutWrapper } from '../styles/GlobalStyles';

const AuthLayout = ({ children }) => {
  return (
    <WithoutLayoutWrapper>
      <div className="flex-center" style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </WithoutLayoutWrapper>
  );
};

export default AuthLayout;