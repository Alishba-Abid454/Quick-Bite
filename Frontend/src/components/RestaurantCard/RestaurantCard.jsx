/**
 * RestaurantCard Component
 * Displays restaurant information in a card
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { routeHelpers } from '../../utils/routes';
import { getRestaurantImage } from '../../helpers/imageHelper';
import {
  Card,
  CardImage,
  CardContent,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardRating,
  CardMeta,
  CardMetaItem,
  CardFooter,
  CardBadge,
} from './RestaurantCard.styles';

const RestaurantCard = ({ restaurant }) => {
  const {
    _id,
    name,
    image,
    cuisineType,
    rating,
    totalReviews,
    deliveryTime,
    deliveryFee,
    minOrderAmount,
    isOpen,
  } = restaurant;

  // Get correct image URL
  const imageUrl = getRestaurantImage(image);

  return (
    <Link to={routeHelpers.restaurantDetails(_id)}>
      <Card>
        <CardImage
          src={imageUrl}
          alt={name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        {!isOpen && <CardBadge>Closed</CardBadge>}

        <CardContent>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardRating>
              ⭐ {rating?.toFixed(1) || 'New'}
              {totalReviews > 0 && <span>({totalReviews})</span>}
            </CardRating>
          </CardHeader>

          <CardSubtitle>
            {cuisineType?.join(' · ') || 'Various Cuisines'}
          </CardSubtitle>

          <CardMeta>
            <CardMetaItem>
              🕐 {deliveryTime || 30} min
            </CardMetaItem>
            <CardMetaItem>
              💰 {deliveryFee === 0 ? 'Free' : `Rs. ${deliveryFee || 100}`}
            </CardMetaItem>
            <CardMetaItem>
              🛒 Min. Rs. {minOrderAmount || 300}
            </CardMetaItem>
          </CardMeta>

          <CardFooter>
            {isOpen ? '🟢 Open Now' : '🔴 Closed'}
          </CardFooter>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;