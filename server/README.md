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
- **Address Management**: Complete CRUD operations for user address management
- **Product Management**: Product catalog with variants, pagination, and admin controls
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
│   │   └── config.ts          # Environment configuration
│   ├── controllers/           # Request handlers
│   │   ├── auth-controller.ts # Authentication endpoints
│   │   ├── address-controller.ts # Address management
│   │   └── product-controller.ts # Product management
│   ├── middlewares/           # Custom middleware
│   │   ├── AuthMiddleware.ts  # JWT authentication
│   │   ├── ErrorHandler.ts    # Error handling classes
│   │   ├── JwtHandler.ts      # JWT token generation
│   │   └── isAdmin.ts         # Admin authorization
│   ├── models/                # Database models (Mongoose schemas)
│   │   ├── user-model.ts      # User model
│   │   ├── address-model.ts   # Address model
│   │   └── product-model.ts   # Product model
│   ├── repositories/          # Data access layer
│   │   ├── user-repo.ts       # User data operations
│   │   ├── address-repo.ts    # Address data operations
│   │   └── product-repo.ts    # Product data operations
│   ├── routes/                # API routes
│   │   ├── auth-routes.ts     # Authentication routes
│   │   ├── address-routes.ts  # Address management routes
│   │   └── product-routes.ts  # Product management routes
│   ├── services/              # Business logic layer
│   │   ├── auth-services.ts   # Authentication business logic
│   │   ├── address-services.ts # Address business logic
│   │   └── product-services.ts # Product business logic
│   ├── types/                 # TypeScript type definitions
│   │   ├── User-types.ts      # User-related types
│   │   ├── Address-types.ts   # Address-related types
│   │   ├── Product-types.ts   # Product-related types
│   │   └── AuthRequest.ts     # Extended request type
│   ├── utils/
│   │   └── connectDB.ts       # MongoDB connection utility
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
  "role": "user" // optional, defaults to "user"
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
    "role": "user"
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
  "addressLine2": "Apartment 4B", // optional
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "pincode": "10001"
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
      "status": "active",
      "variants": [
        {
          "color": "red",
          "size": "M",
          "image": "https://example.com/red-m.jpg"
        },
        {
          "color": "blue",
          "size": "L",
          "image": "https://example.com/blue-l.jpg"
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
    "status": "active",
    "variants": [
      {
        "color": "red",
        "size": "M",
        "image": "https://example.com/red-m.jpg"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Add Product (Admin Only)
**POST** `/api/v1/product/add`

Add a new product. Requires admin privileges.

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Cool T-Shirt",
  "price": 29.99,
  "description": "A stylish and comfortable t-shirt",
  "variants": [
    {
      "color": "red",
      "size": "M",
      "image": "https://example.com/red-m.jpg"
    },
    {
      "color": "blue",
      "size": "L",
      "image": "https://example.com/blue-l.jpg"
    }
  ]
}
```

**Response (200):**
```json
{
  "message": "Product added successfully",
  "product": {
    "id": 1,
    "name": "Cool T-Shirt",
    "slug": "cool-t-shirt",
    "price": 29.99,
    "description": "A stylish and comfortable t-shirt",
    "status": "active",
    "variants": [
      {
        "color": "red",
        "size": "M",
        "image": "https://example.com/red-m.jpg"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields
- `401 Unauthorized` - Invalid or missing token
- `403 Forbidden` - Admin access required

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
| `POST /api/v1/auth/register` | ❌ | ❌ |
| `POST /api/v1/auth/login` | ❌ | ❌ |
| `GET /api/v1/product/` | ❌ | ❌ |
| `GET /api/v1/product/:slug` | ❌ | ❌ |
| `POST /api/v1/product/add` | ✅ | Admin only |
| All `/api/v1/address/*` | ✅ | User/Admin |

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
  - User-specific address management with authentication
- **Product Management**: Core product operations
  - Product listing with pagination
  - Product retrieval by slug
  - Admin-only product creation with variants support
- **Security Features**: 
  - CORS configuration for cross-origin requests
  - Environment-based configuration management
  - Comprehensive error handling with custom error classes
  - Authentication and authorization middleware
- **API Documentation**: Complete REST API documentation with examples

### In Progress 🔄
- **Product Management**: 
  - Get single product by slug implementation (controller exists but not fully implemented)
  - Product update and delete operations
  - Product image upload functionality
- **Enhanced Features**:
  - Input validation middleware
  - Rate limiting implementation

### Planned 📝
- **E-commerce Core**:
  - Shopping cart management
  - Order processing system
  - Payment gateway integration (Stripe/PayPal)
  - Inventory management
- **User Features**:
  - User profile management
  - Password reset functionality
  - Email verification system
  - Order history and tracking
- **Admin Features**:
  - Admin dashboard APIs
  - User management endpoints
  - Sales analytics and reporting
  - Product analytics
- **Advanced Features**:
  - Search and filtering system
  - Product reviews and ratings
  - Wishlist functionality
  - Notification system
  - File upload handling for product images
- **DevOps & Quality**:
  - Testing suite implementation (Jest/Supertest)
  - API documentation with Swagger/OpenAPI
  - Docker containerization
  - CI/CD pipeline setup
  - Performance monitoring and logging

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