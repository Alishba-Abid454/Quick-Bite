/**
 * Rating Component
 * Displays star ratings with interactive or readonly mode
 */

import React, { useState } from 'react';
import {
  RatingContainer,
  StarButton,
  StarIcon,
  RatingText,
} from './Rating.styles';

const Rating = ({
  value = 0,
  total = 5,
  readonly = false,
  size = 'md',
  onChange,
  showText = false,
  className = '',
}) => {
  const [hoverValue, setHoverValue] = useState(null);

  const displayValue = hoverValue !== null && !readonly ? hoverValue : value;

  const handleMouseEnter = (index) => {
    if (!readonly) {
      setHoverValue(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(null);
    }
  };

  const handleClick = (index) => {
    if (!readonly && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <RatingContainer className={className} size={size}>
      {Array.from({ length: total }, (_, index) => (
        <StarButton
          key={index}
          active={index < displayValue}
          readonly={readonly}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
          type="button"
          aria-label={`Rate ${index + 1} stars`}
        >
          <StarIcon active={index < displayValue}>
            {index < displayValue ? '★' : '☆'}
          </StarIcon>
        </StarButton>
      ))}
      {showText && (
        <RatingText>
          {displayValue > 0 ? `${displayValue.toFixed(1)} / ${total}` : 'No rating'}
        </RatingText>
      )}
    </RatingContainer>
  );
};

export default Rating;