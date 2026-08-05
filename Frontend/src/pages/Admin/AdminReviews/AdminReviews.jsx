/**
 * AdminReviews Page
 * Manage reviews (view, delete)
 */

import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../../../context/RestaurantContext';
import { reviewService } from '../../../services/reviewService';
import Loader from '../../../components/Loader/Loader';
import { formatDate, getTimeAgo } from '../../../helpers/dateHelper';
import { showError, showSuccess } from '../../../helpers/notificationHelper';
import { EyeOff, Trash2 } from "lucide-react";
import {
  Container,
  Header,
  Title,
  EmptyState,
  ActionButton,
  ActionButtons,
  ReviewsList,
  ReviewCard,
  ReviewLeft,
  ReviewRight,
  Rating,
} from "./AdminReviews.styles";

const AdminReviews = () => {
  const { restaurants, loadRestaurants } = useRestaurant();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    if (selectedRestaurant) {
      loadReviews(selectedRestaurant);
    } else {
      loadAllReviews();
    }
  }, [selectedRestaurant]);

  const loadAllReviews = async () => {
    // This would fetch all reviews from all restaurants
    // For now, we'll load reviews from the first restaurant
    if (restaurants.length > 0) {
      loadReviews(restaurants[0]._id);
    }
  };

  const loadReviews = async (restaurantId) => {
    setLoading(true);

    try {
      const response = await reviewService.getRestaurantReviews(
        restaurantId,
        { limit: 100 }
      );

      if (response.success) {
        setReviews(response.data.reviews || []);    }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleHide = async (id) => {
    alert("Hide review " + id);

    // Later you can call API here
    // await reviewService.hide(id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const result = await reviewService.delete(id);
      if (result.success) {
        showSuccess('Review deleted successfully');
        if (selectedRestaurant) {
          loadReviews(selectedRestaurant);
        }
      } else {
        showError(result.message || 'Failed to delete review');
      }
    } catch (error) {
      showError(error.message || 'Failed to delete review');
    }
  };

  const filteredReviews = reviews.filter((review) =>
    review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.userName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loader fullScreen text="Loading reviews..." />;
  }

  const getRestaurantName = (restaurantId) => {
    const restaurant = restaurants.find(
      (r) => r._id === restaurantId
    );

    return restaurant ? restaurant.name : "Restaurant";
  };

  return (
    <Container>
      <Header>
        <Title>Reviews</Title>
        
      </Header>

      {filteredReviews.length === 0 ? (
        <EmptyState>
          <p>No reviews found</p>
        </EmptyState>
      ) : (
      <ReviewsList>
        {filteredReviews.map((review) => (
          <ReviewCard key={review._id}>

            <ReviewLeft>
              <h3>{getRestaurantName(review.restaurantId)}</h3>
              <Rating>⭐ {review.rating}</Rating>
              <p>{review.comment}</p>

              <small>
                {review.userName} • {getTimeAgo(review.createdAt)}
              </small>
            </ReviewLeft>

          <ReviewRight>
            <ActionButtons>
              <ActionButton
                variant="hide"
                onClick={() => handleHide(review._id)}
              >
                <EyeOff size={18} />
                <span>Hide</span>
              </ActionButton>

              <ActionButton
                variant="delete"
                onClick={() => handleDelete(review._id)}
              >
                <Trash2 size={18} />
              </ActionButton>
            </ActionButtons>
            </ReviewRight>

          </ReviewCard>
        ))}
      </ReviewsList>  
     )}
    </Container>
  );
};

export default AdminReviews;