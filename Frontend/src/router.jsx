import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NotFound from './pages/NotFound/NotFound';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Orders from './pages/Orders/Orders';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
import OrderTracking from './pages/OrderTracking/OrderTracking';
import Profile from './pages/Profile/Profile';
import ChangePassword from './pages/Profile/ChangePassword';
import RestaurantDetails from './pages/RestaurantDetails/RestaurantDetails';

// Admin Pages
import AdminLayout from './pages/Admin/AdminLayout/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import AdminRestaurants from './pages/Admin/AdminRestaurants/AdminRestaurants';
import AdminRestaurantCreate from './pages/Admin/AdminRestaurants/AdminRestaurantCreate';
import AdminRestaurantEdit from './pages/Admin/AdminRestaurants/AdminRestaurantEdit';
import AdminMenu from './pages/Admin/AdminMenu/AdminMenu';
import AdminMenuCreate from './pages/Admin/AdminMenu/AdminMenuCreate';
import AdminMenuEdit from './pages/Admin/AdminMenu/AdminMenuEdit';
import AdminOrders from './pages/Admin/AdminOrders/AdminOrders';
import AdminOrderDetails from './pages/Admin/AdminOrders/AdminOrderDetails';
import AdminUsers from './pages/Admin/AdminUsers/AdminUsers';
import AdminUserEdit from "./pages/Admin/AdminUserEdit/AdminUserEdit";
import AdminReviews from './pages/Admin/AdminReviews/AdminReviews';

// ============================================
// Auth Check
// ============================================
const isAuthenticated = () => {
  return !!localStorage.getItem('food_app_token');
};

const isAdmin = () => {
  const userStr = localStorage.getItem('food_app_user');
  if (!userStr) return false;
  try {
    const user = JSON.parse(userStr);
    return user.role === 'admin';
  } catch {
    return false;
  }
};

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* ==================== AUTH ROUTES ==================== */}
        <Route
          path="/login"
          element={
            isAuthenticated() ? (
              <Navigate to="/" replace />
            ) : (
              <AuthLayout>
                <Login />
              </AuthLayout>
            )
          }
        />

        <Route
          path="/signup"
          element={
            isAuthenticated() ? (
              <Navigate to="/" replace />
            ) : (
              <AuthLayout>
                <Signup />
              </AuthLayout>
            )
          }
        />

        {/* ==================== PUBLIC ROUTES ==================== */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        </Route>

        {/* ==================== PROTECTED ROUTES ==================== */}
        <Route element={<MainLayout />}>
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success/:id"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-tracking/:id"
            element={
              <ProtectedRoute>
                <OrderTracking />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ==================== ADMIN ROUTES ==================== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="restaurants" element={<AdminRestaurants />} />
          <Route path="restaurants/create" element={<AdminRestaurantCreate />} />
          <Route path="restaurants/:id/edit" element={<AdminRestaurantEdit />} />

          <Route path="restaurants/:restaurantId/menu" element={<AdminMenu />} />
          <Route path="restaurants/:restaurantId/menu/create" element={<AdminMenuCreate />} />
          <Route path="restaurants/:restaurantId/menu/:itemId/edit" element={<AdminMenuEdit />} />
          
          {/* Orders */}
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<AdminOrderDetails />} />
          
          {/* Users */}
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id/edit" element={<AdminUserEdit />} />
          {/* Reviews */}
          <Route path="reviews" element={<AdminReviews />} />
        </Route>

        {/* ==================== 404 ROUTE ==================== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}