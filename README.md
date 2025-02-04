# 🌍 Natours API

A robust REST API for managing tours, users, reviews, and bookings, built with Express.js and MongoDB.

## ✨ Features

- 🔐 JWT Authentication & Authorization
- 🎯 Advanced Query Features (filtering, sorting, pagination)
- 📧 Password Reset with Email
- 🛡️ Security Features (Rate limiting, XSS protection, Parameter sanitization)
- 🗺️ Tour Management with Geospatial Data
- ⭐ Review System
- 👥 User Profile Management

## 🛠️ Tech Stack

- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)
- Nodemailer
- Various Security Packages (helmet, xss-clean, hpp, etc.)

## 🚀 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd natours-api
```
2. Install dependencies
```bash
npm install
```
3. Create config.env in the root directory with the environment variables

## 🎮 API Endpoints

👤 Authentication

* POST /api/v1/users/signup - Register new user
* POST /api/v1/users/login - Login user
* POST /api/v1/users/forgotPassword - Request password reset
* PATCH /api/v1/users/resetPassword/:token - Reset password
* PATCH /api/v1/users/updateMyPassword - Update password (authenticated)





## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request


---

⭐️ If you found this project helpful, please give it a star on GitHub! ⭐️



### Running the Server

```bash
npm start
