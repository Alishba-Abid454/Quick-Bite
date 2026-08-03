/**
 * ChangePassword Page
 * User can change their password
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { validatePassword, passwordsMatch } from '../../helpers/validationHelper';
import { showError, showSuccess } from '../../helpers/notificationHelper';
import { ROUTES } from '../../utils/routes';
import {
  ProfileContainer,
  ProfileHeader,
  ProfileName,
  ProfileEmail,
  ProfileSection,
  SectionTitle,
} from './Profile.styles';

const ChangePassword = () => {
  const { changePassword, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    const passwordValidation = validatePassword(formData.newPassword);
    if (!passwordValidation.valid) {
      newErrors.newPassword = passwordValidation.errors[0] || 'Invalid password';
    }

    if (!passwordsMatch(formData.newPassword, formData.confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const result = await changePassword(
        formData.currentPassword,
        formData.newPassword
      );

      if (result.success) {
        showSuccess('Password changed successfully');
        navigate(ROUTES.PROFILE);
      } else {
        showError(result.error || 'Failed to change password');
      }
    } catch (error) {
      showError(error.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileName>{user?.name || 'User'}</ProfileName>
        <ProfileEmail>{user?.email}</ProfileEmail>
      </ProfileHeader>

      <ProfileSection>
        <SectionTitle>Change Password</SectionTitle>

        <form onSubmit={handleSubmit}>
          <Input
            label="Current Password"
            type="password"
            name="currentPassword"
            placeholder="Enter your current password"
            value={formData.currentPassword}
            onChange={handleChange}
            error={errors.currentPassword}
            required
          />

          <Input
            label="New Password"
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
            helper="Min 6 chars with uppercase, lowercase, number, special char"
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />

          <Button type="submit" loading={loading}>
            Change Password
          </Button>
        </form>
      </ProfileSection>
    </ProfileContainer>
  );
};

export default ChangePassword;