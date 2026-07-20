# 🍕 Food Ordering App - Backend

Node.js + Express REST API backend for Food Ordering App with MongoDB database.

## 📋 Quick Links

- **[Main Project README](../README.md)**
- **[Frontend README](../client/README.md)**
- **[Development Plan](../2_WEEK_DEVELOPMENT_PLAN.md)**

## 🎯 Overview

This is the backend server that powers the Food Ordering App. It handles all business logic, database operations, and API endpoints.

### What Does Backend Do?

✅ User authentication and authorization  
✅ Restaurant data management  
✅ Menu items management  
✅ Order processing and validation  
✅ Order status tracking  
✅ Review and rating system  
✅ Price calculations (subtotal, tax, delivery)  
✅ Data persistence with MongoDB  

## 🛠️ Tech Stack

- **Runtime:** Node.js v14+
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Security:** bcryptjs
- **Environment:** dotenv
- **Middleware:** CORS, body-parser

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   ├── env.js             # Environment variables
│   │   └── cloudinary.js      # Image upload (optional)
│   │
│   ├── models/                # MongoDB Schemas
│   │   ├── User.js            # User schema
│   │   ├── Restaurant.js      # Restaurant schema
│   │   ├── MenuItem.js        # Menu item schema
│   │   ├── Order.js           # Order schema
│   │   └── Review.js          # Review schema
│   │
│   ├── controllers/           # Business Logic
│   │   ├── authController.js
│   │   ├── restaurantController.js
│   │   ├── menuController.js
│   │   ├── orderController.js  (⭐ Most Complex)
│   │   ├── reviewController.js
│   │   └── userController.js
│   │
│   ├── routes/                # API Routes
│   │   ├── authRoutes.js
│   │   ├── restaurantRoutes.js
│   │   ├── menuRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── middleware/            # Express Middleware
│   │   ├── authMiddleware.js       # JWT verification
│   │   ├── errorMiddleware.js      # Error handling
│   │   ├── validationMiddleware.js # Input validation
│   │   ├── uploadMiddleware.js     # File uploads
│   │   └── loggerMiddleware.js     # Request logging
│   │
│   ├── services/              # Reusable Business Logic
│   │   ├── authService.js
│   │   ├── restaurantService.js
│   │   ├── orderService.js        # Order calculations
│   │   ├── emailService.js        # Email notifications
│   │   └── reviewService.js
│   │
│   ├── helpers/               # Utility Functions
│   │   ├── jwtHelper.js       # JWT sign/verify
│   │   ├── passwordHelper.js  # Hash/compare passwords
│   │   ├── responseHelper.js  # Standard responses
│   │   ├── paginationHelper.js
│   │   ├── validationHelper.js
│   │   └── filterHelper.js
│   │
│   ├── validators/            # Validation Schemas
│   │   ├── authValidator.js
│   │   ├── orderValidator.js
│   │   └── restaurantValidator.js
│   │
│   ├── utils/                 # Constants & Errors
│   │   ├── ApiError.js        # Custom error class
│   │   └── constants.js       # Status codes, enums
│   │
│   ├── app.js                 # Express app setup
│   └── server.js              # Server entry point
│
├── .env                       # Environment variables
├── .env.example               # Example environment file
├── .gitignore
├── package.json
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js v14+ ([Download](https://nodejs.org))
- npm v6+
- MongoDB ([Local](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas))

### Setup (5 minutes)

**1. Install Dependencies**
```bash
npm install
```

**2. Configure Environment**
```bash
cp .env.example .env

# Edit .env file with your settings
```

**3. Start Server**
```bash
npm run dev

# Output:
# ✅ MongoDB Connected
# ✅ Server running on port 5000
```

## 📝 Environment Configuration

**Create `.env` file:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/food-ordering-app

# Authentication
JWT_SECRET=your_super_secret_key_minimum_32_characters_long
JWT_EXPIRE=7d

# Optional: Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Optional: Cloudinary (Image Upload)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🌐 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

**POST /api/auth/signup**
- Create new user account
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "03001234567"
  }'
```

**POST /api/auth/login**
- Login user and get JWT token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**GET /api/auth/profile** (Protected)
- Get current user profile
```bash
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**POST /api/auth/logout**
- Logout user (token clearing on frontend)

### Restaurant Endpoints

**GET /api/restaurants**
- Get all restaurants
```bash
curl http://localhost:5000/api/restaurants
```

Query Parameters:
- `cuisine` - Filter by cuisine type
- `minRating` - Minimum rating
- `city` - Filter by city

**GET /api/restaurants/:id**
- Get restaurant details
```bash
curl http://localhost:5000/api/restaurants/{id}
```

**GET /api/restaurants/search?q=pizza**
- Search restaurants

**GET /api/restaurants/:id/menu**
- Get menu items for restaurant
```bash
curl http://localhost:5000/api/restaurants/{id}/menu
```

### Order Endpoints

**POST /api/orders** (Protected)
- Place new order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "restaurantId": "...",
    "items": [
      {
        "menuItemId": "...",
        "name": "Pizza",
        "price": 350,
        "quantity": 2
      }
    ],
    "deliveryAddress": "123 Main St",
    "deliveryPhone": "03001234567",
    "paymentMethod": "cash_on_delivery"
  }'
```

**GET /api/orders** (Protected)
- Get all user orders

**GET /api/orders/:id** (Protected)
- Get order details
```bash
curl http://localhost:5000/api/orders/{orderId} \
  -H "Authorization: Bearer TOKEN"
```

**PUT /api/orders/:id/status**
- Update order status
```bash
curl -X PUT http://localhost:5000/api/orders/{id}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "preparing"}'
```

**DELETE /api/orders/:id** (Protected)
- Cancel order

### Review Endpoints

**POST /api/reviews** (Protected)
- Submit review
```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "...",
    "rating": 5,
    "comment": "Great food!",
    "foodQuality": 5,
    "deliverySpeed": 4,
    "packaging": 5
  }'
```

**GET /api/reviews/:restaurantId**
- Get restaurant reviews

## 🗄️ Database Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  phone: String (required),
  addresses: [{
    type: String,           // 'home', 'office', 'other'
    address: String,
    city: String,
    zipCode: String,
    isDefault: Boolean
  }],
  paymentMethods: [{
    type: String,           // 'card', 'upi', 'bank'
    cardNumber: String,
    expiryDate: String,
    isDefault: Boolean
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Restaurant Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String (required),
  address: String (required),
  city: String (required),
  image: String,
  rating: Number (default: 0),
  totalReviews: Number (default: 0),
  cuisineType: [String] (required),
  deliveryTime: Number (in minutes),
  deliveryFee: Number,
  minOrderAmount: Number,
  isOpen: Boolean (default: true),
  openTime: String,          // "10:00"
  closeTime: String,         // "23:00"
  createdAt: Date
}
```

### MenuItem Model
```javascript
{
  _id: ObjectId,
  restaurantId: ObjectId (FK to Restaurant),
  name: String (required),
  description: String,
  price: Number (required),
  image: String,
  category: String (required),
  available: Boolean (default: true),
  preparationTime: Number (in minutes),
  createdAt: Date
}
```

### Order Model (⭐ Most Complex)
```javascript
{
  _id: ObjectId,
  orderId: String (unique),         // "ORD-1234567890-abc123"
  userId: ObjectId (FK to User),
  restaurantId: ObjectId (FK to Restaurant),
  items: [{
    menuItemId: ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    subtotal: Number
  }],
  subtotal: Number,
  deliveryFee: Number,
  tax: Number,
  totalPrice: Number,
  deliveryAddress: String (required),
  deliveryPhone: String (required),
  status: String (enum),            // pending, confirmed, preparing, ready, out_for_delivery, delivered, cancelled
  paymentMethod: String (enum),     // cash_on_delivery, card, online_banking
  paymentStatus: String,            // pending, completed, failed
  notes: String,                    // Special instructions
  deliveryPersonId: ObjectId,
  deliveryPersonName: String,
  deliveryPersonPhone: String,
  deliveryPersonVehicle: String,
  rating: Number,                   // 1-5 (after delivery)
  review: String,
  createdAt: Date,
  confirmedAt: Date,
  preparingAt: Date,
  readyAt: Date,
  outForDeliveryAt: Date,
  deliveredAt: Date,
  estimatedDeliveryTime: Date
}
```

### Review Model
```javascript
{
  _id: ObjectId,
  orderId: ObjectId (FK to Order),
  restaurantId: ObjectId (FK to Restaurant),
  userId: ObjectId (FK to User),
  userName: String,
  rating: Number (1-5, required),
  comment: String,
  foodQuality: Number (1-5),
  deliverySpeed: Number (1-5),
  packaging: Number (1-5),
  createdAt: Date
}
```

## 🧪 Testing with Postman

### Step 1: Create Collection
- Open Postman
- Create new collection "Food Ordering API"

### Step 2: Add Test Requests

**Signup Request**
```
Method: POST
URL: http://localhost:5000/api/auth/signup
Headers: Content-Type: application/json
Body (JSON):
{
  "name": "Test User",
  "email": "test@test.com",
  "password": "password123",
  "phone": "03001234567"
}
```

**Login Request**
```
Method: POST
URL: http://localhost:5000/api/auth/login
Headers: Content-Type: application/json
Body (JSON):
{
  "email": "test@test.com",
  "password": "password123"
}

Save response token in variable:
pm.environment.set("token", pm.response.json().data.token);
```

**Get Restaurants**
```
Method: GET
URL: http://localhost:5000/api/restaurants
```

**Get Restaurant Menu**
```
Method: GET
URL: http://localhost:5000/api/restaurants/{restaurantId}/menu
Replace {restaurantId} with actual ID from restaurants response
```

**Place Order**
```
Method: POST
URL: http://localhost:5000/api/orders
Headers:
  - Content-Type: application/json
  - Authorization: Bearer {{token}}

Body (JSON):
{
  "restaurantId": "...",
  "items": [
    {
      "menuItemId": "...",
      "name": "Pizza",
      "price": 350,
      "quantity": 1
    }
  ],
  "deliveryAddress": "123 Main St",
  "deliveryPhone": "03001234567",
  "paymentMethod": "cash_on_delivery"
}
```

**Get Orders**
```
Method: GET
URL: http://localhost:5000/api/orders
Headers: Authorization: Bearer {{token}}
```

## 🔐 Authentication Flow

### How JWT Works

1. **User Signup/Login**
   - User provides email & password
   - Password verified with bcryptjs
   - JWT token generated with user ID
   - Token sent to frontend

2. **Token Storage**
   - Frontend stores token in localStorage
   - Token sent in Authorization header: `Bearer {token}`

3. **Protected Routes**
   - Every request to protected route checks token
   - Token verified using JWT_SECRET
   - If invalid → 401 Unauthorized
   - If valid → Request proceeds

4. **Token Expiry**
   - Token expires after JWT_EXPIRE time (default: 7 days)
   - Frontend should clear localStorage and redirect to login
   - User needs to login again

## 📊 Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Error Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Success |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Invalid token |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Duplicate entry |
| 500 | Server Error - Internal error |

### Example Error Responses

**Invalid Email**
```json
{
  "success": false,
  "message": "Invalid email format"
}
```

**Insufficient Order Amount**
```json
{
  "success": false,
  "message": "Minimum order amount is Rs. 300"
}
```

**Unauthorized**
```json
{
  "success": false,
  "message": "No token provided"
}
```

## 🔍 Debugging

### Enable Detailed Logging

**Check Environment**
```bash
# In terminal, you should see:
✅ MongoDB Connected
✅ Server listening on port 5000
```

**Check Request Logs**
```
All API requests show:
[method] [URL] [status] [time]
Example: POST /api/orders 201 145ms
```

**MongoDB Connection**
```bash
# Connect to MongoDB
mongosh

# Check if data exists
use food-ordering-app
db.users.find()
db.restaurants.find()
db.orders.find()
```

### Common Issues

**"Cannot connect to MongoDB"**
- Check MONGODB_URI in .env
- Ensure MongoDB is running
- Check connection string syntax

**"JWT token invalid"**
- Verify JWT_SECRET in .env is consistent
- Check token format: Bearer {token}
- Ensure token is not expired

**"CORS error from frontend"**
- Enable CORS in app.js
- Check frontend API base URL

**"Port 5000 in use"**
```bash
# Kill process on port 5000
# macOS/Linux: lsof -ti:5000 | xargs kill -9
# Windows: netstat -ano | findstr :5000
```

## 📚 npm Scripts

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start

# Run all tests (if configured)
npm test

# Lint code (if configured)
npm run lint
```

## 🌍 Deployment to Heroku

### Step 1: Create Heroku App
```bash
heroku login
heroku create your-app-name
```

### Step 2: Set Environment Variables
```bash
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production
```

### Step 3: Deploy
```bash
git push heroku main
```

### Step 4: Check Logs
```bash
heroku logs --tail
```

## 📖 Key Controllers

### authController.js
- signup - Create new user
- login - Authenticate user
- getProfile - Get user details
- logout - User logout

### orderController.js (⭐ Most Important)
- placeOrder - Create order with validation
- getOrders - Get user's orders
- getOrderById - Get order details
- updateOrderStatus - Change order status
- cancelOrder - Cancel order if possible

### restaurantController.js
- getAllRestaurants - Fetch all restaurants
- getRestaurantById - Get single restaurant
- searchRestaurants - Search by name/cuisine

### menuController.js
- getMenuItems - Get items for restaurant
- getMenuItemById - Get single menu item

### reviewController.js
- submitReview - Add review
- getReviews - Get restaurant reviews

## 🔄 Request/Response Cycle

```
Frontend → Express Route → Middleware → Controller → Service → MongoDB
                                          ↓
                                    Business Logic
                                     Validation
                                    Calculation
                                          ↓
                                      Formatted Response
                                          ↓
Frontend ← Formatted JSON ← Response Helper ← Model ← Database
```

## 📚 Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [JWT Guide](https://jwt.io)
- [REST API Best Practices](https://restfulapi.net)

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

**Happy Coding! 🚀**

**Last Updated:** January 2024
