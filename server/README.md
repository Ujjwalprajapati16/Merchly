# Merchly Server 🛍️

> A modern and dynamic e-commerce platform backend built for selling high-quality merchandise with style and simplicity.

Merchly Server is the backend API for the Merchly e-commerce platform, designed with a focus on user experience, scalability, and performance. Built with TypeScript and Express.js, it provides a robust foundation for managing products, users, and transactions.

## 🚀 Features

- **Modern TypeScript**: Fully typed codebase for better development experience and fewer runtime errors
- **Express.js Framework**: Fast, minimalist web framework for Node.js
- **MongoDB Integration**: NoSQL database with Mongoose ODM for flexible data storage
- **JWT Authentication**: Secure user authentication with JSON Web Tokens and bcrypt password hashing
- **Role-based Authorization**: User and admin role management for secure access control
- **RESTful API Design**: Clean and intuitive API endpoints following REST conventions
- **Layered Architecture**: Separation of concerns with controllers, services, repositories, and models
- **Address Management**: Complete CRUD operations for user address management with preferred address
- **Product Management**: Complete product CRUD with categories, variants, pagination, and admin controls
- **Shopping Cart**: Full-featured cart system with save-for-later functionality
- **Order Management**: Complete order processing with auto-generated order IDs and status tracking
- **User Profile**: User profile management with password change functionality
- **Wishlist**: Add products to wishlist for later purchase
- **Image Upload**: Cloudinary integration for product image storage and management
- **CORS Support**: Cross-Origin Resource Sharing enabled for frontend integration
- **Environment Configuration**: Secure configuration management with dotenv
- **Comprehensive Error Handling**: Custom error classes with proper HTTP status codes
- **Development Ready**: Hot reloading with nodemon for efficient development
- **API Documentation**: Complete REST API documentation with request/response examples

## 📦 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **File Storage**: Cloudinary (Image hosting and management)
- **File Upload**: Multer with Cloudinary storage
- **Tools**: Nodemon, ts-node

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or cloud instance)
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ujjwalprajapati16/Merchly.git
   cd Merchly/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Copy the sample environment file and configure your settings:
   ```bash
   cp .env.sample .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   NODE_ENV=development
   JWT_SECRET=your_super_secret_jwt_key
   CLIENT_URL=http://localhost:3000
   
   # Cloudinary Configuration (for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start MongoDB**
   
   Make sure your MongoDB instance is running on the configured URI.

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
This starts the server with hot reloading using nodemon.

### Production Mode
```bash
# Build the TypeScript code
npm run build

# Start the production server
npm start
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reloading |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm test` | Run tests (currently placeholder) |

## 📝 Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── config.ts          # Environment configuration
│   │   └── cloudinary.ts      # Cloudinary setup and configuration
│   ├── controllers/           # Request handlers
│   │   ├── auth-controller.ts # Authentication endpoints
│   │   ├── address-controller.ts # Address management
│   │   ├── product-controller.ts # Product management
│   │   ├── cart-controller.ts # Shopping cart management
│   │   ├── order-controller.ts # Order processing
│   │   ├── user-controller.ts # User profile management
│   │   └── wishlist-controller.ts # Wishlist management
│   ├── middlewares/           # Custom middleware
│   │   ├── AuthMiddleware.ts  # JWT authentication
│   │   ├── ErrorHandler.ts    # Error handling classes
│   │   ├── JwtHandler.ts      # JWT token generation
│   │   └── isAdmin.ts         # Admin authorization
│   ├── models/                # Database models (Mongoose schemas)
│   │   ├── user-model.ts      # User model
│   │   ├── address-model.ts   # Address model
│   │   ├── product-model.ts   # Product model
│   │   ├── cart-models.ts     # Shopping cart model
│   │   ├── order-models.ts    # Order model with auto-generated orderId
│   │   └── wishlist-model.ts  # Wishlist model
│   ├── repositories/          # Data access layer
│   │   ├── user-repo.ts       # User data operations
│   │   ├── address-repo.ts    # Address data operations
│   │   ├── product-repo.ts    # Product data operations
│   │   ├── cart-repo.ts       # Cart data operations
│   │   ├── order-repo.ts      # Order data operations
│   │   └── wishlist-repo.ts   # Wishlist data operations
│   ├── routes/                # API routes
│   │   ├── auth-routes.ts     # Authentication routes
│   │   ├── address-routes.ts  # Address management routes
│   │   ├── product-routes.ts  # Product management routes
│   │   ├── cart-routes.ts     # Shopping cart routes
│   │   ├── order-routes.ts    # Order management routes
│   │   ├── user-routes.ts     # User profile routes
│   │   └── wishlist-routes.ts # Wishlist routes
│   ├── services/              # Business logic layer
│   │   ├── auth-services.ts   # Authentication business logic
│   │   ├── address-services.ts # Address business logic
│   │   ├── product-services.ts # Product business logic
│   │   ├── cart-services.ts   # Cart business logic
│   │   ├── order-services.ts  # Order business logic
│   │   ├── user-services.ts   # User profile business logic
│   │   └── wishlist-service.ts # Wishlist business logic
│   ├── types/                 # TypeScript type definitions
│   │   ├── User-types.ts      # User-related types
│   │   ├── Address-types.ts   # Address-related types
│   │   ├── Product-types.ts   # Product-related types
│   │   ├── Cart-types.ts      # Cart-related types
│   │   ├── Order-types.ts     # Order-related types
│   │   ├── Wishlist-types.ts  # Wishlist-related types
│   │   └── AuthRequest.ts     # Extended request type
│   ├── utils/
│   │   ├── connectDB.ts       # MongoDB connection utility
│   │   └── multer.ts          # File upload configuration with Cloudinary
│   ├── app.ts                 # Express app configuration
│   └── server.ts              # Server entry point
├── .env.sample                # Environment variables template
├── package.json               # Project dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## 🔧 API Documentation

### Base URL
```
http://localhost:3000
```

### Health Check
- **GET** `/` - Server status check
  ```json
  {
    "message": "Server is running"
  }
  ```

## 🔐 Authentication API
**Base Path**: `/api/v1/auth`

### Register User
**POST** `/api/v1/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "role": "customer" // optional, defaults to "customer"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields
- `409 Conflict` - Email already exists

### Login User
**POST** `/api/v1/auth/login`

Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "customer"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields
- `401 Unauthorized` - Invalid credentials

## 🏠 Address Management API
**Base Path**: `/api/v1/address`

> **Note:** All address endpoints require authentication. Include `Authorization: Bearer <token>` header.

### Add Address
**POST** `/api/v1/address/add`

Add a new address for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "addressLine1": "123 Main Street",
  "addressLine2": "Apartment 4B",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "pincode": "10001",
  "isPreferred": false
}
```

**Response (201):**
```json
{
  "message": "Address added successfully",
  "address": {
    "id": "507f1f77bcf86cd799439012",
    "addressLine1": "123 Main Street",
    "addressLine2": "Apartment 4B",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "pincode": "10001",
    "isPreferred": false,
    "userId": "507f1f77bcf86cd799439011"
  }
}
```

### Get All Addresses
**GET** `/api/v1/address/`

Retrieve all addresses for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Addresses fetched successfully",
  "addresses": [
    {
      "id": "507f1f77bcf86cd799439012",
      "addressLine1": "123 Main Street",
      "addressLine2": "Apartment 4B",
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "pincode": "10001"
    }
  ]
}
```

### Get Address by ID
**GET** `/api/v1/address/:id`

Retrieve a specific address by its ID.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Address fetched successfully",
  "address": {
    "id": "507f1f77bcf86cd799439012",
    "addressLine1": "123 Main Street",
    "addressLine2": "Apartment 4B",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "pincode": "10001"
  }
}
```

### Update Address
**PATCH** `/api/v1/address/:id`

Update an existing address. Only provided fields will be updated.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body (partial update):**
```json
{
  "addressLine2": "Suite 5C",
  "pincode": "10002"
}
```

**Response (200):**
```json
{
  "message": "Address updated successfully",
  "updatedAddress": {
    "id": "507f1f77bcf86cd799439012",
    "addressLine1": "123 Main Street",
    "addressLine2": "Suite 5C",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "pincode": "10002"
  }
}
```

### Delete Address
**DELETE** `/api/v1/address/:id`

Delete an address by its ID.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Address deleted successfully",
  "result": {
    "deletedCount": 1
  }
}
```

### Get Preferred Address
**GET** `/api/v1/address/preferred`

Retrieve the user's preferred address.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Preferred address fetched successfully",
  "address": {
    "id": "507f1f77bcf86cd799439012",
    "addressLine1": "123 Main Street",
    "addressLine2": "Apartment 4B",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "pincode": "10001",
    "isPreferred": true
  }
}
```

### Set Preferred Address
**PATCH** `/api/v1/address/preferred/:id`

Set a specific address as the preferred address (automatically unsets other preferred addresses).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Preferred address set successfully",
  "address": {
    "id": "507f1f77bcf86cd799439012",
    "addressLine1": "123 Main Street",
    "addressLine2": "Apartment 4B",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "pincode": "10001",
    "isPreferred": true
  }
}
```

## 🛍️ Product Management API
**Base Path**: `/api/v1/product`

### Get All Products
**GET** `/api/v1/product/`

Retrieve all products with pagination support.

**Query Parameters:**
- `limit` (optional): Number of products per page (default: 6)
- `page` (optional): Page number (default: 1)

**Example Request:**
```
GET /api/v1/product/?limit=10&page=1
```

**Response (200):**
```json
{
  "message": "Products fetched successfully",
  "page": 1,
  "limit": 10,
  "products": [
    {
      "id": 1,
      "name": "Cool T-Shirt",
      "slug": "cool-t-shirt",
      "price": 29.99,
      "description": "A stylish and comfortable t-shirt",
      "status": "available",
      "category": "clothing",
      "variants": [
        {
          "color": "red",
          "size": "M",
          "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/red-m.jpg"
        },
        {
          "color": "blue",
          "size": "L",
          "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/blue-l.jpg"
        }
      ],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Get Products for Home Page
**GET** `/api/v1/product/products`

Retrieve a list of products curated for the home page.

**Query Parameters:**
- `limit` (optional): Number of products per page (default: 6)
- `page` (optional): Page number (default: 1)

**Response (200):**
```json
{
  "message": "Products fetched successfully",
  "page": 1,
  "limit": 6,
  "products": [
    {
      "id": 1,
      "name": "Cool T-Shirt",
      "slug": "cool-t-shirt",
      "price": 29.99,
      "description": "A stylish and comfortable t-shirt",
      "status": "available",
      "category": "clothing",
      "variants": [
        {
          "color": "red",
          "size": "M",
          "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/red-m.jpg"
        }
      ],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Get Product by Slug
**GET** `/api/v1/product/:slug`

Retrieve a specific product by its slug.

**Example Request:**
```
GET /api/v1/product/cool-t-shirt
```

**Response (200):**
```json
{
  "message": "Product fetched successfully",
  "product": {
    "id": 1,
    "name": "Cool T-Shirt",
    "slug": "cool-t-shirt",
    "price": 29.99,
    "description": "A stylish and comfortable t-shirt",
    "status": "available",
    "category": "clothing",
    "variants": [
      {
        "color": "red",
        "size": "M",
        "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/red-m.jpg"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Get All Categories
**GET** `/api/v1/product/categories`

Retrieve all available product categories.

**Response (200):**
```json
{
  "message": "Categories fetched successfully",
  "count": 3,
  "categories": [
    "clothing",
    "accessories",
    "electronics"
  ]
}
```

### Get Products by Category
**GET** `/api/v1/product/categories/:category`

Retrieve products filtered by category with pagination support.

**Query Parameters:**
- `limit` (optional): Number of products per page (default: 10)
- `page` (optional): Page number (default: 1)

**Example Request:**
```
GET /api/v1/product/categories/clothing?limit=5&page=1
```

**Response (200):**
```json
{
  "message": "Products in category \"clothing\" fetched successfully",
  "category": "clothing",
  "page": 1,
  "limit": 5,
  "count": 3,
  "products": [
    {
      "id": 1,
      "name": "Cool T-Shirt",
      "slug": "cool-t-shirt",
      "price": 29.99,
      "description": "A stylish and comfortable t-shirt",
      "status": "available",
      "category": "clothing",
      "variants": [
        {
          "color": "red",
          "size": "M",
          "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/red-m.jpg"
        }
      ],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Add Product with Images (Admin Only)
**POST** `/api/v1/product/add`

Add a new product with image upload. Requires admin privileges.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Form Data:**
- `name`: Product name (string)
- `price`: Product price (number)
- `description`: Product description (string)
- `category`: Product category (string)
- `variants`: JSON string of variants array
- `images`: Multiple image files (up to 10 files)

**Example Form Data:**
```
name: "Cool T-Shirt"
price: 29.99
description: "A stylish and comfortable t-shirt"
category: "clothing"
variants: '[{"color":"red","size":"M"},{"color":"blue","size":"L"}]'
images: [file1.jpg, file2.jpg]
```

**Response (201):**
```json
{
  "message": "Product added successfully",
  "product": {
    "id": 1,
    "name": "Cool T-Shirt",
    "slug": "cool-t-shirt",
    "price": 29.99,
    "description": "A stylish and comfortable t-shirt",
    "status": "available",
    "category": "clothing",
    "variants": [
      {
        "color": "red",
        "size": "M",
        "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/image1.jpg"
      },
      {
        "color": "blue",
        "size": "L",
        "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/image2.jpg"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Update Product (Admin Only)
**PUT** `/api/v1/product/update/:id`

Update an existing product. Supports partial updates and image replacement.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

**Form Data (all optional):**
- `name`: Updated product name
- `price`: Updated product price
- `description`: Updated product description
- `category`: Updated product category
- `variants`: JSON string of updated variants array
- `images`: New image files (will replace existing images if provided)

**Response (200):**
```json
{
  "message": "Product updated successfully",
  "product": {
    "id": 1,
    "name": "Updated Cool T-Shirt",
    "slug": "cool-t-shirt",
    "price": 34.99,
    "description": "An updated stylish and comfortable t-shirt",
    "status": "available",
    "category": "clothing",
    "variants": [
      {
        "color": "red",
        "size": "M",
        "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/updated-image.jpg"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-16T14:20:00Z"
  }
}
```

### Delete Product (Admin Only)
**DELETE** `/api/v1/product/delete/:id`

Delete a product by its ID.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Product deleted successfully",
  "product": {
    "id": 1,
    "name": "Cool T-Shirt",
    "slug": "cool-t-shirt"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields or invalid data
- `401 Unauthorized` - Invalid or missing token
- `403 Forbidden` - Admin access required
- `404 Not Found` - Product not found

## 🛒 Shopping Cart API
**Base Path**: `/api/v1/cart`

> **Note:** All cart endpoints require authentication. Include `Authorization: Bearer <token>` header.

### Get Cart
**GET** `/api/v1/cart/`

Retrieve the current user's shopping cart.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Cart fetched successfully",
  "cart": {
    "_id": "507f1f77bcf86cd799439013",
    "user": "507f1f77bcf86cd799439011",
    "items": [
      {
        "_id": "507f1f77bcf86cd799439014",
        "product": {
          "_id": "507f1f77bcf86cd799439015",
          "name": "Cool T-Shirt",
          "price": 29.99
        },
        "variant": {
          "color": "red",
          "size": "M",
          "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/red-m.jpg"
        },
        "quantity": 2,
        "subtotal": 59.98
      }
    ],
    "total": 59.98,
    "savedForLater": [],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T12:45:00Z"
  }
}
```

### Add to Cart
**POST** `/api/v1/cart/items`

Add a product to the shopping cart.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439015",
  "variant": {
    "color": "red",
    "size": "M",
    "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/red-m.jpg"
  },
  "quantity": 1
}
```

**Response (200):**
```json
{
  "message": "Product added to cart successfully",
  "cart": {
    "_id": "507f1f77bcf86cd799439013",
    "user": "507f1f77bcf86cd799439011",
    "items": [
      {
        "_id": "507f1f77bcf86cd799439014",
        "product": "507f1f77bcf86cd799439015",
        "variant": {
          "color": "red",
          "size": "M",
          "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/red-m.jpg"
        },
        "quantity": 1,
        "subtotal": 29.99
      }
    ],
    "total": 29.99,
    "savedForLater": []
  }
}
```

### Update Quantity
**PUT** `/api/v1/cart/items/:itemId`

Update the quantity of a cart item.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response (200):**
```json
{
  "message": "Cart updated successfully",
  "cart": {
    "_id": "507f1f77bcf86cd799439013",
    "items": [
      {
        "_id": "507f1f77bcf86cd799439014",
        "quantity": 3,
        "subtotal": 89.97
      }
    ],
    "total": 89.97
  }
}
```

### Remove from Cart
**DELETE** `/api/v1/cart/items/:itemId`

Remove a specific item from the cart.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Product removed from cart successfully",
  "cart": {
    "_id": "507f1f77bcf86cd799439013",
    "items": [],
    "total": 0,
    "savedForLater": []
  }
}
```

### Clear Cart
**DELETE** `/api/v1/cart/`

Remove all items from the cart.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Cart cleared successfully",
  "cart": {
    "_id": "507f1f77bcf86cd799439013",
    "items": [],
    "total": 0,
    "savedForLater": []
  }
}
```

### Save for Later
**POST** `/api/v1/cart/items/:itemId/save`

Move an item from cart to "Save for Later" list.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Product saved for later successfully",
  "cart": {
    "_id": "507f1f77bcf86cd799439013",
    "items": [],
    "total": 0,
    "savedForLater": [
      {
        "_id": "507f1f77bcf86cd799439014",
        "product": "507f1f77bcf86cd799439015",
        "variant": {
          "color": "red",
          "size": "M",
          "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/red-m.jpg"
        },
        "quantity": 1,
        "subtotal": 29.99
      }
    ]
  }
}
```

### Move to Cart
**POST** `/api/v1/cart/items/:itemId/save/move`

Move an item from "Save for Later" back to cart.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Product moved back to cart successfully",
  "cart": {
    "_id": "507f1f77bcf86cd799439013",
    "items": [
      {
        "_id": "507f1f77bcf86cd799439014",
        "product": "507f1f77bcf86cd799439015",
        "variant": {
          "color": "red",
          "size": "M",
          "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/red-m.jpg"
        },
        "quantity": 1,
        "subtotal": 29.99
      }
    ],
    "total": 29.99,
    "savedForLater": []
  }
}
```

### Checkout Cart
**POST** `/api/v1/cart/checkout`

Create an order from the current cart items.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (201):**
```json
{
  "message": "Order placed successfully from cart",
  "order": {
    "_id": "507f1f77bcf86cd799439020",
    "orderId": "ORD-20240115-143000-XY4Z",
    "userId": "507f1f77bcf86cd799439011",
    "products": [
      {
        "productId": "507f1f77bcf86cd799439015",
        "color": "red",
        "size": "M",
        "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/red-m.jpg",
        "quantity": 1,
        "price": 29.99,
        "subtotal": 29.99
      }
    ],
    "total": 29.99,
    "status": "received",
    "payment_status": "pending",
    "address": {
      "addressLine1": "123 Main Street",
      "addressLine2": "Apartment 4B",
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "pincode": "10001"
    },
    "createdAt": "2024-01-15T14:30:00Z",
    "updatedAt": "2024-01-15T14:30:00Z"
  }
}
```

## 📦 Order Management API
**Base Path**: `/api/v1/order`

> **Note:** All order endpoints require authentication. Include `Authorization: Bearer <token>` header.

### Buy Now
**POST** `/api/v1/order/buy-now`

Create an order directly without adding to cart (quick purchase).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439015",
  "quantity": 1,
  "color": "red",
  "size": "M"
}
```

**Response (201):**
```json
{
  "message": "Order placed successfully via Buy Now",
  "order": {
    "_id": "507f1f77bcf86cd799439021",
    "orderId": "ORD-20240115-150000-AB5C",
    "userId": "507f1f77bcf86cd799439011",
    "products": [
      {
        "productId": "507f1f77bcf86cd799439015",
        "color": "red",
        "size": "M",
        "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/red-m.jpg",
        "quantity": 1,
        "price": 29.99,
        "subtotal": 29.99
      }
    ],
    "total": 29.99,
    "status": "received",
    "payment_status": "pending",
    "address": {
      "addressLine1": "123 Main Street",
      "addressLine2": "Apartment 4B",
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "pincode": "10001"
    },
    "createdAt": "2024-01-15T15:00:00Z",
    "updatedAt": "2024-01-15T15:00:00Z"
  }
}
```

### Get User Orders
**GET** `/api/v1/order/`

Retrieve all orders for the authenticated user with pagination.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of orders per page (default: 10)

**Example Request:**
```
GET /api/v1/order/?page=1&limit=10
```

**Response (200):**
```json
{
  "message": "User orders fetched successfully",
  "currentPage": 1,
  "totalPages": 3,
  "totalOrders": 25,
  "results": 10,
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439021",
      "orderId": "ORD-20240110-100000-CD6D",
      "userId": "507f1f77bcf86cd799439011",
      "products": [
        {
          "productId": "507f1f77bcf86cd799439015",
          "color": "red",
          "size": "M",
          "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/red-m.jpg",
          "quantity": 1,
          "price": 29.99,
          "subtotal": 29.99
        }
      ],
      "total": 29.99,
      "status": "delivered",
      "payment_status": "success",
      "address": {
        "addressLine1": "123 Main Street",
        "addressLine2": "Apartment 4B",
        "city": "New York",
        "state": "NY",
        "country": "USA",
        "pincode": "10001"
      },
      "createdAt": "2024-01-10T10:00:00Z",
      "updatedAt": "2024-01-15T16:30:00Z"
    }
  ]
}
```

### Get Order by ID
**GET** `/api/v1/order/:orderId`

Retrieve details of a specific order.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Order fetched successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439021",
    "orderId": "ORD-20240115-150000-AB5C",
    "userId": "507f1f77bcf86cd799439011",
    "products": [
      {
        "productId": "507f1f77bcf86cd799439015",
        "color": "red",
        "size": "M",
        "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/red-m.jpg",
        "quantity": 1,
        "price": 29.99,
        "subtotal": 29.99
      }
    ],
    "total": 29.99,
    "status": "shipped",
    "payment_status": "success",
    "paymentId": "pay_1234567890",
    "address": {
      "addressLine1": "123 Main Street",
      "addressLine2": "Apartment 4B",
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "pincode": "10001"
    },
    "createdAt": "2024-01-15T15:00:00Z",
    "updatedAt": "2024-01-16T10:00:00Z"
  }
}
```

### Cancel Order
**PATCH** `/api/v1/order/:orderId/cancel`

Cancel an existing order (user can only cancel their own orders).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Order cancelled successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439021",
    "orderId": "ORD-20240115-150000-AB5C",
    "status": "cancelled",
    "updatedAt": "2024-01-16T14:20:00Z"
  }
}
```

### Update Payment Status
**PATCH** `/api/v1/order/:orderId/payment`

Update the payment status of an order (to be integrated with payment gateway).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Note:** This endpoint is currently a placeholder for payment gateway integration.

**Response (200):**
```json
{
  "message": "Payment status updated successfully"
}
```

### Get All Orders (Admin Only)
**GET** `/api/v1/order/admin/all`

Retrieve all orders in the system with pagination (admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of orders per page (default: 10)

**Example Request:**
```
GET /api/v1/order/admin/all?page=1&limit=20
```

**Response (200):**
```json
{
  "message": "All orders fetched successfully",
  "currentPage": 1,
  "totalPages": 5,
  "totalOrders": 100,
  "results": 20,
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439021",
      "orderId": "ORD-20240110-100000-CD6D",
      "userId": "507f1f77bcf86cd799439011",
      "products": [
        {
          "productId": "507f1f77bcf86cd799439015",
          "color": "red",
          "size": "M",
          "image": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/products/variants/red-m.jpg",
          "quantity": 1,
          "price": 29.99,
          "subtotal": 29.99
        }
      ],
      "total": 29.99,
      "status": "delivered",
      "payment_status": "success",
      "address": {
        "addressLine1": "123 Main Street",
        "addressLine2": "Apartment 4B",
        "city": "New York",
        "state": "NY",
        "country": "USA",
        "pincode": "10001"
      },
      "createdAt": "2024-01-10T10:00:00Z",
      "updatedAt": "2024-01-15T16:30:00Z"
    }
  ]
}
```

### Update Order Status (Admin Only)
**PATCH** `/api/v1/order/:orderId/status`

Update the status of an order (admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "shipped"
}
```

**Valid Status Values:**
- `received` - Order has been received
- `out_for_delivery` - Order is out for delivery
- `shipped` - Order has been shipped
- `delivered` - Order has been delivered
- `cancelled` - Order has been cancelled

**Response (200):**
```json
{
  "message": "Order status updated successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439021",
    "orderId": "ORD-20240115-150000-AB5C",
    "userId": "507f1f77bcf86cd799439011",
    "status": "shipped",
    "updatedAt": "2024-01-16T10:00:00Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Invalid status or missing fields
- `401 Unauthorized` - Invalid or missing token
- `403 Forbidden` - Admin access required
- `404 Not Found` - Order not found

## 👤 User Profile API
**Base Path**: `/api/v1/user`

> **Note:** All user endpoints require authentication. Include `Authorization: Bearer <token>` header.

### Get User Profile
**GET** `/api/v1/user/profile`

Retrieve the authenticated user's profile information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "User profile fetched successfully",
  "profile": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "customer",
    "createdAt": "2024-01-10T10:00:00Z",
    "updatedAt": "2024-01-15T14:30:00Z"
  }
}
```

### Update User Profile
**PATCH** `/api/v1/user/update`

Update the authenticated user's profile information.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Updated Doe",
  "email": "john.updated@example.com"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully!",
  "profile": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Updated Doe",
    "email": "john.updated@example.com",
    "role": "customer",
    "updatedAt": "2024-01-16T10:30:00Z"
  }
}
```

### Change Password
**PATCH** `/api/v1/user/change-password`

Change the authenticated user's password.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword456"
}
```

**Response (200):**
```json
{
  "message": "Password changed successfully!"
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields
- `401 Unauthorized` - Invalid current password or missing token

### Get All Users (Admin Only)
**GET** `/api/v1/user/`

Retrieve all users in the system with their preferred address (admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Users fetched successfully",
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "customer",
      "preferredAddress": {
        "_id": "507f1f77bcf86cd799439012",
        "addressLine1": "123 Main Street",
        "city": "New York",
        "state": "NY",
        "country": "USA",
        "pincode": "10001"
      },
      "createdAt": "2024-01-10T10:00:00Z"
    }
  ]
}
```

### Delete User (Admin Only)
**DELETE** `/api/v1/user/:id`

Delete a user from the system (admin only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "User deleted successfully!"
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid or missing token
- `403 Forbidden` - Admin access required
- `404 Not Found` - User not found

## ❤️ Wishlist API
**Base Path**: `/api/v1/wishlist`

> **Note:** All wishlist endpoints require authentication. Include `Authorization: Bearer <token>` header.

### Get Wishlist
**GET** `/api/v1/wishlist/`

Retrieve the authenticated user's wishlist.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Wishlist fetched",
  "wishlist": {
    "_id": "507f1f77bcf86cd799439030",
    "user": "507f1f77bcf86cd799439011",
    "items": [
      {
        "_id": "507f1f77bcf86cd799439031",
        "productId": "507f1f77bcf86cd799439015",
        "addedAt": "2024-01-15T10:30:00Z"
      },
      {
        "_id": "507f1f77bcf86cd799439032",
        "productId": "507f1f77bcf86cd799439016",
        "addedAt": "2024-01-16T12:00:00Z"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-16T12:00:00Z"
  }
}
```

### Add to Wishlist
**POST** `/api/v1/wishlist/add`

Add a product to the user's wishlist.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439015"
}
```

**Response (200):**
```json
{
  "message": "Product added to wishlist",
  "wishlist": {
    "_id": "507f1f77bcf86cd799439030",
    "user": "507f1f77bcf86cd799439011",
    "items": [
      {
        "_id": "507f1f77bcf86cd799439031",
        "productId": "507f1f77bcf86cd799439015",
        "addedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Remove from Wishlist
**DELETE** `/api/v1/wishlist/remove/:itemId`

Remove a product from the user's wishlist.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Product removed from wishlist",
  "wishlist": {
    "_id": "507f1f77bcf86cd799439030",
    "user": "507f1f77bcf86cd799439011",
    "items": [],
    "updatedAt": "2024-01-16T14:20:00Z"
  }
}
```

### Remove from Wishlist by Product ID
**DELETE** `/api/v1/wishlist/remove`

Remove a product from the wishlist using the product ID as a query parameter.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `productId`: The ID of the product to remove.

**Example Request:**
```
DELETE /api/v1/wishlist/remove?productId=507f1f77bcf86cd799439015
```

**Response (200):**
```json
{
  "message": "Product removed from wishlist",
  "wishlist": {
    "_id": "507f1f77bcf86cd799439030",
    "user": "507f1f77bcf86cd799439011",
    "items": [],
    "updatedAt": "2024-01-16T14:20:00Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing productId or itemId
- `401 Unauthorized` - Invalid or missing token
- `404 Not Found` - Wishlist or item not found

## 🔒 Authentication & Authorization

### JWT Token Usage
All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Token Expiration
- JWT tokens expire after 7 days
- Include refresh mechanism in your client application

### User Roles
- **user**: Regular customer (default role)
- **admin**: Administrator with product management privileges

### Protected Routes Summary
| Endpoint | Authentication | Authorization |
|----------|---------------|---------------|
| **Authentication** |
| `POST /api/v1/auth/register` | ❌ | ❌ |
| `POST /api/v1/auth/login` | ❌ | ❌ |
| **Products** |
| `GET /api/v1/product/` | ❌ | ❌ |
| `GET /api/v1/product/:slug` | ❌ | ❌ |
| `GET /api/v1/product/categories` | ❌ | ❌ |
| `GET /api/v1/product/categories/:category` | ❌ | ❌ |
| `POST /api/v1/product/add` | ✅ | Admin only |
| `PUT /api/v1/product/update/:id` | ✅ | Admin only |
| `DELETE /api/v1/product/delete/:id` | ✅ | Admin only |
| **Address** |
| All `/api/v1/address/*` | ✅ | User/Admin |
| **Shopping Cart** |
| All `/api/v1/cart/*` | ✅ | User/Admin |
| **Orders** |
| `POST /api/v1/order/buy-now` | ✅ | User/Admin |
| `GET /api/v1/order/` | ✅ | User/Admin |
| `GET /api/v1/order/:orderId` | ✅ | User/Admin |
| `PATCH /api/v1/order/:orderId/cancel` | ✅ | User/Admin |
| `PATCH /api/v1/order/:orderId/payment` | ✅ | User/Admin |
| `GET /api/v1/order/admin/all` | ✅ | Admin only |
| `PATCH /api/v1/order/:orderId/status` | ✅ | Admin only |
| **User Profile** |
| `GET /api/v1/user/profile` | ✅ | User/Admin |
| `PATCH /api/v1/user/update` | ✅ | User/Admin |
| `PATCH /api/v1/user/change-password` | ✅ | User/Admin |
| `GET /api/v1/user/` | ✅ | Admin only |
| `DELETE /api/v1/user/:id` | ✅ | Admin only |
| **Wishlist** |
| `GET /api/v1/wishlist/` | ✅ | User/Admin |
| `POST /api/v1/wishlist/add` | ✅ | User/Admin |
| `DELETE /api/v1/wishlist/remove/:itemId` | ✅ | User/Admin |

## 🗄️ Database

The application uses MongoDB as its primary database. The connection is managed through the `connectDB` utility which:

- Establishes connection to MongoDB using the configured URI
- Implements connection reuse for efficiency
- Provides error handling and logging
- Gracefully handles connection failures

## 🛡️ Error Handling

The server implements comprehensive error handling with custom error classes:

- **APIError**: Base error class for API-related errors
- **BadRequest (400)**: For client-side request errors
- **Unauthorized (401)**: For authentication failures
- **Forbidden (403)**: For authorization issues
- **NotFound (404)**: For resource not found errors

Development environment provides detailed error information, while production environment sanitizes error details for security.

## 🔒 Security Features

- **CORS Configuration**: Properly configured for cross-origin requests
- **Environment Variables**: Sensitive data stored in environment variables
- **JWT Ready**: JWT secret configuration for authentication
- **Error Sanitization**: Different error details for development vs production

## 😧 Current Development Status

### Completed ✅
- **Backend Architecture**: Clean layered architecture with controllers, services, repositories, and models
- **Express.js Server**: Fully configured with TypeScript support
- **Database Integration**: MongoDB with Mongoose ODM for data modeling
- **Authentication System**: Complete JWT-based authentication with bcrypt password hashing
  - User registration and login endpoints
  - JWT token generation and validation middleware
  - Role-based authorization (user/admin)
- **Address Management**: Full CRUD operations for user addresses
  - Add, view, update, and delete addresses
  - Preferred address functionality
  - User-specific address management with authentication
- **Product Management**: Complete product operations
  - Product listing with pagination
  - Product retrieval by slug
  - Category-based filtering
  - Admin-only product CRUD with variants support
  - Cloudinary image upload for product variants
- **Shopping Cart**: Full-featured cart system
  - Add, update, and remove items
  - Save for later functionality
  - Move items between cart and saved list
  - Cart checkout to create orders
  - Automatic subtotal and total calculation
- **Order Management**: Complete order processing system
  - Auto-generated unique order IDs (ORD-YYYYMMDD-HHMMSS-XXXX format)
  - Buy now (direct purchase) functionality
  - Order history with pagination
  - Order status tracking (received, shipped, delivered, cancelled)
  - Payment status tracking (pending, success, failed)
  - User order cancellation
  - Admin order management with status updates
- **User Profile Management**: Complete user profile operations
  - View and update profile information
  - Change password functionality
  - Admin user management with user listing and deletion
- **Wishlist**: Wishlist functionality
  - Add products to wishlist
  - View wishlist items
  - Remove items from wishlist
- **Security Features**: 
  - CORS configuration for cross-origin requests
  - Environment-based configuration management
  - Comprehensive error handling with custom error classes
  - Authentication and authorization middleware
- **API Documentation**: Complete REST API documentation with examples

### In Progress 🔄
- **Payment Integration**:
  - Payment gateway integration (Stripe/PayPal/Razorpay)
  - Payment status webhook handling
- **Enhanced Features**:
  - Input validation middleware
  - Rate limiting implementation
  - Product stock/inventory management

### Planned 📝
- **User Features**:
  - Password reset functionality (forgot password)
  - Email verification system
  - Email notifications for orders
  - Two-factor authentication (2FA)
- **Admin Features**:
  - Admin dashboard APIs
  - User management endpoints
  - Sales analytics and reporting
  - Product analytics
  - Inventory management dashboard
- **Advanced Features**:
  - Advanced search and filtering system
  - Product reviews and ratings
  - Real-time order tracking
  - Coupon and discount system
  - Notification system (email/SMS)
  - Product recommendations
- **DevOps & Quality**:
  - Comprehensive testing suite (Jest/Supertest)
  - API documentation with Swagger/OpenAPI
  - Docker containerization
  - CI/CD pipeline setup
  - Performance monitoring and logging
  - Database indexing optimization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Ujjwal Prajapati**
- GitHub: [@Ujjwalprajapati16](https://github.com/Ujjwalprajapati16)

## 🐛 Issues & Support

If you encounter any issues or have questions, please file an issue on the [GitHub Issues](https://github.com/Ujjwalprajapati16/Merchly/issues) page.

---

⭐ **Don't forget to star this repository if you found it helpful!**