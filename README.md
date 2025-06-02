# 🛒 E-commerce API

A RESTful API for an e-commerce platform built with **Node.js**, **Express**, and **MongoDB** (Mongoose). This backend handles product management, authentication (including OAuth with Google and GitHub), cart and order processing, and provides secure and scalable endpoints for a full-featured e-commerce system.

---

## 🚀 Features

- ✅ User registration and login (OAuth2)
- 🛡️ Role-based access (Admin, Customer)
- 📦 Product, category, and brand management
- 🛒 Cart and 🧾 order functionality
- 🔐 Secure routes using Passport.js
- 🧪 Input validation and error handling
- 📄 Swagger API documentation
- 🧱 Modular codebase for scalability

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Auth:** Passport.js (Google & GitHub)
- **Docs:** Swagger (OpenAPI 3)
- **Validation:** express-validator
- **Security:** dotenv, CORS

---

## 🔐 Environment Setup

Create a `.env` file in the root with the following:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
SESSION_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

---

## 🛠️ Getting Started

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/ecommerce-api.git
   cd foldername
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the server:

   ```bash
   pnpm run dev
   ```

---

## 📄 API Documentation

The API is documented using **Swagger**.

- Visit: [https://products-api-5zdk.onrender.com/api-docs](https://products-api-5zdk.onrender.com/api-docs)

Test and explore endpoints interactively using Swagger UI.

---

## ✅ Future Improvements

- ⏩ Rate limiting
- 🧪 Add tests with Jest & Supertest
- 🛎️ Email notifications on order
- 💳 Integrate payment gateway (Stripe/PayPal)
- 📊 Admin dashboard (frontend)
