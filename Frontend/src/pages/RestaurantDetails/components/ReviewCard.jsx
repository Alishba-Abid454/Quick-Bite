/**
 * ReviewCard Component
 * Displays a single review with user info and rating
 */

import React from 'react';
import Rating from '../../../components/Rating/Rating';
import { formatDate, getTimeAgo } from '../../../helpers/dateHelper';
import {
  Card,
  CardHeader,
  UserAvatar,
  UserInfo,
  UserName,
  ReviewDate,
  CardBody,
  ReviewText,
  CardFooter,
  SubRatings,
  SubRating,
  SubRatingLabel,
  SubRatingValue,
  HelpfulButton,
} from './ReviewCard.styles';

const ReviewCard = ({ review }) => {
  const {
    userName,
    userImage,
    rating,
    comment,
    foodQuality,
    deliverySpeed,
    packaging,
    valueForMoney,
    createdAt,
    helpfulCount = 0,
  } = review;

  const handleHelpful = () => {
    // Mark review as helpful (API call)
    console.log('Marked as helpful');
  };

  return (
    <Card>
      <CardHeader>
        <UserAvatar src={userImage || 'https://via.placeholder.com/40x40'} alt={userName} />
        <UserInfo>
          <UserName>{userName || 'Anonymous'}</UserName>
          <ReviewDate>{getTimeAgo(createdAt)}</ReviewDate>
        </UserInfo>
        <Rating value={rating} readonly size="sm" />
      </CardHeader>

      <CardBody>
        <ReviewText>{comment || 'No comment provided'}</ReviewText>
      </CardBody>

      <CardFooter>
        <SubRatings>
          <SubRating>
            <SubRatingLabel>Food</SubRatingLabel>
            <SubRatingValue>{foodQuality || rating}★</SubRatingValue>
          </SubRating>
          <SubRating>
            <SubRatingLabel>Delivery</SubRatingLabel>
            <SubRatingValue>{deliverySpeed || rating}★</SubRatingValue>
          </SubRating>
          <SubRating>
            <SubRatingLabel>Packaging</SubRatingLabel>
            <SubRatingValue>{packaging || rating}★</SubRatingValue>
          </SubRating>
          <SubRating>
            <SubRatingLabel>Value</SubRatingLabel>
            <SubRatingValue>{valueForMoney || rating}★</SubRatingValue>
          </SubRating>
        </SubRatings>

        <HelpfulButton onClick={handleHelpful}>
          👍 {helpfulCount > 0 ? helpfulCount : 'Helpful'}
        </HelpfulButton>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;