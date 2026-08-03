import styled, { css } from 'styled-components';

export const DetailsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 60vh;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-bottom: 24px;

  &:hover {
    color: var(--primary);
  }
`;

export const MenuSection = styled.section`
  margin-top: 40px;
`;

// NEW: Group for each category (Pizza, Pasta, etc.)
export const CategoryGroup = styled.div`
  margin-bottom: 48px;

  &:last-child {
    margin-bottom: 0;
  }
`;

// NEW: The category header styling (e.g., "Pizza", "Pasta")
export const CategoryTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 16px;
`;

export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// --- Review Styles (Keep the same as before) ---
export const ReviewsSection = styled.section`
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid var(--border);
`;

export const ReviewsHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export const ReviewsTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
`;

export const ReviewRatingSummary = styled.div``;

export const ReviewStats = styled.div`
  display: flex;
  gap: 32px;
`;

export const ReviewStat = styled.div`
  text-align: center;
`;

export const ReviewStatNumber = styled.div`
  font-size: 25px;
  font-weight: 700;
  color: var(--text);
`;

export const ReviewStatLabel = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NoReviews = styled.div`
  text-align: flex-start;
  padding: 20px 0;
  color: var(--text-muted);
`;