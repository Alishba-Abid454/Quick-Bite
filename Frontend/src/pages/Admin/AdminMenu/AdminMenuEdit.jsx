/**
 * AdminMenuEdit Page
 * Edit existing menu item
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuService } from '../../../services/menuService';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Loader from '../../../components/Loader/Loader';
import { showError, showSuccess } from '../../../helpers/notificationHelper';
import {
  FormContainer,
  FormTitle,
  Form,
  FormRow,
  FormGroup,
  FormLabel,
  FormActions,
  BackButton,
} from './AdminMenuCreate.styles';

const AdminMenuEdit = () => {
  const { restaurantId, itemId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(null);

  const categories = [
    'Pizza', 'Burgers', 'Biryani', 'Beverages', 'Desserts',
    'Appetizers', 'Main Course', 'Fast Food', 'Sandwiches',
    'Salads', 'Seafood', 'BBQ', 'Chinese', 'Italian', 'Mexican'
  ];

  useEffect(() => {
    loadMenuItem();
  }, [itemId]);

  const loadMenuItem = async () => {
    try {
      const response = await menuService.getById(itemId);
      if (response.success) {
        const item = response.data;
        setFormData({
          name: item.name || '',
          description: item.description || '',
          price: item.price || '',
          image: item.image || '',
          category: item.category || 'Pizza',
          isVeg: item.isVeg !== undefined ? item.isVeg : true,
          isPopular: item.isPopular || false,
          available: item.available !== undefined ? item.available : true,
          preparationTime: item.preparationTime || 15,
          stock: item.stock || 0,
        });
      } else {
        showError(response.message || 'Failed to load menu item');
        navigate(`/admin/restaurants/${restaurantId}/menu`);
      }
    } catch (error) {
      showError(error.message || 'Failed to load menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const itemData = {
        ...formData,
        price: parseFloat(formData.price),
        preparationTime: parseInt(formData.preparationTime),
        stock: parseInt(formData.stock) || 0,
      };

      const result = await menuService.update(itemId, itemData);
      if (result.success) {
        showSuccess('Menu item updated successfully!');
        navigate(`/admin/restaurants/${restaurantId}/menu`);
      } else {
        showError(result.message || 'Failed to update menu item');
      }
    } catch (error) {
      showError(error.message || 'Failed to update menu item');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !formData) {
    return <Loader fullScreen text="Loading menu item..." />;
  }

  return (
    <FormContainer>
      <BackButton onClick={() => navigate(`/admin/restaurants/${restaurantId}/menu`)}>
        ← Back to Menu
      </BackButton>

      <FormTitle>Edit Menu Item</FormTitle>

      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <FormLabel>Item Name *</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Category *</FormLabel>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                padding: '12px 16px',
                border: '2px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '16px',
                fontFamily: 'inherit',
                background: 'white',
                width: '100%',
              }}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <FormLabel>Price (Rs.) *</FormLabel>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Image (filename)</FormLabel>
            <Input
              name="image"
              placeholder="e.g., pizza.jpg"
              value={formData.image}
              onChange={handleChange}
              helper="Place image in backend/uploads/ folder"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <FormLabel>Preparation Time (minutes)</FormLabel>
            <Input
              name="preparationTime"
              type="number"
              value={formData.preparationTime}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Stock Quantity</FormLabel>
            <Input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              name="isVeg"
              checked={formData.isVeg}
              onChange={handleChange}
              style={{ width: '20px', height: '20px' }}
            />
            <FormLabel style={{ margin: 0 }}>Vegetarian</FormLabel>
          </FormGroup>

          <FormGroup style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              name="isPopular"
              checked={formData.isPopular}
              onChange={handleChange}
              style={{ width: '20px', height: '20px' }}
            />
            <FormLabel style={{ margin: 0 }}>Popular Item</FormLabel>
          </FormGroup>

          <FormGroup style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              style={{ width: '20px', height: '20px' }}
            />
            <FormLabel style={{ margin: 0 }}>Available</FormLabel>
          </FormGroup>
        </FormRow>

        <FormActions>
          <Button type="button" variant="outline" onClick={() => navigate(`/admin/restaurants/${restaurantId}/menu`)}>
            Cancel
          </Button>
          <Button type="submit" loading={submitting}>
            Update Menu Item
          </Button>
        </FormActions>
      </Form>
    </FormContainer>
  );
};

export default AdminMenuEdit;