/**
 * AdminUsers Styles
 * Styled components for AdminUsers
 */

import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 20px 60px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--text);
`;

export const SearchInput = styled.input`
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 14px;
  min-width: 200px;
  background: var(--card);

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  @media (max-width: 576px) {
    min-width: 100%;
  }
`;

export const TableContainer = styled.div`
  background: var(--card);
    width:1250px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  overflow-x: auto;
`;

export const UserCard = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:38px;
  background:white;
  border-radius:22px;
  margin-bottom:20px;
  box-shadow:0 10px 25px rgba(0,0,0,.08);
`;

export const UserInfo = styled.div`
  display:flex;
  align-items:center;
  gap:22px;
`;

export const Avatar = styled.div`
  width:50px;
  height:50px;
  border-radius:50%;
  background:#FFF1EA;
  color:#FF6B35;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:30px;
  font-weight:700;
`;

export const UserNameRow = styled.div`
  display:flex;
  align-items:center;
  gap:14px;
  margin-bottom:8px;
`;

export const UserName = styled.h3`
  font-size:20px;
  margin:0;
`;

export const UserEmail = styled.p`
  margin:0;
  color:#64748B;
  font-size:17px;
`;

export const RoleBadge = styled.span`
  padding:5px 12px;
  border-radius:999px;
  background:${({role}) =>
    role === "admin"
      ? "#FFF1EA"
      : "#EEF2F6"};

  color:${({role}) =>
    role === "admin"
      ? "#FF6B35"
      : "#475569"};

  font-size:16px;
`;

export const ActionButtons = styled.div`
  display:flex;
  gap:12px;
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
  width:52px;
  height:52px;
  border-radius:50%;
  border:1px solid #E2E8F0;
  background:white;
  cursor:pointer;
`;


export const EmptyState = styled.div`
  text-align: center;
  padding: 20px 20px;
  color: var(--text-muted);
  background: white;
  border-radius: 22px;
  width: 1250px;
  p {
    font-size: 16px;
  }
`;