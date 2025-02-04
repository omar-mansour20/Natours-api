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

* **POST** /api/v1/users/signup - Register new user
* POST /api/v1/users/login - Login user
* POST /api/v1/users/forgotPassword - Request password reset
* PATCH /api/v1/users/resetPassword/:token - Reset password
* PATCH /api/v1/users/updateMyPassword - Update password (authenticated)

🧑‍💼 User Management

* GET /api/v1/users/me - Get current user profile
* PATCH /api/v1/users/updateMe - Update user details
* DELETE /api/v1/users/deleteMe - Deactivate account

🏞️ Tours

* GET /api/v1/tours - Get all tours
* POST /api/v1/tours - Create new tour (admin/lead-guide)
* GET /api/v1/tours/:id - Get specific tour
* PATCH /api/v1/tours/:id - Update tour (admin/lead-guide)
* DELETE /api/v1/tours/:id - Delete tour (admin/lead-guide)
* GET /api/v1/tours/top-5-cheap - Get top 5 cheap tours
* GET /api/v1/tours/tour-stats - Get tour statistics
* GET /api/v1/tours/monthly-plan/:year - Get monthly tour plan
* GET /api/v1/tours/tours-within/:distance/center/:latlng/unit/:unit - Find tours within radius
* GET /api/v1/tours/distances/:latlng/unit/:unit - Get distances to tours

⭐ Reviews

* GET /api/v1/reviews - Get all reviews
* POST /api/v1/reviews - Create new review
* GET /api/v1/reviews/:id - Get specific review
* PATCH /api/v1/reviews/:id - Update review
* DELETE /api/v1/reviews/:id - Delete review


## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request


---

⭐️ If you found this project helpful, please give it a star on GitHub! ⭐️

