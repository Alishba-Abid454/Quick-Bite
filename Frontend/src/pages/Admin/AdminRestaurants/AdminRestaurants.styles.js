/**
 * AdminRestaurants Styles
 */

import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 60px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 45px;
  font-weight: 650;
  color: #1e293b;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 45px;

  background: #ff6b35;
  color: white;

  border: none;
  border-radius: 999px;

  padding: 16px 28px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #f55a22;
    transform: translateY(-2px);
  }
`;

export const RestaurantCard = styled.div`
  background: white;

  border-radius: 28px;

  padding: 34px 38px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 26px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  transition: 0.3s;

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
  }
`;

export const RestaurantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const RestaurantImage = styled.img`
  width: 95px;
  height: 95px;
  object-fit: cover;
  border-radius: 20px;

  flex-shrink: 0;
`;

export const RestaurantDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RestaurantTop = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
`;

export const RestaurantName = styled.h2`
  font-size: 28px;
  font-weight: 650;
  color: #1e293b;
`;

export const RatingBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background: #fff3ec;
  color: #ff6b35;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 18px;
  font-weight: 600;
`;

export const RestaurantMeta = styled.p`
  font-size: 18px;
  color: #64748b;
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  height: 42px;
  gap: 7px;
  padding: 14px 24px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: white;
  color: #1e293b;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #ff6b35;
    border-color: #ff6b35;
    color: white;
  }
`;

export const DeleteButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  color: #475569;

  &:hover {
    background: #ffefef;
    color: #ef4444;
    border-color: #ef4444;
  }
`;