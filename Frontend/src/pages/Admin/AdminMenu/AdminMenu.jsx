/**
 * AdminMenu Page
 * Manage menu items for a restaurant
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRestaurant } from '../../../context/RestaurantContext';
import { menuService } from '../../../services/menuService';
import Button from '../../../components/Button/Button';
import Loader from '../../../components/Loader/Loader';
import { getMenuItemImage } from '../../../helpers/imageHelper';
import { formatPrice } from '../../../helpers/priceHelper';
import { showError, showSuccess } from '../../../helpers/notificationHelper';
import {
  Container,
  Header,
  Title,
  Actions,
  BackButton,
  TableContainer,
  Table,
  Th,
  Td,
  StatusBadge,
  ActionButtons,
  ActionButton,
  EmptyState,
  SearchInput,
} from './AdminMenu.styles';

const AdminMenu = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { selectedRestaurant, getRestaurant, loading } = useRestaurant();
  const [menuItems, setMenuItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    if (restaurantId) {
      loadRestaurantData();
      loadMenuItems();
    }
  }, [restaurantId]);

  const loadRestaurantData = async () => {
    await getRestaurant(restaurantId);
  };

  const loadMenuItems = async () => {
    setLoadingItems(true);
    try {
      const response = await menuService.getByRestaurant(restaurantId);
      if (response.success) {
        setMenuItems(response.data || []);
      } else {
        showError(response.message || 'Failed to load menu items');
      }
    } catch (error) {
      showError(error.message || 'Failed to load menu items');
    } finally {
      setLoadingItems(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setIsDeleting(id);
    try {
      const result = await menuService.delete(id);
      if (result.success) {
        showSuccess(`"${name}" deleted successfully`);
        await loadMenuItems();
      } else {
        showError(result.message || 'Failed to delete item');
      }
    } catch (error) {
      showError(error.message || 'Failed to delete item');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleToggleAvailability = async (id, currentStatus) => {
    try {
      const result = await menuService.toggleAvailability(id);
      if (result.success) {
        showSuccess(`Item ${currentStatus ? 'deactivated' : 'activated'} successfully`);
        await loadMenuItems();
      } else {
        showError(result.message || 'Failed to toggle availability');
      }
    } catch (error) {
      showError(error.message || 'Failed to toggle availability');
    }
  };

  const filteredItems = menuItems.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || loadingItems) {
    return <Loader fullScreen text="Loading menu..." />;
  }

  return (
    <Container>
      <Header>
        <div>
          <BackButton onClick={() => navigate('/admin/restaurants')}>
            ← Back to Restaurants
          </BackButton>
          <Title>
            Menu: {selectedRestaurant?.name || 'Restaurant'}
          </Title>
        </div>
        <Actions>
          <SearchInput
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to={`/admin/restaurants/${restaurantId}/menu/create`}>
            <Button variant="primary">+ Add Item</Button>
          </Link>
        </Actions>
      </Header>

      {filteredItems.length === 0 ? (
        <EmptyState>
          <p>No menu items found</p>
          <Link to={`/admin/restaurants/${restaurantId}/menu/create`}>
            <Button variant="primary">Add your first menu item</Button>
          </Link>
        </EmptyState>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id}>
                  <Td>
                    <img
                      src={getMenuItemImage(item.image)}
                      alt={item.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                      }}
                    />
                  </Td>
                  <Td>
                    <strong>{item.name}</strong>
                    {item.isPopular && <span style={{ color: 'var(--warning)', marginLeft: '8px' }}>⭐</span>}
                    {item.isVeg && <span style={{ color: 'var(--success)', marginLeft: '4px' }}>🟢</span>}
                  </Td>
                  <Td>{item.category || 'N/A'}</Td>
                  <Td>{formatPrice(item.price)}</Td>
                  <Td>
                    <StatusBadge available={item.available}>
                      {item.available ? 'Available' : 'Out of Stock'}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <ActionButtons>
                      <Link to={`/admin/restaurants/${restaurantId}/menu/${item._id}/edit`}>
                        <ActionButton variant="edit">✏️</ActionButton>
                      </Link>
                      <ActionButton
                        variant={item.available ? 'deactivate' : 'activate'}
                        onClick={() => handleToggleAvailability(item._id, item.available)}
                      >
                        {item.available ? '⏸️' : '▶️'}
                      </ActionButton>
                      <ActionButton
                        variant="delete"
                        onClick={() => handleDelete(item._id, item.name)}
                        disabled={isDeleting === item._id}
                      >
                        {isDeleting === item._id ? '...' : '🗑️'}
                      </ActionButton>
                    </ActionButtons>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminMenu;