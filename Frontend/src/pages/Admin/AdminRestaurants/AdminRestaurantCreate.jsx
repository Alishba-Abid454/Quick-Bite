/**
 * AdminRestaurantCreate Page
 * Create a new restaurant
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRestaurant } from '../../../context/RestaurantContext';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import { showError, showSuccess } from '../../../helpers/notificationHelper';
import {
  BackLink,
  FormContainer,
  FormTitle,
  Form,
  FormCard,
  FormRow,
  FormGroup,
  FormLabel,
  FormActions,
} from './AdminRestaurantCreate.styles';

const AdminRestaurantCreate = () => {
  const navigate = useNavigate();
  const { createRestaurant } = useRestaurant();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    image: '',
    cuisineType: '',
    deliveryTime: 30,
    deliveryFee: 100,
    minOrderAmount: 300,
    isOpen: true,
    openTime: '10:00',
    closeTime: '23:00',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cuisineArray = formData.cuisineType
        .split(',')
        .map((c) => c.trim())
        .filter((c) => c);

      const restaurantData = {
        ...formData,
        cuisineType: cuisineArray,
      };

      const result = await createRestaurant(restaurantData);
      if (result.success) {
        showSuccess('Restaurant created successfully!');
        navigate('/admin/restaurants');
      } else {
        showError(result.error || 'Failed to create restaurant');
      }
    } catch (error) {
      showError(error.message || 'Failed to create restaurant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <BackLink onClick={() => navigate("/admin/restaurants")}>
              ← All restaurants
      </BackLink>
      <FormTitle>New Restaurant</FormTitle>

      <FormCard>
        <Form onSubmit={handleSubmit}>
            <FormRow>
          <FormGroup>
            <FormLabel>Restaurant Name *</FormLabel>
            <Input
              name="name"
              placeholder="Enter restaurant name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Email *</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <FormLabel>Phone *</FormLabel>
            <Input
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Image (filename)</FormLabel>
            <Input
              name="image"
              placeholder="e.g., restaurant.jpg"
              value={formData.image}
              onChange={handleChange}
              helper="Place image in backend/uploads/ folder"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <FormLabel>Address *</FormLabel>
            <Input
              name="address"
              placeholder="Enter street address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>City *</FormLabel>
            <Input
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <FormLabel>Cuisine Type</FormLabel>
            <Input
              name="cuisineType"
              placeholder="e.g., Italian, Pizza (comma separated)"
              value={formData.cuisineType}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <FormLabel>Delivery Time (minutes)</FormLabel>
            <Input
              name="deliveryTime"
              type="number"
              value={formData.deliveryTime}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Delivery Fee (Rs.)</FormLabel>
            <Input
              name="deliveryFee"
              type="number"
              value={formData.deliveryFee}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Min Order Amount (Rs.)</FormLabel>
            <Input
              name="minOrderAmount"
              type="number"
              value={formData.minOrderAmount}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <FormLabel>Open Time</FormLabel>
            <Input
              name="openTime"
              type="time"
              value={formData.openTime}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Close Time</FormLabel>
            <Input
              name="closeTime"
              type="time"
              value={formData.closeTime}
              onChange={handleChange}
            />
          </FormGroup>

        </FormRow>

        <FormActions>
          <Button type="submit" loading={loading}>
            Create Restaurant
          </Button>
        </FormActions>
      </Form>
    </FormCard>
    </FormContainer>
  );
};

export default AdminRestaurantCreate;