/**
 * Login Styles
 * Styled components for Login page
 */

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AuthContainer = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  padding:120px 20px 60px;
  background:var(--background);
  min-height:100vh;

  .login-header{
    text-align:center;
    margin-bottom:35px;
    }

  .login-icon{
    width:60px;
    height:60px;
    border-radius:28px;
    background: #F4E6E0;
    color:#ff6b35;

    display:flex;
    align-items:center;
    justify-content:center;
    font-size:30px;
    margin:auto;
    margin-bottom:20px;
    }
`;

export const AuthCard = styled.div`
  width: 600px;
  max-width: 90%;
  padding: 40px;
  background: white;
  min-height: 500px;
  border-radius: 28px;
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
  border: 1px solid #ececec;
`;

export const AuthTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-top:20px;
  color: var(--text);
`;

export const AuthSubtitle = styled.p`
  text-align:center;
  color:#666;
  font-size:20px;
  margin-top:10px;
  margin-bottom:20px;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .forgot-password{
    display:flex;
    justify-content:flex-end;
    }

    .forgot-password a{
    color:#ff6b35;
    font-weight:600;
    font-size:15px;
  }
`;

export const AuthFooter = styled.p`
  margin-top:28px;
  text-align:center;
  font-size:18px;
  color:var(--text-muted);
`;

export const AuthLink = styled(Link)`
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
  position: relative;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }
`;

export const DividerText = styled.span`
  font-size: 13px;
  color: var(--text-muted);
  white-space: nowrap;
`;

