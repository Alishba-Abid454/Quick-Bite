# 🍕 Food Ordering App

A complete full-stack food ordering application built with React, Node.js, Express, and MongoDB. This project demonstrates modern web development practices, clean architecture, and production-ready code.

## 📋 Quick Links

- **[Frontend Documentation](./client/README.md)**
- **[Backend Documentation](./server/README.md)**
- **[Development Plan](./2_WEEK_DEVELOPMENT_PLAN.md)**
- **[File Structure Guide](./file_structure_guide.md)**

## 🎯 Overview

Food Ordering App is a modern web application that connects customers with restaurants and enables seamless food ordering, payment, and delivery tracking. It mimics real-world platforms like Foodpanda, Uber Eats, and Daraz Food.

### What Can Users Do?

✅ **Register & Login** - Create account with email and password  
✅ **Browse Restaurants** - View all restaurants with ratings and delivery info  
✅ **Search & Filter** - Find restaurants by name, cuisine, or rating  
✅ **View Menus** - See food items with prices and descriptions  
✅ **Shopping Cart** - Add/remove items with real-time price updates  
✅ **Checkout** - Place orders with delivery address and payment method  
✅ **Order Tracking** - Track order status in real-time (preparing → delivered)  
✅ **Order History** - View past orders and reorder  
✅ **Leave Reviews** - Rate restaurants and add comments  

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js, React Router, Context API, Vite |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Authentication** | JWT (JSON Web Tokens) |
| **Security** | bcryptjs (password hashing) |
| **HTTP Client** | Fetch API |

## 📁 Project Structure

```
FoodOrderingApp/
├── server/                    # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/           # Database & environment
│   │   ├── models/           # MongoDB schemas
│   │   ├── controllers/      # Business logic
│   │   ├── routes/           # API endpoints
│   │   ├── middleware/       # Auth, validation, errors
│   │   ├── services/         # Reusable logic
│   │   ├── helpers/          # Utility functions
│   │   ├── app.js            # Express setup
│   │   └── server.js         # Server startup
│   ├── .env                  # Configuration
│   └── README.md             # Backend docs
│
├── client/                    # Frontend (React)
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── context/          # Global state
│   │   ├── pages/            # Complete screens
│   │   ├── services/         # API calls
│   │   ├── helpers/          # Utilities
│   │   ├── hooks/            # Custom hooks
│   │   ├── router/           # Routing
│   │   ├── App.jsx           # Root component
│   │   └── main.jsx          # Entry point
│   ├── .env                  # Configuration
│   └── README.md             # Frontend docs
│
├── README.md                  # This file
├── 2_WEEK_DEVELOPMENT_PLAN.md # Day-by-day guide
└── file_structure_guide.md    # Detailed structure
```

## 🚀 Quick Start (5 minutes)

### Prerequisites

- **Node.js** v14+ ([Download](https://nodejs.org))
- **npm** v6+
- **MongoDB** ([Local](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas))

### 1. Setup Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
# MONGODB_URI=mongodb://localhost:27017/food-ordering-app
# JWT_SECRET=your_secret_key_here

# Start server
npm run dev
# ✅ Server runs on http://localhost:5000
```

### 2. Setup Frontend (New Terminal)

```bash
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
# ✅ App runs on http://localhost:5173
```

### 3. Access Application

Open your browser and go to: **http://localhost:5173**

### 4. Create Test Account

```
Email: test@test.com
Password: password123
Name: Test User
Phone: 03001234567
```

## 📖 Full Setup Instructions

### Backend Setup Details

**1. Clone Repository**
```bash
git clone https://github.com/yourusername/food-ordering-app.git
cd FoodOrderingApp/server
```

**2. Install Dependencies**
```bash
npm install
```

**3. Configure Environment**
```bash
cp .env.example .env

# Edit .env:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/food-ordering-app
JWT_SECRET=your_super_secret_key_minimum_32_characters_long
JWT_EXPIRE=7d
NODE_ENV=development
```

**4. MongoDB Setup**

**Option A: Local MongoDB**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Ubuntu
sudo apt-get install -y mongodb
sudo systemctl start mongodb

# Windows
# Download from: https://www.mongodb.com/try/download/community
# Run installer and follow prompts
```

**Option B: MongoDB Atlas (Cloud)**
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Add to .env: MONGODB_URI=your_connection_string
```

**5. Start Backend**
```bash
npm run dev

# Expected output:
# ✅ MongoDB Connected
# ✅ Server listening on port 5000
```

### Frontend Setup Details

**1. Install Dependencies**
```bash
cd client
npm install
```

**2. Configure Environment**
```bash
cp .env.example .env

# .env file:
VITE_API_BASE_URL=http://localhost:5000
VITE_API_TIMEOUT=10000
```

**3. Start Development Server**
```bash
npm run dev

# App opens at http://localhost:5173
```

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/signup         - Register new user
POST   /api/auth/login          - Login user
GET    /api/auth/profile        - Get user profile (Protected)
POST   /api/auth/logout         - Logout user
```

### Restaurants
```
GET    /api/restaurants         - Get all restaurants
GET    /api/restaurants/:id     - Get restaurant details
GET    /api/restaurants/search  - Search restaurants
GET    /api/restaurants/:id/menu - Get menu items
```

### Orders
```
POST   /api/orders              - Place order (Protected)
GET    /api/orders              - Get user orders (Protected)
GET    /api/orders/:id          - Get order details (Protected)
PUT    /api/orders/:id/status   - Update order status
DELETE /api/orders/:id          - Cancel order (Protected)
```

### Reviews
```
POST   /api/reviews             - Submit review (Protected)
GET    /api/reviews/:restaurantId - Get restaurant reviews
```

## 🧪 Testing the App

### Test User Flow

**1. Signup**
- Go to http://localhost:5173/signup
- Fill form with test data
- Click "Sign Up"

**2. Login**
- Go to http://localhost:5173/login
- Use signup credentials
- Should see restaurant list

**3. Browse Restaurants**
- See all restaurants from backend
- Click on restaurant to view menu

**4. Add to Cart**
- Click menu items
- "Add to Cart" button
- Cart count updates in navbar

**5. Checkout**
- Click "Cart" in navbar
- Click "Proceed to Checkout"
- Fill delivery address
- Select payment method
- Click "Place Order"

**6. Track Order**
- See order confirmation page
- Watch status update in real-time
- Status changes: pending → confirmed → preparing → ready → delivered

### Using Postman for API Testing

**1. Import API Requests**
```
Create new Postman Collection:

Signup:
POST http://localhost:5000/api/auth/signup
Body: {
  "name": "Test User",
  "email": "test@test.com",
  "password": "password123",
  "phone": "03001234567"
}

Login:
POST http://localhost:5000/api/auth/login
Body: {
  "email": "test@test.com",
  "password": "password123"
}

Get Restaurants:
GET http://localhost:5000/api/restaurants
```

**2. Save Token**
- Copy token from login response
- Set in "Authorization" tab: Bearer {token}

**3. Test Protected Routes**
```
GET http://localhost:5000/api/auth/profile
Headers: Authorization: Bearer {token}
```

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
mongosh

# If not running, start it:
# macOS: brew services start mongodb-community
# Ubuntu: sudo systemctl start mongodb
```

### "CORS error in browser"
```
Solution: Ensure backend is running on http://localhost:5000
Check frontend .env: VITE_API_BASE_URL=http://localhost:5000
```

### "Port 5000 already in use"
```bash
# Change port in server/.env
PORT=5001

# Or kill process using port:
# macOS/Linux: lsof -ti:5000 | xargs kill -9
# Windows: netstat -ano | findstr :5000
```

### "Cannot find module"
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "Token invalid or expired"
```
Solution: Clear localStorage and login again
1. Open DevTools (F12)
2. Application → LocalStorage → Clear All
3. Login again
```

## 📚 Documentation

### Detailed Guides
- **[2_WEEK_DEVELOPMENT_PLAN.md](./2_WEEK_DEVELOPMENT_PLAN.md)** - Complete day-by-day implementation guide
- **[file_structure_guide.md](./file_structure_guide.md)** - Detailed file organization
- **[DEVELOPMENT_APPROACH.md](./DEVELOPMENT_APPROACH.md)** - Architecture overview

### Component Documentation
- **[Backend README](./server/README.md)** - API documentation, models, controllers
- **[Frontend README](./client/README.md)** - Components, hooks, state management

## 🎨 Key Features Explained

### Authentication System
- User registration with email validation
- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes requiring login
- Automatic token expiry

### Shopping Cart
- Add/remove items without backend calls
- Real-time price calculations
- Persist cart in browser localStorage
- Clear cart after successful order

### Order Processing
1. **Validation** - Check items, restaurant, minimum order
2. **Calculation** - Compute subtotal, tax, delivery fee
3. **Storage** - Save order to database
4. **Confirmation** - Return order details to user
5. **Tracking** - Poll status every 5 seconds

### Real-time Updates
- Order status changes automatically displayed
- Frontend polls backend every 5 seconds
- Status updates: pending → confirmed → preparing → ready → out_for_delivery → delivered

### Review System
- Users can review after delivery
- Rate on multiple aspects (food, delivery, packaging)
- Restaurant rating auto-calculated from reviews

## 🚀 Production Deployment

### Deploy Backend to Heroku

```bash
cd server

# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_secret_key

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Deploy Frontend to Vercel

```bash
cd client

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Update .env.production with backend URL
VITE_API_BASE_URL=https://your-backend.herokuapp.com
```

## 📊 Database Collections

### Users
```javascript
{
  name, email, password (hashed), phone,
  addresses: [{type, address, city, zipCode, isDefault}],
  paymentMethods: [{type, cardNumber, isDefault}],
  createdAt, updatedAt
}
```

### Restaurants
```javascript
{
  name, email, phone, address, image,
  rating, totalReviews, cuisineType,
  deliveryTime, deliveryFee, minOrderAmount,
  isOpen, openTime, closeTime
}
```

### Menu Items
```javascript
{
  restaurantId, name, description, price, image,
  category, available, preparationTime
}
```

### Orders
```javascript
{
  orderId, userId, restaurantId,
  items: [{menuItemId, name, price, quantity}],
  subtotal, deliveryFee, tax, totalPrice,
  deliveryAddress, deliveryPhone,
  status, paymentMethod, paymentStatus,
  timestamps (created, confirmed, preparing, ready, delivered)
}
```

### Reviews
```javascript
{
  orderId, restaurantId, userId, userName,
  rating, comment,
  foodQuality, deliverySpeed, packaging
}
```

## 📈 What You'll Learn

### Backend Skills
- Express.js REST API development
- MongoDB database design
- User authentication with JWT
- Business logic implementation
- Error handling and validation
- Middleware usage
- Database relationships

### Frontend Skills
- React component architecture
- React Hooks and custom hooks
- Context API for state management
- React Router navigation
- API integration with services
- Form handling and validation
- LocalStorage management

### Full-Stack Skills
- Frontend-backend communication
- Request/response cycle
- Authentication flow
- Real-time data updates
- Error handling across layers
- Debugging techniques

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Support

For issues or questions:
- Check [Troubleshooting](#troubleshooting) section
- Review [Backend README](./server/README.md)
- Review [Frontend README](./client/README.md)
- Open GitHub issue with details

## 📞 Contact

- **Email:** your.email@example.com
- **GitHub:** [@yourusername](https://github.com/yourusername)

## 🗺️ Roadmap

### Phase 1 (Current) ✅
- User authentication
- Restaurant browsing
- Order placement
- Order tracking

### Phase 2 (Planned)
- Payment gateway integration (Stripe)
- SMS notifications
- Admin dashboard
- Analytics

### Phase 3 (Future)
- Mobile app (React Native)
- Real-time chat support
- Recommendation system
- Loyalty rewards program

---

**Ready to start? Follow the [Quick Start](#quick-start) guide above!** 🚀

**Last Updated:** January 2024
