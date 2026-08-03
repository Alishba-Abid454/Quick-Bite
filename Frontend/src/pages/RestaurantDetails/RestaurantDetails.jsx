/**
 * RestaurantDetails Page
 * Displays restaurant info, grouped menu items, and reviews
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurant } from '../../context/RestaurantContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader/Loader';
import { showError, showSuccess } from '../../helpers/notificationHelper';
import RestaurantInfo from './components/RestaurantInfo';
import MenuItemCard from './components/MenuItemCard';
import ReviewCard from './components/ReviewCard';
import {
  DetailsContainer,
  BackButton,
  MenuSection,
  CategoryGroup,
  CategoryTitle,
  MenuGrid,
  ReviewsSection,
  ReviewsHeader,
  ReviewsTitle,
  ReviewRatingSummary,
  ReviewStats,
  ReviewStat,
  ReviewStatNumber,
  ReviewStatLabel,
  ReviewsList,
  NoReviews,
} from './RestaurantDetails.styles';

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedRestaurant, getRestaurant, loading } = useRestaurant();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(false);

  useEffect(() => {
    if (id) {
      loadRestaurantData();
    }
  }, [id]);

  const loadRestaurantData = async () => {
    const result = await getRestaurant(id);
    if (result.success && result.restaurant) {
      if (result.restaurant.menu) {
        setMenuItems(result.restaurant.menu);
      }
      loadReviews();
    } else {
      showError('Restaurant not found');
      navigate('/');
    }
  };

  const loadReviews = async () => {
    setLoadingReviews(true);
    try {
      const response = await fetch(`/api/reviews/restaurant/${id}`);
      const data = await response.json();
      if (data.success) {
        setReviews(data.data.reviews || []);
        setReviewStats(data.data.summary || null);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      showError('Please login to add items to cart');
      navigate('/login');
      return;
    }
    const cartItem = {
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId: selectedRestaurant?._id,
      restaurantName: selectedRestaurant?.name,
    };
    addItem(cartItem);
    showSuccess(`${item.name} added to cart!`);
  };

  // 1. Extract unique categories (excluding undefined/empty)
  const categories = [...new Set(menuItems.map(item => item.category).filter(Boolean))];

  // 2. Helper to get items for a specific category
  const getItemsByCategory = (category) => {
    return menuItems.filter(item => item.category === category);
  };

  if (loading) {
    return <Loader fullScreen text="Loading restaurant..." />;
  }

  if (!selectedRestaurant) {
    return (
      <DetailsContainer>
        <h2>Restaurant not found</h2>
        <BackButton onClick={() => navigate('/')}>Go Back Home</BackButton>
      </DetailsContainer>
    );
  }

  return (
    <DetailsContainer>
      <BackButton onClick={() => navigate('/')}>← All restaurants</BackButton>

      {/* Restaurant Info Header */}
      <RestaurantInfo restaurant={selectedRestaurant} />

      {/* Menu Section - Grouped by Category */}
      <MenuSection>
        {categories.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
            No menu items available for this restaurant.
          </p>
        ) : (
          categories.map((category) => (
            <CategoryGroup key={category}>
              <CategoryTitle>{category}</CategoryTitle>
              <MenuGrid>
                {getItemsByCategory(category).map((item) => (
                  <MenuItemCard
                    key={item._id}
                    item={item}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </MenuGrid>
            </CategoryGroup>
          ))
        )}
      </MenuSection>

      {/* Reviews Section */}
      <ReviewsSection>
        <ReviewsHeader>
          <ReviewsTitle>Reviews</ReviewsTitle>
          {reviewStats && (
            <ReviewRatingSummary>
              <ReviewStats>
                <ReviewStat>
                  <ReviewStatNumber>{reviewStats.averageRating?.toFixed(1) || 0}</ReviewStatNumber>
                  <ReviewStatLabel>⭐ Average Rating</ReviewStatLabel>
                </ReviewStat>
                <ReviewStat>
                  <ReviewStatNumber>{reviewStats.totalReviews || 0}</ReviewStatNumber>
                  <ReviewStatLabel>Reviews</ReviewStatLabel>
                </ReviewStat>
              </ReviewStats>
            </ReviewRatingSummary>
          )}
        </ReviewsHeader>

        {loadingReviews ? (
          <Loader text="Loading reviews..." />
        ) : reviews.length === 0 ? (
          <NoReviews>
            <p>No reviews yet. Be the first to review!</p>
          </NoReviews>
        ) : (
          <ReviewsList>
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </ReviewsList>
        )}
      </ReviewsSection>
    </DetailsContainer>
  );
};

export default RestaurantDetails;