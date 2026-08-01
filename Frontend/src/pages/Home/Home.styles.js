/**
 * Home Styles
 * Styled components for Home page
 */

import styled, { css, keyframes } from 'styled-components';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
`;

// Container
export const HomeContainer = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px 20px;
`;

// Hero Section
export const HeroSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px 0 60px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const HeroContent = styled.div`
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 4px 16px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: white;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-muted);

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--primary);
    }
  }
`;

export const HeroTitle = styled.h1`
  font-size: 75px;
  font-weight: 600;
  line-height: 1.1;
  margin-top: 16px;

  .highlight {
    color: var(--primary);
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 22px;
  color: var(--text-muted);
  max-width: 480px;
  margin-top: 16px;
  line-height: 1.7;

  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

// Search Box
export const SearchBox = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 480px;
  margin-top: 24px;
  padding: 4px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: white;
  height: 65px;
  box-shadow: var(--shadow-soft);

  @media (max-width: 992px) {
    max-width: 100%;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    border-radius: var(--radius-lg);
    padding: 8px;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px 20px;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: var(--text-muted);
  }
`;

export const SearchButton = styled.button`
  padding: 10px 24px;
  border-radius: 999px;
  background: var(--primary);
  color: white;
  font-weight: 600;
  font-size: 14px;
  transition: all var(--transition-normal);

  &:hover {
    background: var(--primary-dark);
    box-shadow: var(--shadow-glow);
    transform: scale(1.02);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

// Stats
export const StatsContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 32px;

  @media (max-width: 992px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 24px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const StatsItem = styled.div`
  text-align: left;

  @media (max-width: 992px) {
    text-align: center;
  }
`;

export const StatsNumber = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: var(--text);
`;

export const StatsLabel = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
`;

// Hero Image
export const HeroImageWrapper = styled.div`
  position: relative;
  border-radius: 32px;
  overflow: hidden;
    box-shadow:
    0 20px 50px rgba(255, 107, 53, 0.18),
    0 35px 80px rgba(255, 107, 53, 0.12);

`;

export const HeroGlow = styled.div`
  position: absolute;
  inset: -24px;
  border-radius: 32px;
  background: var(--gradient-hero);
  opacity: 0.2;
  z-index: -1;
  animation: ${glowPulse} 3s ease-in-out infinite;
`;

export const HeroImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 4/5;
  object-fit: cover;
  display: block;
  box-shadow:
    0 20px 50px rgba(255, 107, 53, 0.18),
    0 35px 80px rgba(255, 107, 53, 0.12);

  @media (min-width: 768px) {
    aspect-ratio: 5/6;
  }
`;

// Section Header
export const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-top: 40px;
  padding: 20px 0;
`;

export const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

export const SectionSubtitle = styled.p`
  font-size: 18px;
  color: var(--text-muted);
  margin-top: 4px;
`;

// Filter Buttons
export const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const FilterButton = styled.button`
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 500;
  transition: all var(--transition-fast);
  border: 1px solid #eadede;
  background: white;
  color: var(--text-muted);

  &:hover {
    border-color: var(--primary);
    color: var(--text);
  }

  ${({ active }) =>
    active &&
    css`
      background: var(--primary);
      color: white;
      border-color: var(--primary);

      &:hover {
        background: var(--primary-dark);
        border-color: var(--primary-dark);
      }
    `}
`;

// Restaurants Grid
export const RestaurantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

// Features Section
export const FeaturesSection = styled.section`
  margin-top: 80px;
  padding: 40px 0 60px;
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  padding: 24px;
  border: 1px solid var(--border);
  border-radius:25px;
  background: white;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
  transform: translateY(-4px);
`;

export const FeatureNumber = styled.div`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--primary);
  text-transform: uppercase;
`;

export const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-top: 12px;
`;

export const FeatureDescription = styled.p`
  font-size: 19px;
  color: var(--text-muted);
  margin-top: 8px;
  line-height: 1.6;
`;