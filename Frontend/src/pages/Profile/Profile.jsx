/**
 * Profile Page
 * User profile with personal info, addresses, and payment methods
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOrder } from '../../context/OrderContext';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Loader from '../../components/Loader/Loader';
import { formatDate } from '../../helpers/dateHelper';
import { showError, showSuccess } from '../../helpers/notificationHelper';
import {
  ProfileContainer,
  ProfileHeader,
  ProfileAvatar,
  ProfileName,
  ProfileEmail,
  ProfileGrid,
  ProfileSection,
  SectionTitle,
  ProfileInfo,
  InfoRow,
  InfoLabel,
  InfoValue,
  AddressList,
  AddressCard,
  AddressCardHeader,
  AddressCardText,
  AddressDefaultBadge,
  PaymentList,
  PaymentCard,
  PaymentCardHeader,
  PaymentCardText,
  ProfileActions,
  ProfileActionBtn,
} from './Profile.styles';

const Profile = () => {
  const { user, updateProfile, loading } = useAuth();
  const { getUserOrders, orders } = useOrder();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
      });
      getUserOrders(1, 5);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        showSuccess('Profile updated successfully');
        setIsEditing(false);
      } else {
        showError(result.error || 'Update failed');
      }
    } catch (error) {
      showError(error.message || 'Update failed');
    }
  };

  if (loading && !user) {
    return <Loader fullScreen text="Loading profile..." />;
  }

  if (!user) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>Please login to view profile</div>;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileAvatar>
          {user.name?.charAt(0) || 'U'}
        </ProfileAvatar>
        <ProfileName>{user.name}</ProfileName>
        <ProfileEmail>{user.email}</ProfileEmail>
      </ProfileHeader>

      <ProfileGrid>
        {/* Personal Info */}
        <ProfileSection>
          <SectionTitle>
            Personal Information
            <button
              onClick={() => setIsEditing(!isEditing)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '18px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </SectionTitle>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Button type="submit">Save Changes</Button>
            </form>
          ) : (
            <ProfileInfo>
              <InfoRow>
                <InfoLabel>Full Name</InfoLabel>
                <InfoValue>{user.name || 'N/A'}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>{user.email}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Phone</InfoLabel>
                <InfoValue>{user.phone || 'N/A'}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Member Since</InfoLabel>
                <InfoValue>{formatDate(user.createdAt, 'MMMM DD, YYYY')}</InfoValue>
              </InfoRow>
            </ProfileInfo>
          )}
        </ProfileSection>

        {/* Addresses */}
        <ProfileSection>
          <SectionTitle>
            Saved Addresses
            <button
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '18px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
              onClick={() => showError('Add address feature coming soon')}
            >
              + Add
            </button>
          </SectionTitle>

          {user.addresses && user.addresses.length > 0 ? (
            <AddressList>
              {user.addresses.map((address, index) => (
                <AddressCard key={index}>
                  <AddressCardHeader>
                    <span>{address.type || 'Home'}</span>
                    {address.isDefault && <AddressDefaultBadge>Default</AddressDefaultBadge>}
                  </AddressCardHeader>
                  <AddressCardText>{address.address}</AddressCardText>
                  <AddressCardText>
                    {address.city}, {address.zipCode}
                  </AddressCardText>
                </AddressCard>
              ))}
            </AddressList>
          ) : (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
              No saved addresses
            </p>
          )}
        </ProfileSection>

        {/* Recent Orders */}
        <ProfileSection>
          <SectionTitle>
            Recent Orders
            <Link to="/orders">
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                View All
              </button>
            </Link>
          </SectionTitle>

          {orders && orders.length > 0 ? (
            orders.slice(0, 3).map((order) => (
              <AddressCard key={order._id}>
                <AddressCardHeader>
                  <span>Order #{order.orderId || order._id.slice(-6)}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {formatDate(order.createdAt)}
                  </span>
                </AddressCardHeader>
                <AddressCardText>
                  {order.items?.length || 0} items · {order.restaurantId?.name || 'Restaurant'}
                </AddressCardText>
                <AddressCardText style={{ fontWeight: 600, color: 'var(--text)' }}>
                  Total: Rs. {order.totalPrice}
                </AddressCardText>
              </AddressCard>
            ))
          ) : (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
              No orders yet
            </p>
          )}
        </ProfileSection>
      </ProfileGrid>

      <ProfileActions>
        <Link to="/profile/change-password">
          <ProfileActionBtn>Change Password</ProfileActionBtn>
        </Link>
      </ProfileActions>
    </ProfileContainer>
  );
};

export default Profile;