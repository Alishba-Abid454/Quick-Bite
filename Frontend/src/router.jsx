import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//Router is a component that provides routing functionality to your app. It's the parent of all routes.
//Routes is a container component that holds all your <Route> components
//Route is a component that maps a specific URL path to a specific component.
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import RestaurantDetails from './pages/RestaurantDetails/RestaurantDetails';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
import OrderTracking from './pages/OrderTracking/OrderTracking';
import Orders from './pages/Orders/Orders';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';

// Auth Helper (temporary - will be replaced with useAuth later)
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // check token exist in browser sorage and convert into boolean
};

export default function AppRouter() {
  return (
    <Router>
      <Routes>
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
        //Anyone can view restaurants and their menus
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        </Route>

        {/* ==================== PROTECTED ROUTES ==================== */}
        {/*must be logged in*/}
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
        </Route>

        {/* ==================== 404 ROUTE ==================== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}