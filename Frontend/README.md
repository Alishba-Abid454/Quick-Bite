# 🍕 Food Ordering App - Frontend

React.js frontend for Food Ordering App using Vite, Context API, and React Router.

## 📋 Quick Links

- **[Main Project README](../README.md)**
- **[Backend README](../server/README.md)**
- **[Development Plan](../2_WEEK_DEVELOPMENT_PLAN.md)**

## 🎯 Overview

This is the user-facing React application for Food Ordering App. It provides an intuitive interface for users to browse restaurants, order food, and track deliveries.

### What Frontend Does

✅ User signup and login interface  
✅ Display restaurants with search and filters  
✅ Show restaurant menus with food items  
✅ Shopping cart with add/remove/update items  
✅ Checkout form with address and payment  
✅ Order confirmation and tracking  
✅ Order history display  
✅ Restaurant review submission  

## 🛠️ Tech Stack

- **Framework:** React.js (v18+) with Hooks
- **Build Tool:** Vite
- **Routing:** React Router v6
- **State Management:** Context API
- **HTTP Client:** Fetch API (with custom wrapper)
- **Styling:** CSS Modules (or Styled Components)
- **Package Manager:** npm

## 📁 Project Structure

```
client/
├── public/
│   ├── favicon.ico
│   └── index.html               # Main HTML file
│
├── src/
│   ├── api/
│   │   ├── endpoints.js         # All API endpoint URLs
│   │   └── apiConfig.js         # Base URL, timeout config
│   │
│   ├── components/              # Reusable Components
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.module.css
│   │   ├── Input/
│   │   ├── Navbar/
│   │   ├── RestaurantCard/
│   │   ├── MenuItemCard/
│   │   ├── CartItem/
│   │   ├── Loader/
│   │   ├── Modal/
│   │   ├── PriceBreakdown/
│   │   ├── OrderStatus/
│   │   └── ErrorBoundary/
│   │
│   ├── context/                 # Global State Management
│   │   ├── AuthContext.jsx      # User authentication state
│   │   ├── CartContext.jsx      # Shopping cart state
│   │   └── RestaurantContext.jsx# Restaurant list state
│   │
│   ├── helpers/                 # Utility Functions
│   │   ├── fetchWrapper.js      # HTTP requests wrapper
│   │   ├── priceHelper.js       # Price calculations
│   │   ├── dateHelper.js        # Date formatting
│   │   ├── validationHelper.js  # Form validation
│   │   ├── cookieHelper.js      # Cookie operations
│   │   └── localStorageHelper.js
│   │
│   ├── hooks/                   # Custom React Hooks
│   │   ├── useAuth.js           # Auth context shortcut
│   │   ├── useCart.js           # Cart context shortcut
│   │   ├── useFetch.js          # Data fetching hook
│   │   ├── useDebounce.js       # Search debounce
│   │   └── usePagination.js     # Pagination logic
│   │
│   ├── pages/                   # Complete Pages/Screens
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   ├── Login/
│   │   ├── Signup/
│   │   ├── RestaurantDetails/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── OrderTracking/
│   │   ├── Orders/              # Order history
│   │   ├── Profile/
│   │   └── NotFound/
│   │
│   ├── router/                  # Routing Configuration
│   │   ├── AppRouter.jsx        # All routes
│   │   ├── PrivateRoute.jsx     # Protected routes
│   │   └── PublicRoute.jsx      # Public routes
│   │
│   ├── services/                # API Service Layer
│   │   ├── authService.js       # Auth API calls
│   │   ├── restaurantService.js # Restaurant APIs
│   │   ├── menuService.js       # Menu APIs
│   │   ├── orderService.js      # Order APIs
│   │   ├── reviewService.js     # Review APIs
│   │   ├── profileService.js    # Profile APIs
│   │   └── cartService.js       # Cart calculations
│   │
│   ├── styles/                  # Global Styles
│   │   ├── GlobalStyle.js
│   │   ├── theme.js
│   │   └── index.css
│   │
│   ├── utils/                   # Constants
│   │   ├── constants.js
│   │   └── routes.js            # Route path constants
│   │
│   ├── App.jsx                  # Root Component
│   ├── main.jsx                 # React DOM entry point
│   └── index.css
│
├── .env                         # Environment variables
├── .env.example                 # Example env file
├── .gitignore
├── package.json
├── vite.config.js               # Vite configuration
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js v14+ ([Download](https://nodejs.org))
- npm v6+
- Backend server running on http://localhost:5000

### Setup (5 minutes)

**1. Install Dependencies**
```bash
npm install
```

**2. Configure Environment**
```bash
cp .env.example .env

# Edit .env:
VITE_API_BASE_URL=http://localhost:5000
VITE_API_TIMEOUT=10000
```

**3. Start Development Server**
```bash
npm run dev

# Output:
# ✅ App running on http://localhost:5173
```

**4. Open in Browser**
```
http://localhost:5173
```

## 📝 Environment Configuration

**Create `.env` file:**

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:5000

# Request timeout in milliseconds
VITE_API_TIMEOUT=10000
```

**For Production (.env.production):**
```env
VITE_API_BASE_URL=https://your-backend-url.com
VITE_API_TIMEOUT=10000
```

## 🌐 Accessing Features

### Public Routes (No Login Required)
```
/                   - Home page (restaurant list)
/login              - Login page
/signup             - Signup page
/restaurant/:id     - Restaurant details & menu
```

### Protected Routes (Login Required)
```
/cart               - Shopping cart
/checkout           - Order checkout
/order-tracking/:id - Track order
/order-success/:id  - Order confirmation
/orders             - Order history
/profile            - User profile
```

## 🔐 Authentication Flow

### Signup Process
1. User fills signup form (name, email, password, phone)
2. Form validation on frontend
3. POST request to `/api/auth/signup`
4. Backend creates user and returns JWT token
5. Token stored in localStorage
6. Redirect to home page

### Login Process
1. User enters email and password
2. POST request to `/api/auth/login`
3. Backend verifies credentials
4. Returns JWT token if valid
5. Token stored in localStorage
6. User can access protected routes

### Logout Process
1. Clear token from localStorage
2. Redirect to login page
3. All subsequent requests will fail (401 Unauthorized)

## 🛒 Shopping Cart

### How Cart Works

**Add Item to Cart**
```javascript
// No backend call yet!
// Cart stored only in React state + localStorage
const { addToCart } = useCart();
addToCart({ menuItemId, name, price, quantity });
```

**Update Quantity**
```javascript
const { updateQuantity } = useCart();
updateQuantity(menuItemId, newQuantity);
```

**Remove Item**
```javascript
const { removeFromCart } = useCart();
removeFromCart(menuItemId);
```

**Clear Cart After Order**
```javascript
const { clearCart } = useCart();
clearCart();
```

### Why No Backend Calls?
- User might add/remove items multiple times
- Only save to database when user completes order
- Reduces unnecessary API calls
- Improves performance

## 🎯 Key Features Explained

### State Management with Context API

**AuthContext**
```javascript
// Provides:
const { 
  user,              // Current user object
  isAuthenticated,   // Boolean
  loading,           // Loading state
  login,             // Function to login
  signup,            // Function to signup
  logout             // Function to logout
} = useAuth();
```

**CartContext**
```javascript
// Provides:
const { 
  cart,              // Array of items
  addToCart,         // Add item function
  removeFromCart,    // Remove item function
  updateQuantity,    // Update quantity function
  clearCart,         // Clear all items
  subtotal,          // Subtotal amount
  tax,               // Tax (10%)
  deliveryFee,       // Delivery fee (Rs. 100)
  total              // Grand total
} = useCart();
```

### FetchWrapper for API Calls

```javascript
import { fetchWrapper } from './helpers/fetchWrapper';

// GET request
const data = await fetchWrapper.get('/api/restaurants');

// POST request
const result = await fetchWrapper.post('/api/orders', orderData);

// PUT request (update)
const updated = await fetchWrapper.put('/api/orders/1', newData);

// DELETE request
const deleted = await fetchWrapper.delete('/api/orders/1');
```

### Service Pattern for API Calls

Each feature has a service module:

```javascript
// AuthService example
import { authService } from './services/authService';

const result = await authService.login(email, password);
const result = await authService.signup(name, email, password, phone);

// OrderService example
const order = await orderService.placeOrder(orderData);
const orders = await orderService.getOrders();
const order = await orderService.getOrderById(orderId);
```

### Real-time Order Tracking

```javascript
useEffect(() => {
  // Fetch order every 5 seconds
  const interval = setInterval(fetchOrder, 5000);
  return () => clearInterval(interval);
}, [orderId]);

// Status updates: pending → confirmed → preparing → ready → out_for_delivery → delivered
```

## 📦 Component Examples

### Navbar Component
```javascript
// Shows:
// - App logo (clickable to home)
// - Cart button with count
// - User name (if logged in)
// - Logout button
// - Or Login/Signup buttons
```

### RestaurantCard Component
```javascript
// Displays:
// - Restaurant image
// - Restaurant name
// - Rating with star icon
// - Delivery time
// - Delivery fee
// - Cuisine types
```

### CartItem Component
```javascript
// Shows:
// - Item name and price
// - Quantity with +/- buttons
// - Remove button
// - Subtotal (price × quantity)
```

### OrderStatus Component
```javascript
// Timeline showing:
// - Confirmed ✓
// - Preparing (in progress)
// - Ready (waiting)
// - Out for Delivery (waiting)
// - Delivered (completed)
```

## 🧪 Testing the App

### Manual User Flow Test

**1. Create Account**
```
1. Go to http://localhost:5173/signup
2. Fill form:
   - Name: Test User
   - Email: test@test.com
   - Password: password123
   - Phone: 03001234567
3. Click "Sign Up"
4. Should redirect to home
```

**2. Browse Restaurants**
```
1. See list of restaurants
2. Each shows rating, delivery time, fee
3. Click on restaurant to view menu
```

**3. Add Items to Cart**
```
1. View menu items
2. Click "Add to Cart" on items
3. Cart count increases in navbar
4. Can add multiple items
```

**4. Checkout**
```
1. Click "Cart" in navbar
2. See all items with quantities
3. See price breakdown (subtotal, tax, delivery)
4. Click "Proceed to Checkout"
5. Fill delivery address
6. Select payment method
7. Click "Place Order"
```

**5. Track Order**
```
1. See order confirmation page
2. Watch status update every 5 seconds
3. Status progresses: pending → confirmed → preparing → ready → delivered
4. See delivery time estimate
```

### Browser DevTools Testing

**Console Tab (F12)**
```
1. Should show NO errors
2. Only normal React logs
3. Check for API error messages
```

**Network Tab**
```
1. Click a restaurant
2. Should see GET /api/restaurants/{id}/menu
3. Status should be 200
4. Response shows menu items
```

**Application Tab**
```
1. LocalStorage should contain:
   - "token" (after login)
   - "cart" (after adding items)
2. Cookie should have auth token
```

## 🐛 Troubleshooting

### "Cannot reach backend"
```
Problem: API_BASE_URL is wrong or backend not running

Solution:
1. Check VITE_API_BASE_URL in .env
2. Ensure backend is running: npm run dev (in server folder)
3. Backend should be on http://localhost:5000
```

### "Login not working"
```
Problem: Cannot authenticate user

Solution:
1. Check browser console for error message
2. Verify backend is running
3. Use correct email and password
4. Check Network tab → POST /api/auth/login → status
```

### "Cart not saving after refresh"
```
Problem: Cart cleared after page reload

Solution:
1. Check localStorage in DevTools (F12)
2. Should have "cart" key with items
3. If empty, add items to cart again
4. localStorage should auto-save
```

### "Cannot add items to cart"
```
Problem: Add to cart button not working

Solution:
1. Check that you're on RestaurantDetails page
2. Check browser console for errors
3. Verify menu items loaded correctly
4. Check Network tab for API response
```

### "Port 5173 already in use"
```
Problem: Frontend port in use

Solution:
1. Change port in vite.config.js
2. Or kill process on port 5173
   - macOS/Linux: lsof -ti:5173 | xargs kill -9
   - Windows: netstat -ano | findstr :5173
```

### "Cannot find module"
```
Problem: Import error

Solution:
1. Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
2. Restart dev server
3. Check import paths are correct
```

## 🎨 Styling Approach

### Using CSS Modules

**Button.module.css**
```css
.container {
  padding: 10px 20px;
  background-color: #ff5722;
  color: white;
  border: none;
  cursor: pointer;
}
```

**Button.jsx**
```javascript
import styles from './Button.module.css';

export default function Button() {
  return <button className={styles.container}>Click Me</button>;
}
```

### Using Inline Styles

```javascript
const styles = {
  container: {
    padding: '10px 20px',
    backgroundColor: '#ff5722',
    color: 'white'
  }
};

return <button style={styles.container}>Click Me</button>;
```

## 📦 Build & Deployment

### Build for Production

```bash
# Create optimized build
npm run build

# Output: dist/ folder (ready to deploy)
```

### Preview Production Build

```bash
npm run preview

# Opens local preview at http://localhost:4173
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
# Update environment variables
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
netlify deploy --prod --dir=dist
```

## 📚 Custom Hooks

### useAuth Hook
```javascript
import { useAuth } from './hooks/useAuth';

const { user, isAuthenticated, login, signup, logout } = useAuth();
```

### useCart Hook
```javascript
import { useCart } from './hooks/useCart';

const { cart, addToCart, removeFromCart, updateQuantity, total } = useCart();
```

### useFetch Hook
```javascript
import { useFetch } from './hooks/useFetch';

const { data, loading, error, refetch } = useFetch('/api/restaurants');
```

## 🔄 Common Patterns

### Fetch Data on Page Load
```javascript
useEffect(() => {
  fetchData();
}, []);
```

### Update UI on State Change
```javascript
useEffect(() => {
  // Run when cart changes
}, [cart]);
```

### Handle Form Submission
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await apiCall();
  if (result.success) {
    // Success handling
  }
};
```

### Conditional Rendering
```javascript
{isAuthenticated ? (
  <LogoutButton />
) : (
  <LoginButton />
)}
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)
- [Context API Guide](https://react.dev/reference/react/useContext)
- [Fetch API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch
3. Make changes
4. Commit and push
5. Open Pull Request

## 🚀 Performance Tips

1. **Lazy Load Pages**
   ```javascript
   const Home = lazy(() => import('./pages/Home'));
   ```

2. **Memoize Components**
   ```javascript
   export default memo(RestaurantCard);
   ```

3. **Optimize Re-renders**
   - Use `useCallback` for functions
   - Use `useMemo` for expensive calculations

4. **Image Optimization**
   - Use appropriate image sizes
   - Consider lazy loading images

5. **Code Splitting**
   - Split by route
   - Load only what's needed

## 📖 Best Practices

1. **Keep Components Small**
   - One responsibility per component
   - Easy to test and maintain

2. **Lift State Up**
   - Avoid prop drilling
   - Use Context for global state

3. **Use Custom Hooks**
   - Reuse logic across components
   - Keep components clean

4. **Error Handling**
   - Try-catch blocks
   - User-friendly error messages
   - Error boundary for crashes

5. **Security**
   - Store token securely
   - Validate user input
   - Never log sensitive data
   - HTTPS in production

---

**Happy Coding! 🚀**

**Last Updated:** January 2024
