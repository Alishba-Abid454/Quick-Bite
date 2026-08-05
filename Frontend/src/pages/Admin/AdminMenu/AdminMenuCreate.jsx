/**
 * AdminMenuCreate Page
 * Create a new menu item
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuService } from '../../../services/menuService';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
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

const AdminMenuCreate = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'Pizza',
    isVeg: true,
    isPopular: false,
    available: true,
    preparationTime: 15,
    stock: 0,
  });

  const categories = [
    'Pizza', 'Burgers', 'Biryani', 'Beverages', 'Desserts',
    'Appetizers', 'Main Course', 'Fast Food', 'Sandwiches',
    'Salads', 'Seafood', 'BBQ', 'Chinese', 'Italian', 'Mexican'
  ];

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
      const itemData = {
        ...formData,
        restaurantId,
        price: parseFloat(formData.price),
        preparationTime: parseInt(formData.preparationTime),
        stock: parseInt(formData.stock) || 0,
      };

      const result = await menuService.create(itemData);
      if (result.success) {
        showSuccess('Menu item created successfully!');
        navigate(`/admin/restaurants/${restaurantId}/menu`);
      } else {
        showError(result.message || 'Failed to create menu item');
      }
    } catch (error) {
      showError(error.message || 'Failed to create menu item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <BackButton onClick={() => navigate(`/admin/restaurants/${restaurantId}/menu`)}>
        ← Back to Menu
      </BackButton>

      <FormTitle>Add New Menu Item</FormTitle>

      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <FormLabel>Item Name *</FormLabel>
            <Input
              name="name"
              placeholder="Enter item name"
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
              placeholder="Enter price"
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
              placeholder="Enter item description"
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
              placeholder="Enter stock quantity"
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
          <Button type="submit" loading={loading}>
            Create Menu Item
          </Button>
        </FormActions>
      </Form>
    </FormContainer>
  );
};

export default AdminMenuCreate;