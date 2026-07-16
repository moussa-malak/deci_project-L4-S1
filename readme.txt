# DECI Project - E-Commerce API

A modern e-commerce REST API built with Node.js, Express, and MongoDB. This project provides comprehensive APIs for managing products, categories, shopping carts, and orders.

Base route prefix: `/`

## API Endpoints

### Products
- `GET /product` - Get all products
- `GET /product/:id` - Get product by ID
- `POST /product` - Create new product
- `PUT /product/:id` - Update product
- `DELETE /product/:id` - Delete product

### Categories
- `GET /category` - Get all categories
- `GET /category/:id` - Get category by ID
- `POST /category` - Create new category
- `PUT /category/:id` - Update category
- `DELETE /category/:id` - Delete category

### Shopping Cart
- `GET /cart` - Get user's cart
- `POST /cart` - Add item to cart
- `PUT /cart/:id` - Update cart item
- `DELETE /cart/:id` - Remove item from cart

### Orders
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create new order (checkout from cart)
- `PATCH /orders/:id/status` - Update order status

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
- Order number, items array, total amount, status, shipping address, timestamps

## Data Structure

### Product
```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "price": 100,
  "category": "ObjectId",
  "stock": 10,
  "inStock": true,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Category
```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Cart
```json
{
  "_id": "ObjectId",
  "items": [
    {
      "product": "ObjectId",
      "quantity": 2,
      "price": 50
    }
  ],
  "totalPrice": 100,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Order
```json
{
  "_id": "ObjectId",
  "orderNumber": "ORD-1680000000000",
  "items": [
    {
      "product": "ObjectId",
      "name": "string",
      "price": 50,
      "quantity": 2
    }
  ],
  "totalPrice": 100,
  "status": "pending",
  "shippingAddress": {
    "fullName": "string",
    "address": "string",
    "city": "string",
    "postalCode": "string",
    "country": "string"
  },
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

the github ripo link is
https://github.com/moussa-malak/deci_project-L4-S1.git