# 🍕 Food Ordering App

A complete full-stack food ordering application built with React, Node.js, Express, and MongoDB. This project demonstrates modern web development practices, clean architecture, and production-ready code.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Food Ordering App is a modern web application that connects customers with restaurants and enables seamless food ordering, payment, and delivery tracking. It mimics real-world platforms like Foodpanda, Uber Eats, and Daraz Food.

### Key Capabilities

- **User Management:** Register, login, and manage user profiles
- **Restaurant Discovery:** Browse and search restaurants with filters
- **Menu Management:** View detailed menu items with prices
- **Shopping Cart:** Add/remove items with real-time calculations
- **Order Processing:** Place orders with validation and total calculations
- **Real-time Tracking:** Track order status from preparation to delivery
- **Review System:** Rate and review restaurants
- **Payment Options:** Support for multiple payment methods

## ✨ Features

### For Customers

- ✅ User authentication (Signup/Login with JWT)
- ✅ Browse all restaurants with ratings
- ✅ Search restaurants by name or cuisine
- ✅ Filter restaurants by rating and delivery time
- ✅ View detailed menu items with descriptions
- ✅ Add/remove items from shopping cart
- ✅ Real-time price calculations (subtotal, tax, delivery fee)
- ✅ Secure checkout with address and payment info
- ✅ Multiple payment methods support
- ✅ Real-time order tracking with status updates
- ✅ View order history
- ✅ Rate and review restaurants
- ✅ Manage saved addresses
- ✅ Save favorite payment methods

### For Administrators (Planned)

- Restaurant management
- Menu item management
- Order status updates
- Delivery management
- Analytics and reports

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js with Hooks
- **Routing:** React Router v6
- **State Management:** Context API
- **Styling:** CSS Modules / Styled Components
- **HTTP Client:** Fetch API with custom wrapper
- **Build Tool:** Vite
- **Package Manager:** npm

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Security:** bcryptjs
- **Environment Management:** dotenv
- **CORS:** Express CORS middleware

### Database
- **Primary DB:** MongoDB
- **Collections:**
  - Users (authentication & profile)
  - Restaurants (restaurant details)
  - MenuItems (food items)
  - Orders (order management)
  - Reviews (ratings and feedback)

