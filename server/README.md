# Merchly Server 🛍️

> A modern and dynamic e-commerce platform backend built for selling high-quality merchandise with style and simplicity.

Merchly Server is the backend API for the Merchly e-commerce platform, designed with a focus on user experience, scalability, and performance. Built with TypeScript and Express.js, it provides a robust foundation for managing products, users, and transactions.

## 🚀 Features

- **Modern TypeScript**: Fully typed codebase for better development experience and fewer runtime errors
- **Express.js Framework**: Fast, minimalist web framework for Node.js
- **MongoDB Integration**: NoSQL database for flexible data storage
- **CORS Support**: Cross-Origin Resource Sharing enabled for frontend integration
- **Environment Configuration**: Secure configuration management with dotenv
- **Error Handling**: Comprehensive error handling with custom error classes
- **Development Ready**: Hot reloading with nodemon for efficient development

## 📦 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
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

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── config.ts          # Environment configuration
│   ├── middlewares/
│   │   └── ErrorHandler.ts    # Custom error handling
│   ├── routes/
│   │   └── auth-route.ts      # Authentication routes
│   ├── types/
│   │   └── User.ts            # TypeScript type definitions
│   ├── utils/
│   │   └── connectDB.ts       # MongoDB connection utility
│   ├── app.ts                 # Express app configuration
│   └── server.ts              # Server entry point
├── .env.sample                # Environment variables template
├── package.json               # Project dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## 🔧 API Endpoints

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

### Authentication Routes
- **Base Path**: `/api/v1/auth`
- Authentication endpoints are currently set up but not yet implemented

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

## 🚧 Current Development Status

### Completed ✅
- Basic Express.js server setup
- TypeScript configuration
- MongoDB connection utility
- Environment configuration management
- Error handling middleware and custom error classes
- CORS setup for frontend integration
- Basic project structure and routing setup
- User type definitions

### In Progress 🔄
- Authentication system implementation
- User registration and login endpoints

### Planned 📝
- Product management endpoints
- Order processing system
- Payment integration
- User profile management
- Admin dashboard APIs
- File upload handling
- Rate limiting and security middleware
- Testing suite implementation
- API documentation with Swagger

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