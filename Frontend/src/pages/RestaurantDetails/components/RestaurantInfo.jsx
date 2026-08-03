/**
 * RestaurantInfo Component
 * Displays restaurant details with image on the right and info on the left
 */

import React from 'react';
import {
  Container,
  BackLink,
  ContentGrid,
  LeftColumn,
  RightColumn,
  CuisineText,
  RestaurantName,
  DescriptionText,
  StatsRow,
  StatItem,
  StatIcon,
  StatValue,
  StatLabel,
  RestaurantImage,
} from './RestaurantInfo.styles';

const RestaurantInfo = ({ restaurant }) => {
  const {
    name,
    image,
    cuisineType,
    description,
    rating,
    totalReviews,
    deliveryTime,
    priceLevel,
  } = restaurant;

  return (
    <Container>
    
      <ContentGrid>
        {/* LEFT COLUMN: Name, Cuisine, Description, Stats */}
        <LeftColumn>
          {/* Cuisine Type (Orange) */}
          <CuisineText>
            {cuisineType?.join(' · ')?.toUpperCase() || 'ITALIAN · PIZZA'}
          </CuisineText>

          {/* Restaurant Name */}
          <RestaurantName>{name || 'Restaurant Name'}</RestaurantName>

          {/* Description */}
          <DescriptionText>
            {description || 'Wood-fired sourdough pies from a Neapolitan oven'}
          </DescriptionText>

          {/* Stats Row: Rating, Time, Price Level */}
          <StatsRow>
            <StatItem>
              <StatIcon>⭐</StatIcon>
              <StatValue>
                {rating?.toFixed(1) || '4.8'} 
                <StatLabel> ({totalReviews || 1240})</StatLabel>
              </StatValue>
            </StatItem>

            <StatItem>
              <StatIcon>🕐</StatIcon>
              <StatValue>{deliveryTime || '25–35'} min</StatValue>
            </StatItem>

          </StatsRow>
        </LeftColumn>

        {/* RIGHT COLUMN: Main Image */}
        <RightColumn>
          <RestaurantImage 
            src={image || 'https://via.placeholder.com/600x400'} 
            alt={name} 
          />
        </RightColumn>
      </ContentGrid>
    </Container>
  );
};

export default RestaurantInfo;