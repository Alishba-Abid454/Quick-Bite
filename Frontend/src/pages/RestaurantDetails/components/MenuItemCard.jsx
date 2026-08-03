/**
 * MenuItemCard Component
 * Displays a single menu item with add to cart button
 */

import React, { useState } from 'react';
import { formatPrice } from '../../../helpers/priceHelper';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardPrice,
  AddButton,
} from './MenuItemCard.styles';

const MenuItemCard = ({ item, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await onAddToCart(item);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
          <AddButton 
            onClick={handleAddToCart} 
            disabled={!item.available || isAdding}
          >
            {isAdding ? '...' : '+ Add'}
          </AddButton>
        </CardHeader>

        <CardDescription>
          {item.description || 'Delicious dish prepared fresh'}
        </CardDescription>

        <CardPrice>
          {formatPrice(item.price)}
        </CardPrice>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;