/**
 * NotFound Page
 * 404 page for invalid routes
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { ROUTES } from '../../utils/routes';
import {
  NotFoundContainer,
  NotFoundContent,
  NotFoundCode,
  NotFoundTitle,
  NotFoundDescription,
} from './NotFound.styles';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundContent>
        <NotFoundCode>404</NotFoundCode>
        <NotFoundTitle>Page not found</NotFoundTitle>
        <NotFoundDescription>
          Oops! The page you're looking for doesn't exist or has been moved.
        </NotFoundDescription>
        <Link to={ROUTES.HOME}>
          <Button>Go back home</Button>
        </Link>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound;