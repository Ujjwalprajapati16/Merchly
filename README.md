# Merchly

![Merchly Banner](./web/public/logo-dark.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Ujjwalprajapati16/Merchly/ci.yml?branch=main)](https://github.com/Ujjwalprajapati16/Merchly/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)

**Merchly** is a modern, dynamic, and scalable e-commerce platform designed to provide a seamless shopping experience for high-quality merchandise. Built with the latest web technologies, Merchly offers a robust solution for store owners and a delightful interface for customers.

---

## 🚀 Key Features

*   **🎨 Modern Storefront**: A visually stunning and responsive UI built with **Next.js 16** and **Tailwind CSS v4**.
*   **🛒 Advanced Cart & Checkout**: Seamless shopping experience with dynamic cart management and secure checkout flows.
*   **👤 User Accounts**: Secure authentication and profile management (Order history, Wishlist, Address book).
*   **🔍 Smart Search & Filtering**: Find products instantly with advanced filtering and search capabilities.
*   **📦 Admin Dashboard**: Comprehensive tools for managing products, inventory, orders, and customers.
*   **⚡ High Performance**: Optimized for speed with server-side rendering (SSR) and static site generation (SSG).
*   **🔒 Secure**: Built with security best practices, including JWT authentication and secure payment integration.

---

## 🛠️ Tech Stack

Merchly is built using a modern full-stack architecture:

### **Frontend (Web)**
*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Shadcn/UI](https://ui.shadcn.com/)
*   **State Management**: [React Query](https://tanstack.com/query/latest)
*   **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)

### **Backend (Server)**
*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js 5](https://expressjs.com/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
*   **Authentication**: JWT (JSON Web Tokens)
*   **File Storage**: [Cloudinary](https://cloudinary.com/)

### **DevOps & Tools**
*   **Monorepo Management**: NPM Workspaces
*   **Linting & Formatting**: ESLint, Prettier
*   **Version Control**: Git & GitHub

---

## 📂 Project Structure

Merchly follows a monorepo structure:

```plaintext
Merchly/
├── web/                 # Next.js Frontend Application
│   ├── src/
│   │   ├── app/         # App Router pages and layouts
│   │   ├── components/  # Reusable UI components
│   │   ├── lib/         # Utilities and helpers
│   │   └── hooks/       # Custom React hooks
│   └── public/          # Static assets
│
├── server/              # Express Backend Application
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # API route definitions
│   │   └── middlewares/ # Custom middlewares
│   └── dist/            # Compiled JavaScript
│
└── package.json         # Root package file
```

---

## 🏗️ System Architecture

High-level overview of how the Client, Server, and Database interact.

```mermaid
graph TD
    subgraph Client Side
        UserBrowser[User Browser / Next.js Client]
        AdminBrowser[Admin Browser / Next.js Admin]
    end

    subgraph Server Side
        APIGateway[Express.js Server / API Gateway]
        AuthService[Auth Service]
        ProductService[Product Service]
        OrderService[Order Service]
    end

    subgraph Database & Storage
        MongoDB[(MongoDB Database)]
        Cloudinary[Cloudinary Image Store]
    end

    UserBrowser -- HTTP/REST --> APIGateway
    AdminBrowser -- HTTP/REST --> APIGateway
    
    APIGateway --> AuthService
    APIGateway --> ProductService
    APIGateway --> OrderService

    AuthService -- Read/Write --> MongoDB
    ProductService -- Read/Write --> MongoDB
    OrderService -- Read/Write --> MongoDB

    ProductService -- Upload/Fetch --> Cloudinary
```

---

## 🗄️ Database Schema (ERD)

Visual representation of the MongoDB data models and their relationships.

```mermaid
erDiagram
    %% User Relationships
    USER ||--o{ ADDRESS : "manages"
    USER ||--|| CART : "owns active"
    USER ||--|| WISHLIST : "owns"
    USER ||--o{ ORDER : "places"

    %% Cart Relationships
    CART ||--o{ CART_ITEM : "contains"
    CART_ITEM }o--|| PRODUCT : "references"

    %% Wishlist Relationships
    WISHLIST ||--o{ WISHLIST_ITEM : "contains"
    WISHLIST_ITEM }o--|| PRODUCT : "references"

    %% Order Relationships
    ORDER ||--o{ ORDER_PRODUCT : "contains"
    ORDER_PRODUCT }o--|| PRODUCT : "references (historical)"

    %% Product Relationships
    PRODUCT ||--o{ VARIANT : "has variants"

    USER {
        ObjectId _id PK
        string name
        string email
        string password
        string role "customer, admin"
        date createdAt
        date updatedAt
    }

    ADDRESS {
        ObjectId _id PK
        ObjectId userId FK
        string addressLine1
        string addressLine2
        string city
        string state
        string country
        string pincode
        boolean isPreferred
    }

    PRODUCT {
        ObjectId _id PK
        string name
        number price
        string slug
        string description
        string category
        string status "available, unavailable"
        date createdAt
        date updatedAt
    }

    VARIANT {
        string color
        string size
        string image
    }

    CART {
        ObjectId _id PK
        ObjectId userId FK
        number total
        date createdAt
        date updatedAt
    }

    CART_ITEM {
        ObjectId productId FK
        int quantity
        number subtotal
        object variant
    }

    WISHLIST {
        ObjectId _id PK
        ObjectId userId FK
        date createdAt
        date updatedAt
    }

    WISHLIST_ITEM {
        ObjectId productId FK
        date addedAt
    }

    ORDER {
        ObjectId _id PK
        ObjectId userId FK
        string orderId
        string status "received, shipped, etc"
        string payment_status "pending, success, failed"
        string paymentId
        object address "Snapshot of Address"
        number total
        date createdAt
        date updatedAt
    }

    ORDER_PRODUCT {
        ObjectId productId FK
        int quantity
        number price
        number subtotal
        string color
        string size
        string image
    }
```
---

## 🔄 Application Workflows

### Authentication Flow

How users register and log in to the system securely.

```mermaid
sequenceDiagram
    participant User
    participant Client as Next.js Client
    participant Server as Express Server
    participant DB as MongoDB

    User->>Client: Enters Credentials (Login)
    Client->>Server: POST /api/v1/auth/login
    Server->>DB: Find User by Email
    DB-->>Server: User Document
    Server->>Server: Validate Password (bcrypt)
    Server->>Server: Generate JWT Token
    Server-->>Client: Return Token & User Info
    Client->>Client: Store Token (LocalStorage)
```

### Checkout Process

The sequence of events from cart review to order placement.

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant Server
    participant DB

    User->>Client: Click "Checkout"
    Client->>Server: POST /api/v1/cart/checkout
    
    activate Server
    Server->>Server: Verify User Auth
    Server->>DB: Get User Cart & Address
    DB-->>Server: Cart Items & Address
    
    alt Cart Empty or No Address
        Server-->>Client: Error (400)
    else Valid
        Server->>Server: Calculate Totals
        Server->>DB: Create Order Document
        Server->>DB: Clear User Cart
        Server-->>Client: Success (Order Created)
    end
    deactivate Server
    
    Client->>User: Show Order Confirmation
```
---

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:
*   **Node.js** (v20 or higher recommended)
*   **npm** or **yarn**
*   **MongoDB** (Local or Atlas URI)
*   **Cloudinary Account** (for image upload)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Ujjwalprajapati16/Merchly.git
    cd Merchly
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```
    *This will install dependencies for both the root, `web`, and `server` workspaces.*

### Environment Setup

Create `.env` files in both `web` and `server` directories based on the provided examples.

**`server/.env`**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**`web/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Running Locally

You can run both the frontend and backend concurrently from the root directory:

```bash
npm run start
```

Or run them individually:

*   **Backend**: `npm run start:server` (Runs on port 5000)
*   **Frontend**: `npm run start:web` (Runs on port 3000)

Access the application at `http://localhost:3000`.

---

## 🤝 Contributing

Contributions are always welcome! If you'd like to improve Merchly, please follow these steps:

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Contact

**Ujjwal Prajapati** - [GitHub Profile](https://github.com/Ujjwalprajapati16)

Project Link: [https://github.com/Ujjwalprajapati16/Merchly](https://github.com/Ujjwalprajapati16/Merchly)
