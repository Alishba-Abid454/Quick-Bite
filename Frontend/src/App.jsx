import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { RestaurantProvider } from './context/RestaurantContext';
import { OrderProvider } from './context/OrderContext';
import AppRouter from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from './styles/GlobalStyles';

export default function App() {
  return (
    <AuthProvider>           // ← User authentication state
      <CartProvider>         // ← Shopping cart state
        <RestaurantProvider> // ← Restaurant data state
          <OrderProvider>    // ← Order state
            <GlobalStyles /> // ← Global CSS
            <AppRouter />    // ← All routes/pages
            <ToastContainer // ← Notification popups
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </OrderProvider>
        </RestaurantProvider>
      </CartProvider>
    </AuthProvider>
  );
}