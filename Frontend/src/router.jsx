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

// ============================================
// Temporary Auth Check
// ============================================
const isAuthenticated = () => {
  return !!localStorage.getItem('food_app_token');
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

        {/* ==================== 404 ROUTE ==================== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}