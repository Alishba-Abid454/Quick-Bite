/**
 * AdminDashboard Styles
 * Styled components for AdminDashboard
 */

import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: 20px 60px;
`;

export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const DashboardTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: var(--text);
`;

export const DashboardSubtitle = styled.p`
  font-size: 16px;
  color: var(--text-muted);
  margin-top: 4px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 28px;
  min-height: 220px;

  display: flex;
  flex-direction: column;

  box-shadow: 0 10px 25px rgba(0,0,0,.08);

  transition: .3s;

  &:hover{
    transform: translateY(-5px);
  }
`;

export const StatCardIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 30px;
  border-radius: 50%;
  background: #FFF1EA;
  color: #FF6B35;
  display: flex;
  justify-content: center;
  align-items: center ;
`;

export const StatCardContent = styled.div``;

export const StatCardNumber = styled.h2`
  font-size: 35px;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
`;

export const StatCardLabel = styled.p`
  font-size: 18px;
  color: #64748B;
  margin-top: 10px;
`;
export const RecentActivity = styled.div`
  background: white;
  border: 1px solid var(--border);
  border-radius: 22px;
  padding: 24px;
`;

export const ActivityTitle = styled.h3`
  font-size: 23px;
  font-weight: 650;
  color: var(--text);
  margin-bottom: 16px;
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background: var(--gray100);
  transition: all var(--transition-fast);

  &:hover {
    background: var(--gray200);
  }
`;

export const ActivityItemText = styled.span`
  font-size: 16px;
  font-weight: 450;
  color: var(--text);
`;

export const ActivityItemTime = styled.span`
  font-size: 16px;
  font-weight: 450;
  color: var(--text-muted);
`;