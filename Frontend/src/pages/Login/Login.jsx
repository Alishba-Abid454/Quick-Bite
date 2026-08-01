/**
 * Login Page
 * User login form
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { showError, showSuccess } from '../../helpers/notificationHelper';
import { ROUTES } from '../../utils/routes';
import { FiLogIn } from "react-icons/fi";
import {
  AuthContainer,
  AuthCard,
  AuthTitle,
  AuthSubtitle,
  AuthForm,
  AuthFooter,
  AuthLink,
  Divider,
  DividerText,
} from './Login.styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      showError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        showSuccess('Login successful!');
        navigate(ROUTES.HOME);
      } else {
        showError(result.error || 'Login failed');
      }
    } catch (error) {
      showError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>

      <div className="login-header">
        <div className="login-icon">
            <FiLogIn />
        </div>

        <AuthTitle>Welcome back</AuthTitle>
        <AuthSubtitle>Login to your QuickBite account</AuthSubtitle>
      </div>
      
      <AuthCard>
        <AuthForm onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="forgot-password">
              <Link to="/forgot-password">
                  Forgot password?
              </Link>
          </div>
          
          <Button type="submit" fullWidth loading={loading}>
            Login
          </Button>
        </AuthForm>

        <Divider>
          <DividerText>or</DividerText>
        </Divider>

        <AuthFooter>
        New to QuickBite?

        <AuthLink to={ROUTES.SIGNUP}>
        Create an account
        </AuthLink>

        </AuthFooter>
      </AuthCard>
    </AuthContainer>
  );
};

export default Login;