/**
 * Footer Component
 * Page footer with links and info
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  FooterContainer,
  FooterInner,
  FooterGrid,
  FooterSection,
  FooterTitle,
  FooterLink,
  FooterBottom,
} from './Footer.styles';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterInner>
        <FooterGrid>
          {/* Brand */}
          <FooterSection>
            <FooterTitle>QuickBite</FooterTitle>
            <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
              Your favorite meals from the best local restaurants — ordered in seconds, delivered fast.
            </p>
          </FooterSection>

          {/* Quick Links */}
          <FooterSection>
            <FooterTitle>Eat</FooterTitle>
            <FooterLink to="/resturants">Resturants</FooterLink>
            <FooterLink to="/orders">My Orders</FooterLink>
            <FooterLink to="/cart">Cart</FooterLink>
          </FooterSection>

          {/* Support */}
          <FooterSection>
            <FooterTitle>Company</FooterTitle>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </FooterSection>

          {/* Legal */}
          <FooterSection>
            <FooterTitle>Account</FooterTitle>
            <FooterLink to="/login">Login</FooterLink>
            <FooterLink to="/signup">Create Account</FooterLink>
            <FooterLink to="/profile">Profile</FooterLink>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <span>© {new Date().getFullYear()} QuickBite. All rights reserved.</span>
        </FooterBottom>
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer;