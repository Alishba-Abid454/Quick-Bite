/**
 * AdminRestaurants Page
 * Manage restaurants (list, create, edit, delete)
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRestaurant } from '../../../context/RestaurantContext';
import { useAuth } from '../../../context/AuthContext';
import Loader from '../../../components/Loader/Loader';
import { getRestaurantImage } from '../../../helpers/imageHelper';
import { showError, showSuccess } from '../../../helpers/notificationHelper';
import {
  Plus,
  Star,
  Pencil,
  Trash2,
  UtensilsCrossed
} from "lucide-react";
import {
  Container,
  Header,
  Title,
  AddButton,
  RestaurantCard,
  RestaurantInfo,
  RestaurantImage,
  RestaurantDetails,
  RestaurantTop,
  RestaurantName,
  RatingBadge,
  RestaurantMeta,
  CardActions,
  ActionButton,
  DeleteButton,
} from "./AdminRestaurants.styles";

const AdminRestaurants = () => {
  const { restaurants, loading, loadRestaurants, deleteRestaurant } = useRestaurant();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisineType?.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setIsDeleting(id);
    try {
      const result = await deleteRestaurant(id);
      if (result.success) {
        showSuccess(`Restaurant "${name}" deleted successfully`);
        await loadRestaurants();
      } else {
        showError(result.error || 'Failed to delete restaurant');
      }
    } catch (error) {
      showError(error.message || 'Failed to delete restaurant');
    } finally {
      setIsDeleting(null);
    }
  };

  if (loading && restaurants.length === 0) {
    return <Loader fullScreen text="Loading restaurants..." />;
  }

  return (
    <Container>

      <Header>
        <Title>Restaurants</Title>

        <Link to="/admin/restaurants/create">
          <AddButton>
            <Plus size={18} />
            New Restaurant
          </AddButton>
        </Link>
      </Header>

      {filteredRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant._id}>

          <RestaurantInfo>

            <RestaurantImage
              src={getRestaurantImage(restaurant.image)}
              alt={restaurant.name}
            />

            <RestaurantDetails>

              <RestaurantTop>

                <RestaurantName>
                  {restaurant.name}
                </RestaurantName>

                <RatingBadge>
                  <Star size={14} fill="#ff6b35" />
                  {restaurant.rating?.toFixed(1) || "New"}
                </RatingBadge>

              </RestaurantTop>

              <RestaurantMeta>
                {restaurant.cuisineType?.join(" • ")} •
                {" "}
                {restaurant.menu?.length || 0} menu items
              </RestaurantMeta>

            </RestaurantDetails>

          </RestaurantInfo>

          <CardActions>

            <Link to={`/admin/restaurants/${restaurant._id}/menu`}>
              <ActionButton>
                <UtensilsCrossed size={18} />
                Menu
              </ActionButton>
            </Link>

            <Link to={`/admin/restaurants/${restaurant._id}/edit`}>
              <ActionButton>
                <Pencil size={18} />
                Edit
              </ActionButton>
            </Link>

            <DeleteButton
              onClick={() =>
                handleDelete(restaurant._id, restaurant.name)
              }
            >
              <Trash2 size={18} />
            </DeleteButton>

          </CardActions>

        </RestaurantCard>
      ))}

    </Container>
  );
};

export default AdminRestaurants;