/**
 * Home Page
 * Landing page with hero, restaurant list, and features
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homePagePic from '../../assets/images/homePagePic.jpg';
import { useRestaurant } from '../../context/RestaurantContext';
import { useCart } from '../../context/CartContext';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import Loader from '../../components/Loader/Loader';
import {
  HomeContainer,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  SearchBox,
  SearchInput,
  SearchButton,
  StatsContainer,
  StatsItem,
  StatsNumber,
  StatsLabel,
  HeroImage,
  HeroImageWrapper,
  HeroGlow,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  FilterButtons,
  FilterButton,
  RestaurantsGrid,
  FeaturesSection,
  FeaturesGrid,
  FeatureCard,
  FeatureNumber,
  FeatureTitle,
  FeatureDescription,
} from './Home.styles';

const Home = () => {
  const { restaurants, loading, error, loadRestaurants, applyFilters, filters } = useRestaurant();
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const cuisineFilters = ['All', 'Italian', 'Burgers', 'Japanese', 'Indian', 'Mexican'];

  useEffect(() => {
    loadRestaurants();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      applyFilters({ search: searchQuery });
    }
  };

  const handleFilterClick = (cuisine) => {
    setActiveFilter(cuisine);
    if (cuisine === 'All') {
      applyFilters({ cuisine: '' });
    } else {
      applyFilters({ cuisine });
    }
  };

  if (loading && restaurants.length === 0) {
    return <Loader fullScreen text="Loading restaurants..." />;
  }

  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <div className="badge">
            <span className="dot"></span>
            Now delivering in your neighborhood
          </div>
          <HeroTitle>
            Restaurant-quality food, <span className="highlight">delivered warm.</span>
          </HeroTitle>
          <HeroSubtitle>
            A short, careful list of kitchens we actually eat at. Order in minutes; arrive hot.
          </HeroSubtitle>

          <SearchBox onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search pizza, ramen, tacos…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit">Find food</SearchButton>
          </SearchBox>

          <StatsContainer>
            <StatsItem>
              <StatsNumber>42</StatsNumber>
              <StatsLabel>Curated kitchens</StatsLabel>
            </StatsItem>
            <StatsItem>
              <StatsNumber>26 min</StatsNumber>
              <StatsLabel>Avg. delivery</StatsLabel>
            </StatsItem>
            <StatsItem>
              <StatsNumber>4.9★</StatsNumber>
              <StatsLabel>Rider rating</StatsLabel>
            </StatsItem>
          </StatsContainer>
        </HeroContent>

        <HeroImageWrapper>
          <HeroGlow />
          <HeroImage
            src={homePagePic}
            alt="Delicious food spread"
          />
        </HeroImageWrapper>
      </HeroSection>

      {/* Restaurants Section */}
      <SectionHeader>
        <div>
          <SectionTitle>Kitchens open now</SectionTitle>
          <SectionSubtitle>
            {restaurants.length} places matching your filters
          </SectionSubtitle>
        </div>
        <FilterButtons>
          {cuisineFilters.map((cuisine) => (
            <FilterButton
              key={cuisine}
              active={activeFilter === cuisine}
              onClick={() => handleFilterClick(cuisine)}
            >
              {cuisine}
            </FilterButton>
          ))}
        </FilterButtons>
      </SectionHeader>

      {loading ? (
        <Loader text="Loading restaurants..." />
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'var(--danger)' }}>{error}</p>
      ) : (
        <RestaurantsGrid>
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </RestaurantsGrid>
      )}

      {/* Features Section */}
      <FeaturesSection>
        <SectionTitle >Ordering, without the noise</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureNumber>01</FeatureNumber>
            <FeatureTitle>Pick a kitchen</FeatureTitle>
            <FeatureDescription>
              Every restaurant is hand-picked and taste-tested by our team.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureNumber>02</FeatureNumber>
            <FeatureTitle>Order in a tap</FeatureTitle>
            <FeatureDescription>
              One cart, one restaurant. No juggling, no cold food.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureNumber>03</FeatureNumber>
            <FeatureTitle>Track it live</FeatureTitle>
            <FeatureDescription>
              Watch your food from oven to door, with an honest ETA.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
    </HomeContainer>
  );
};

export default Home;