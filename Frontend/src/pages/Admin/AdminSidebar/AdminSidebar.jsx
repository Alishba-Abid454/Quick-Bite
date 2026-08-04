/**
 * AdminSidebar Component
 * Sidebar navigation for admin panel
 */

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  Users,
  MessageSquare,
  ArrowLeft,
  LogOut
} from "lucide-react";
import {
  SidebarContainer,
  SidebarHeader,
  SidebarLogo,
  SidebarNav,
  SidebarNavItem,
  SidebarNavLink,
  SidebarNavIcon,
  SidebarNavText,
  SidebarFooter,
  SidebarUser,
  SidebarUserName,
  LogoutButton,
  MobileToggle,
} from './AdminSidebar.styles';

const AdminSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

const navItems = [
  { path: "/admin", icon: <LayoutDashboard size={20}/>, label: "Dashboard"},
  { path: "/admin/restaurants", icon: <Store size={20}/>, label: "Restaurants" },
  { path: "/admin/orders", icon: <ShoppingBag size={20}/>, label: "Orders" },
  { path: "/admin/users", icon: <Users size={20}/>, label: "Users" },
  { path: "/admin/reviews", icon: <MessageSquare size={20}/>,label: "Reviews" }
];
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <MobileToggle onClick={toggleSidebar}>
        ☰
      </MobileToggle>

      <SidebarContainer isOpen={isMobileOpen}>
        <SidebarHeader>
          <SidebarLogo to="/admin">
            🍕 QuickBite
            <span style={{ fontSize: '12px', fontWeight: 400, display: 'block', color: 'var(--text-muted)' }}>
              Admin Panel
            </span>
          </SidebarLogo>
        </SidebarHeader>

        <SidebarNav>
          {navItems.map((item) => (
            <SidebarNavItem key={item.path}>
              <SidebarNavLink
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
              >
                <SidebarNavIcon>{item.icon}</SidebarNavIcon>

                <SidebarNavText>{item.label}</SidebarNavText>
              </SidebarNavLink>
            </SidebarNavItem>
          ))}
        </SidebarNav>

        <SidebarFooter>
          <SidebarUser>
            <div>
              <SidebarUserName>
                {user?.name || "Administrator"}
              </SidebarUserName>

            </div>
          </SidebarUser>

          {/* Back Button */}
          <LogoutButton
            onClick={() => navigate("/")}
            style={{ marginBottom: "12px" }}
          >
            <ArrowLeft size={18} />
            Back to QuickBite
          </LogoutButton>

          {/* Logout */}
          <LogoutButton onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </LogoutButton>
        </SidebarFooter>
      </SidebarContainer>

    </>
  );
};

export default AdminSidebar;