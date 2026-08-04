import styled from "styled-components";

export const MenuContainer = styled.div`
  position: relative;
`;

export const MenuButton = styled.button`
  display:flex;
  align-items:center;
  gap:14px;

  background:white;

  border:1px solid #e5e5e5;

  padding:10px 18px;

  border-radius:40px;

  box-shadow:0 2px 8px rgba(0,0,0,.08);

  cursor:pointer;
`;

export const Avatar = styled.div`
  width:36px;
  height:36px;

  border-radius:50%;

  background:#fff3ee;

  color:#ED5A2D;

  font-weight:700;

  display:flex;
  align-items:center;
  justify-content:center;
`;

export const UserName = styled.span`
  font-size:18px;
  font-weight:600;
`;

export const Arrow = styled.span`
  font-size:18px;
`;

export const Dropdown = styled.div`
  position:absolute;

  right:0;
  top:65px;

  width:230px;

  background:white;

  border-radius:24px;

  box-shadow:0 15px 35px rgba(0,0,0,.12);

  padding:12px 0;

  z-index:100;
`;

export const DropdownItem = styled.button`
  width:100%;

  background:none;

  border:none;

  display:flex;

  align-items:center;

  gap:12px;

  padding:16px 24px;

  font-size:18px;

  color:#555;

  text-decoration:none;

  cursor:pointer;

  &:hover{
    background:#f8f8f8;
  }
`;