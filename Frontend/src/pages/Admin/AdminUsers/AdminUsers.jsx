/**
 * AdminUsers Page
 * Manage users (list, toggle status, delete)
 */

import React, { useState, useEffect } from 'react';
import { userService } from '../../../services/userService';
import { Link } from "react-router-dom";
import Loader from '../../../components/Loader/Loader';
import { showError, showSuccess } from '../../../helpers/notificationHelper';
import {
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Container,
  Header,
  Title,
  TableContainer,
  UserCard,
  UserInfo,
  Avatar,
  UserNameRow,
  UserName,
  UserEmail,
  RoleBadge,
  ActionButtons,
  DeleteButton,
  EmptyState,
  ActionButton,
} from './AdminUsers.styles';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isToggling, setIsToggling] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getAll({ limit: 100 });
      if (response.success) {
        setUsers(response.data || []);
      } else {
        showError(response.message || 'Failed to load users');
      }
    } catch (error) {
      showError(error.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
    const response = await userService.getAll({ limit: 100 });
  };

  const handleToggleStatus = async (id, currentStatus, name) => {
    if (!window.confirm(`${currentStatus ? 'Deactivate' : 'Activate'} user "${name}"?`)) {
      return;
    }

    setIsToggling(id);
    try {
      const result = await userService.toggleStatus(id);
      if (result.success) {
        showSuccess(`User ${currentStatus ? 'deactivated' : 'activated'} successfully`);
        await loadUsers();
      } else {
        showError(result.message || 'Failed to toggle user status');
      }
    } catch (error) {
      showError(error.message || 'Failed to toggle user status');
    } finally {
      setIsToggling(null);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete user "${name}"?`)) {
      return;
    }

    if (!window.confirm(`This action cannot be undone. Delete "${name}" permanently?`)) {
      return;
    }

    try {
      const result = await userService.delete(id);
      if (result.success) {
        showSuccess(`User "${name}" deleted successfully`);
        await loadUsers();
      } else {
        showError(result.message || 'Failed to delete user');
      }
    } catch (error) {
      showError(error.message || 'Failed to delete user');
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loader fullScreen text="Loading users..." />;
  }

  return (
    <Container>
      <Header>
        <Title>Users</Title>
      </Header>

      {filteredUsers.length === 0 ? (
        <EmptyState>
          <p>No users found</p>
        </EmptyState>
      ) : (
      <TableContainer>
        {filteredUsers.map((user) => (
          <UserCard key={user._id}>

            <UserInfo>

              <Avatar>
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>

              <div>

                <UserNameRow>
                  <UserName>{user.name}</UserName>
                  <RoleBadge role={user.role}>
                    {user.role}
                  </RoleBadge>
                </UserNameRow>
                <UserEmail>{user.email}</UserEmail>
              </div>
            </UserInfo>
            <ActionButtons>

              <Link to={`/admin/users/${user._id}/edit`}>
              <ActionButton>
                <Pencil size={18} />
                Edit
              </ActionButton>
              </Link>

              <DeleteButton
                onClick={() => handleDelete(user._id, user.name)}
              >
                <Trash2 size={18} />
              </DeleteButton>
            </ActionButtons>
          </UserCard>
        ))}
      </TableContainer>
      )}
    </Container>
  );
};

export default AdminUsers;