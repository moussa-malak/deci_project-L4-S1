# DECI Project - E-Commerce API

A modern RESTful e-commerce API built with Node.js, Express, and MongoDB. This project supports product catalog management, category management, shopping cart operations, and order processing.

Base route prefix: `/`

## Features

- Product CRUD operations
- Category CRUD operations
- Shopping cart management
- Order creation and status updates
- Centralized error handling and 404 middleware
- Async route handling with standard response formatting

## Prerequisites

- Node.js
- npm
- MongoDB

## Installation

1. Clone the repository:
   `git clone https://github.com/moussa-malak/deci_project-L4-S1.git`
2. Change into the project folder:
   `cd deci_project-L4-S1`
3. Install dependencies:
   `npm install`
4. Create a `.env` file with the required environment variables.
5. Start the development server:
   `npm run dev`

## Environment Variables

- `PORT` - server port
- `MONGO_URI` - MongoDB connection string
- `NODE_ENV` - environment mode (development/production)
- `JWT_SECRET` - secret key for authentication tokens
- `CORS_ORIGIN` - allowed front-end origin

## API Endpoints

### Products
- `GET /product` - Get all products
- `GET /product/:id` - Get product by ID
- `POST /product` - Create a new product
- `PUT /product/:id` - Update a product
- `DELETE /product/:id` - Delete a product

### Categories
- `GET /category` - Get all categories
- `GET /category/:id` - Get category by ID
- `POST /category` - Create a new category
- `PUT /category/:id` - Update a category
- `DELETE /category/:id` - Delete a category

### Shopping Cart
- `GET /cart` - Get the current user's cart
- `POST /cart` - Add an item to the cart
- `PUT /cart/:id` - Update a cart item
- `DELETE /cart/:id` - Remove an item from the cart

### Orders
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get an order by ID
- `POST /orders` - Create a new order (checkout)
- `PATCH /orders/:id/status` - Update order status

## Data Schemas

### Product
- name
- description
- price
- category
- stock quantity

### Category
- name
- description

### Cart
- user reference
- product reference
- quantity

### Order
- order number
- items array
- total amount
- status
- shipping address
- timestamps

## Repository

https://github.com/moussa-malak/deci_project-L4-S1.git