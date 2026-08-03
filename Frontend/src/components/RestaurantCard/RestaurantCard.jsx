/**
 * RestaurantCard Component
 * Displays restaurant information in a card
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { routeHelpers } from '../../utils/routes';
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

  console.log("Restaurant:", restaurant);
  console.log("Image:", image);
  return (
    <Link to={routeHelpers.restaurantDetails(_id)}>
      <Card>
      <CardImage
        src={image}
        alt={name}
        onLoad={() => console.log("Loaded")}
        onError={() => console.log("Failed")}
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