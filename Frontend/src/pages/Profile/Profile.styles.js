/**
 * Profile Styles
 * Styled components for Profile page
 */

import styled from 'styled-components';

export const ProfileContainer = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 60vh;
`;

export const ProfileHeader = styled.div`
  text-align: center;
  padding: 32px 0;
  border-bottom: 1px solid var(--border);
  margin-bottom: 32px;
`;

export const ProfileAvatar = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: #fff3ed;
  border: 1px solid #e6e6e6;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  margin: 0 auto 16px;
`;

export const ProfileName = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--text);
`;

export const ProfileEmail = styled.p`
  font-size: 16px;
  color: var(--text-muted);
`;

export const ProfileGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const ProfileSection = styled.div`
  background: white;
  border: 1px solid var(--border);
  border-radius: 26px;
  padding: 24px;
`;

export const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoRow = styled.div`
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-light);

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  width: 140px;
  font-size: 14px;
  color: var(--text-muted);
  flex-shrink: 0;
`;

export const InfoValue = styled.span`
  font-size: 14px;
  color: var(--text);
  font-weight: 500;
`;

export const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AddressCard = styled.div`
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
`;

export const AddressCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
`;

export const AddressCardText = styled.p`
  font-size: 14px;
  color: var(--text-muted);
  margin: 2px 0;
`;

export const AddressDefaultBadge = styled.span`
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  background: var(--primary);
  color: white;
`;

export const PaymentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PaymentCard = styled.div`
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
`;

export const PaymentCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
`;

export const PaymentCardText = styled.p`
  font-size: 14px;
  color: var(--text-muted);
  margin: 2px 0;
`;

export const ProfileActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid var(--border);
`;

export const ProfileActionBtn = styled.button`
  padding: 10px 24px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  background: var(--card);
  color: var(--text);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;