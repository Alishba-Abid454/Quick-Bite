/**
 * Loader Component
 * Loading spinner with different sizes
 */

import React from 'react';
import { LoaderContainer, LoaderSpinner, LoaderText } from './Loader.styles';

const Loader = ({ size = 'md', text = '', fullScreen = false }) => {
  return (
    <LoaderContainer fullScreen={fullScreen}>
      <LoaderSpinner size={size} />
      {text && <LoaderText>{text}</LoaderText>}
    </LoaderContainer>
  );
};

export default Loader;