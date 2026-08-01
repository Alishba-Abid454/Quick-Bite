/**
 * Signup Page
 * User registration form
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { showError, showSuccess } from '../../helpers/notificationHelper';
import { validatePassword, passwordsMatch } from '../../helpers/validationHelper';
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
} from '../Login/Login.styles';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.errors[0] || 'Password is invalid';
    }

    if (!passwordsMatch(formData.password, formData.passwordConfirm)) {
      newErrors.passwordConfirm = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const result = await signup(formData);
      if (result.success) {
        showSuccess('Account created successfully!');
        navigate(ROUTES.HOME);
      } else {
        showError(result.error || 'Signup failed');
      }
    } catch (error) {
      showError(error.message || 'Signup failed');
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
        <AuthTitle>Create account</AuthTitle>
        <AuthSubtitle>Join QuickBite and start ordering</AuthSubtitle>
      </div>

      <AuthCard>
        <AuthForm onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="0300-1234567"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Min 6 characters with uppercase, lowercase, number"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="passwordConfirm"
            placeholder="Confirm your password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            error={errors.passwordConfirm}
            required
          />

          <Button type="submit" fullWidth loading={loading}>
            Create Account
          </Button>
        </AuthForm>

        <Divider>
          <DividerText>or</DividerText>
        </Divider>

        <AuthFooter>
          Already have an account? <AuthLink to={ROUTES.LOGIN}>Login</AuthLink>
        </AuthFooter>
      </AuthCard>
    </AuthContainer>
  );
};

export default Signup;