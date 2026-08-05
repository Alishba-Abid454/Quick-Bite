// src/pages/Admin/AdminUsers/AdminUserEdit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userService } from "../../../services/userService";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Loader from "../../../components/Loader/Loader";
import {
  BackLink,
  FormContainer,
  FormCard,
  FormTitle,
  Form,
  FormRow,
  FormGroup,
  FormLabel,
  FormActions,
  SelectWrapper,
  StyledSelect,
} from "./AdminUserEdit.styles";

const AdminUserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "customer",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await userService.getById(id);

        if (response.success) {
          setFormData({
            name: response.data.user.name || "",
            email: response.data.user.email || "",
            phone: response.data.user.phone || "",
            role: response.data.user.role || "customer",
          });
        }
      } catch (error) {
        console.log("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadUser();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      const result = await userService.update(id, formData);

      if (result.success) {
        navigate("/admin/users");
      }
    } catch (error) {
      console.log("Error updating user:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader fullScreen text="Loading user..." />;
  }

  return (
    <FormContainer>
      <BackLink onClick={() => navigate("/admin/users")}>
        ← All Users
      </BackLink>

      <FormTitle>Edit {formData.name}</FormTitle>

      <FormCard>
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <FormLabel>FULL NAME</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>PHONE</FormLabel>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup fullWidth>
              <FormLabel>EMAIL</FormLabel>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                disabled
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup fullWidth>
              <FormLabel>ROLE</FormLabel>
              <SelectWrapper>
                <StyledSelect
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="customer">Customer</option>
                  <option value="restaurant_owner">Restaurant Owner</option>
                  <option value="admin">Admin</option>
                </StyledSelect>
              </SelectWrapper>
            </FormGroup>
          </FormRow>

          <FormActions>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/users")}
            >
              Cancel
            </Button>

            <Button type="submit" loading={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </FormActions>
        </Form>
      </FormCard>
    </FormContainer>
  );
};

export default AdminUserEdit;