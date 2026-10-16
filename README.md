# 🛍️ Elite Store — Full-Stack E-Commerce Platform

A production-ready e-commerce platform built with the MERN stack. 
Features include user and admin authentication, product management, 
shopping cart, order processing, and a role-based admin dashboard.

---

## ✨ Features

### Customer Side
- 🛒 Product browsing with filters
- 📸 Product detail with images
- 🛍️ Shopping cart
- 💳 Checkout with COD
- 🔐 JWT authentication
- 📦 Order history
- ⭐ Product reviews

### Admin Side
- 📊 Admin dashboard
- 📦 Product CRUD
- 🚚 Order management
- 👥 User management
- 🔐 Role-based access

---

## 🛠️ Tech Stack

**Frontend:**
- React
- TypeScript
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)

**Deployment:**
- Frontend: Vercel
- Backend: Railway
- Database: MongoDB Atlas

---

## 🚀 Live Demo

🔗 **Live:** [e-commerce-smoky-chi.vercel.app](https://e-commerce-smoky-chi.vercel.app)

⚠️ **Note:** This project is built with React (CRA). Initial load may 
take 10-15 seconds due to cold start on Railway free tier.

---

## 📸 Screenshots

*Coming soon*

---

## 🎯 Pages

- Home
- Shop
- Product Detail
- Cart
- Checkout
- Login / Register
- Profile
- Order History
- Admin Dashboard
- Admin Products
- Admin Orders

---

## 🔐 Roles

- `admin` — Full access
- `customer` — Shopping

---

## 🗄️ Data Models

- **User** — customers + admins
- **Product** — products with categories
- **Cart** — user cart items
- **Order** — orders with COD
- **Review** — product reviews

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB
- ImageKit account

### Installation

```bash
# Clone the repo
git clone https://github.com/mohsinsheikh08/E-Commerce.git
cd E-Commerce

# Backend setup
cd backend
npm install
# Add .env file with credentials
npm run dev

# Frontend setup
cd ../frontend
npm install
npm run dev
