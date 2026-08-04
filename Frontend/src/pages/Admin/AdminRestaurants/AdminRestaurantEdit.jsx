/**
 * AdminRestaurantEdit Page
 * Edit existing restaurant
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRestaurant } from '../../../context/RestaurantContext';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Loader from '../../../components/Loader/Loader';
import { showError, showSuccess } from '../../../helpers/notificationHelper';
import {
  FormContainer,
  FormTitle,
  BackLink,
  FormCard,
  SaveButton,
  Form,
  FormRow,
  FormGroup,
  FormLabel,
  FormActions,
} from './AdminRestaurantCreate.styles';

const AdminRestaurantEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedRestaurant, getRestaurant, updateRestaurant, loading } = useRestaurant();
  const [formData, setFormData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      getRestaurant(id);
    }
  }, [id]);

  useEffect(() => {
    if (selectedRestaurant) {
      setFormData({
        name: selectedRestaurant.name || '',
        email: selectedRestaurant.email || '',
        phone: selectedRestaurant.phone || '',
        address: selectedRestaurant.address || '',
        city: selectedRestaurant.city || '',
        image: selectedRestaurant.image || '',
        cuisineType: selectedRestaurant.cuisineType?.join(', ') || '',
        deliveryTime: selectedRestaurant.deliveryTime || 30,
        deliveryFee: selectedRestaurant.deliveryFee || 100,
        minOrderAmount: selectedRestaurant.minOrderAmount || 300,
        isOpen: selectedRestaurant.isOpen !== undefined ? selectedRestaurant.isOpen : true,
        openTime: selectedRestaurant.openTime || '10:00',
        closeTime: selectedRestaurant.closeTime || '23:00',
      });
    }
  }, [selectedRestaurant]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const cuisineArray = formData.cuisineType
        .split(',')
        .map((c) => c.trim())
        .filter((c) => c);

      const restaurantData = {
        ...formData,
        cuisineType: cuisineArray,
      };

      const result = await updateRestaurant(id, restaurantData);
      if (result.success) {
        showSuccess('Restaurant updated successfully!');
        navigate('/admin/restaurants');
      } else {
        showError(result.error || 'Failed to update restaurant');
      }
    } catch (error) {
      showError(error.message || 'Failed to update restaurant');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !formData) {
    return <Loader fullScreen text="Loading restaurant..." />;
  }

  return (
    <FormContainer>

        <BackLink onClick={() => navigate("/admin/restaurants")}>
        ← All restaurants
        </BackLink>

        <FormTitle>
        Edit {formData.name}
        </FormTitle>

        <FormCard>

        <Form onSubmit={handleSubmit}>
            <FormRow>
            <FormGroup>
                <FormLabel>NAME</FormLabel>

                <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                />
            </FormGroup>

            <FormGroup>
                <FormLabel>CUISINE</FormLabel>

                <Input
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleChange}
                />
            </FormGroup>

            </FormRow>
            <FormGroup>
            <FormLabel>TAGLINE</FormLabel>
            <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
            />
            </FormGroup>
            <FormRow>
            <FormGroup>

                <FormLabel>DELIVERY MINUTES</FormLabel>

                <Input
                type="number"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
                />

            </FormGroup>

            <FormGroup>
                <FormLabel>RATING</FormLabel>
                <Input
                type="number"
                step="0.1"
                name="rating"
                value={selectedRestaurant.rating}
                readOnly
                />

            </FormGroup>

            </FormRow>
            <SaveButton
            type="submit"
            disabled={isSubmitting}
            >
            Save Changes
            </SaveButton>
        </Form>
      </FormCard>
    </FormContainer>
  );
};

export default AdminRestaurantEdit;