# Natours API

This API provides data and functionality for the Natours web application, allowing users to explore and book nature tours.

## 🚀 Getting Started

### Prerequisites

*   Node.js and npm (or yarn) installed on your machine.
*   A MongoDB database instance (you can use MongoDB Atlas for a cloud-based solution).

### Installation

1.  Clone the repository: `git clone [repository URL]`
2.  Navigate to the project directory: `cd natours-api`
3.  Install dependencies: `npm install` or `yarn install`
4.  Create a `.env` file in the root directory and configure the environment variables.


###📚 API Endpoints
This API follows RESTful principles and uses JSON for request and response bodies.

Tours
GET /api/v1/tours: Get all tours. Supports filtering, sorting, limiting, and pagination.
GET /api/v1/tours/:id: Get a specific tour by ID.
POST /api/v1/tours: Create a new tour. (Admin & Lead Guide only)
PATCH /api/v1/tours/:id: Update a tour. (Admin & Lead Guide only)
DELETE /api/v1/tours/:id: Delete a tour. (Admin & Lead Guide only)
GET /api/v1/tours/top-5-cheap: Get the top 5 cheapest tours.
GET /api/v1/tours/tour-stats: Get tour statistics.
GET /api/v1/tours/monthly-plan/:year: Get the monthly plan for tours for a given year. (Admin, Lead Guide, & User)
GET /api/v1/tours/tours-within/:distance/center/:latlng/unit/:unit: Get tours within a specified distance from a center point.
GET /api/v1/tours/distances/:latlng/unit/:unit: Get distances to tours from a given point.
Users
POST /api/v1/users/signup: Register a new user.
POST /api/v1/users/login: Log in a user.
POST /api/v1/users/forgotPassword: Request a password reset.
PATCH /api/v1/users/resetPassword/:token: Reset password using a token.
PATCH /api/v1/users/updateMyPassword: Update the current user's password. (User only)
PATCH /api/v1/users/updateMe: Update the current user's data. (User only)
DELETE /api/v1/users/deleteMe: Deactivate the current user's account. (User only)
GET /api/v1/users/me: Get the currently logged-in user's data. (User only)
GET /api/v1/users: Get all users. (Admin only)
POST /api/v1/users: Create a new user. (Admin only)
GET /api/v1/users/:id: Get a user by ID. (Admin only)
PATCH /api/v1/users/:id: Update a user. (Admin only)
DELETE /api/v1/users/:id: Delete a user. (Admin only)
Reviews
GET /api/v1/reviews: Get all reviews.
GET /api/v1/reviews/:id: Get a specific review by ID.
POST /api/v1/tours/:tourId/reviews: Create a new review for a tour. (User only)
PATCH /api/v1/reviews/:id: Update a review. (User & Admin only)
DELETE /api/v1/reviews/:id: Delete a review. (User & Admin only)



### Running the Server

```bash
npm start
