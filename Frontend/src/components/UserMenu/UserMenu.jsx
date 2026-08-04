import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import {
  User,
  ReceiptText,
  LogOut,
  ChevronDown,
} from "lucide-react";
import {
  MenuContainer,
  MenuButton,
  Avatar,
  UserName,
  Arrow,
  Dropdown,
  DropdownItem,
} from "./UserMenu.styles";

const UserMenu = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const close = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", close);

    return () => {
      document.removeEventListener("click", close);
    };
  }, []);

  return (
    <MenuContainer ref={menuRef}>
      <MenuButton onClick={() => setOpen(!open)}>
        <Avatar>
          {user?.name?.charAt(0).toUpperCase()}
        </Avatar>

        <UserName>{user?.name}</UserName>

        <ChevronDown size={18} strokeWidth={2} />
      </MenuButton>

      {open && (
        <Dropdown>

          <DropdownItem as={Link} to={ROUTES.PROFILE}>
            <User/>Profile
          </DropdownItem>

          <DropdownItem as={Link} to={ROUTES.ORDERS}>
            <ReceiptText /> My Orders
          </DropdownItem>

          <DropdownItem as="button" onClick={onLogout}>
            <LogOut /> Sign Out
          </DropdownItem>

        </Dropdown>
      )}
    </MenuContainer>
  );
};

export default UserMenu;