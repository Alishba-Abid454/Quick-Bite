/**
 * Navbar Styles
 * Styled components for Navbar component
 */

import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// Container
export const NavbarContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--background);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #eadede;
`;

export const NavbarInner = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 20px;
  height: 70px;
  display: flex;
  align-items: center;
`;

// Logo
export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;

  margin-right: 120px;

  .logo-icon {
    font-size: 28px;
  }

  .logo-text {
    font-size: 22px;
    font-weight: 700;
    background: black;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

// Navigation Links
export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 40px;

  margin-left: auto;
  margin-right: auto;

  @media (max-width:768px){
    display:none;
  }
`;

export const NavLink = styled(Link)`
  font-size: 15px;
  font-weight: 500;
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
  position: relative;

  &:hover {
    color: var(--text);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--primary);
    transform: scaleX(0);
    transition: transform var(--transition-fast);
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

// Actions
export const NavActions = styled.div`
  display:flex;
  align-items:center;
  gap:24px;

  margin-left:auto;

  .login-link{
    color:#555;
    text-decoration:none;
    font-size:18px;
    font-weight:500;
  }

  .signup-btn{
    background:#ff6b35;
    color:#fff;
    padding:14px 28px;
    border-radius:40px;
    text-decoration:none;
    font-weight:600;
  }
`;

export const CartButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 12px 24px;

  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 40px;

  color: #333;
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;

  box-shadow: 0 2px 8px rgba(0,0,0,.08);

  transition: .25s;

  &:hover{
    transform: translateY(-2px);
  }
`;
export const CartBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--primary);
  color: white;
  font-size: 11px;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-gradient);
  color: white;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-fast);

  &:hover {
    transform: scale(1.05);
  }
`;

// Mobile Menu
export const MobileMenuButton = styled.button`
  display: none;
  font-size: 28px;
  padding: 4px;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid var(--border);
  padding: 20px;
  flex-direction: column;
  gap: 16px;

  ${({ isOpen }) =>
    isOpen &&
    css`
      display: flex;
    `}

  @media (min-width: 769px) {
    display: none !important;
  }
`;

export const MobileNavLink = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  color: var(--text);
  text-decoration: none;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);

  &:last-child {
    border-bottom: none;
  }
`;