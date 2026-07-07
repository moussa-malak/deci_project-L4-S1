# DECI Project - E-Commerce API

A modern e-commerce REST API built with Node.js, Express, and MongoDB. This project provides comprehensive APIs for managing products, categories, shopping carts, and orders.

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Shopping Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status


### Middleware
- **404 Handler** - Catches undefined routes and returns proper 404 response
- **Error Handler** - Centralized error handling for all errors in the application

### Utilities
- **asyncHandler** - Wrapper function for handling async/await errors in route handlers
- **response** - Standardized response formatter for consistent API responses

### Product Schema
- Name, description, price, category, stock quantity

### Category Schema
- Category name, description

### Cart Schema
- User reference, product reference, quantity

### Order Schema
- User details, items array, order status, total amount, timestamps


the github ripo link is
https://github.com/moussa-malak/deci_project-L4-S1.git