/**
 * AdminSidebar Styles
 * Styled components for AdminSidebar
 */

import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const MobileToggle = styled.button`
  display: none;
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 1000;
  padding: 8px 12px;
  border-radius: var(--radius-md);
  background: var(--card);
  border: 1px solid #666;
  font-size: 24px;
  color: var(--text);

  @media (max-width: 768px) {
    display: block;
  }
`;

export const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  background: var(--card);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  z-index: 999;
  transition: transform var(--transition-normal);

  @media (max-width: 768px) {
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  }
`;

export const SidebarHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
`;

export const SidebarLogo = styled(NavLink)`
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
`;

export const SidebarNav = styled.nav`
  flex: 1;
  padding: 16px 12px;
  overflow-y: auto;
`;

export const SidebarNavItem = styled.div`
  margin-bottom: 4px;
`;

export const SidebarNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius:20px;
  color: var(--text-muted);
  text-decoration: none;
  transition: all var(--transition-fast);

  &.active {
    background: var(--primary);
    color: white;
  }
`;

export const SidebarNavIcon = styled.span`
  font-size: 20px;
  width: 24px;
`;

export const SidebarNavText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const SidebarFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid var(--border);
`;

export const SidebarUser = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

export const SidebarUserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
`;

export const LogoutButton = styled.button`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;

  padding:14px;

  border:1px solid #e6e6e6;
  border-radius:40px;

  background:white;

  font-size:17px;
  font-weight:600;

  cursor:pointer;

  &:hover{
    background:#fafafa;
  }
`;
