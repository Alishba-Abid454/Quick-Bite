/**
 * Navbar Component
 * Main navigation bar with logo, links, and cart
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ROUTES } from '../../utils/routes';
import { ShoppingBag } from "lucide-react";
import {
  NavbarContainer,
  NavbarInner,
  Logo,
  NavLinks,
  NavLink,
  NavActions,
  CartButton,
  CartBadge,
  UserButton,
  MobileMenuButton,
  MobileMenu,
  MobileNavLink,
} from './Navbar.styles';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <NavbarContainer>
      <NavbarInner>
        {/* Logo */}
        <Logo to={ROUTES.HOME}>
          <span className="logo-icon">🍕</span>
          <span className="logo-text">QuickBite</span>
        </Logo>

        {/* Desktop Navigation */}
        <NavLinks>
          <NavLink to={ROUTES.HOME}>Home</NavLink>
          <NavLink to={ROUTES.ABOUT}>About</NavLink>
          <NavLink to={ROUTES.CONTACT}>Contact</NavLink>
          <NavLink to={ROUTES.ORDERS}>My Orders</NavLink>
        </NavLinks>

        {/* Actions */}
        <NavActions>
          <CartButton to={ROUTES.CART}>
            <ShoppingBag size={20} />
             Cart
            {itemCount > 0 && <CartBadge>{itemCount}</CartBadge>}
          </CartButton>

        <Link className="login-link" to={ROUTES.LOGIN}>
            Log in
          </Link>

          <Link className="signup-btn" to={ROUTES.SIGNUP}>
            Sign up
          </Link>

          <MobileMenuButton onClick={toggleMobileMenu}>
            ☰
          </MobileMenuButton>
        </NavActions>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isMobileMenuOpen}>
          <MobileNavLink to={ROUTES.HOME} onClick={toggleMobileMenu}>
            Home
          </MobileNavLink>
          {isAuthenticated ? (
            <>
              <MobileNavLink to={ROUTES.ORDERS} onClick={toggleMobileMenu}>
                My Orders
              </MobileNavLink>
              <MobileNavLink to={ROUTES.PROFILE} onClick={toggleMobileMenu}>
                Profile
              </MobileNavLink>
              <MobileNavLink to={ROUTES.CART} onClick={toggleMobileMenu}>
                Cart ({itemCount})
              </MobileNavLink>
              <MobileNavLink as="button" onClick={handleLogout}>
                Logout
              </MobileNavLink>
            </>
          ) : (
            <>
              <MobileNavLink to={ROUTES.LOGIN} onClick={toggleMobileMenu}>
                Login
              </MobileNavLink>
              <MobileNavLink to={ROUTES.SIGNUP} onClick={toggleMobileMenu}>
                Sign Up
              </MobileNavLink>
            </>
          )}
        </MobileMenu>
      </NavbarInner>
    </NavbarContainer>
  );
};

export default Navbar;