# 🛍️ Merchly - Minimal & Clean Merchandise Store

**Merchly** is a modern e-commerce platform offering high-quality merchandise with a sleek, minimal design. Built with cutting-edge web technologies to provide an effortless shopping experience with a clean, intuitive interface.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4)](https://tailwindcss.com/)
[![Shadcn/ui](https://img.shields.io/badge/Shadcn%2Fui-Latest-000000)](https://ui.shadcn.com/)

## 🚀 Tech Stack

### **Frontend Framework**
- **Next.js 15.5.4** - React framework with App Router, Server Components, and Turbopack
- **React 19.2.0** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development

### **Styling & UI**
- **TailwindCSS 4** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, reusable components built on Radix UI
- **Radix UI** - Low-level UI primitives for accessibility
- **Lucide React** - Beautiful & consistent icon library
- **React Icons** - Popular icon library including Google icons
- **Class Variance Authority (CVA)** - Creating variant-based component APIs
- **Tailwind Merge & clsx** - Conditional className utilities

### **State Management & Data Fetching**
- **TanStack Query (React Query) 5** - Powerful data synchronization
- **React Hook Form 7** - Performant forms with easy validation
- **Zod 4** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation resolvers

### **Theme & Styling**
- **Next Themes** - Perfect dark mode support
- **Inter Font** - Modern, readable Google Font
- **CSS Custom Properties** - Dynamic theming system

### **Development Tools**
- **ESLint 9** - Code linting with Next.js config
- **PostCSS** - CSS processing
- **Turbopack** - Ultra-fast bundler (Next.js 15)

## ✨ Features Implemented

### 🏠 **Landing Page**
- **Animated Hero Section** - Smooth auto-sliding image carousel
- **Responsive Design** - Mobile-first approach
- **Modern UI/UX** - Clean, minimal interface
- **Featured Products** - Showcase of top-rated items
- **Category Highlights** - Quick access to product categories

### 🔐 **Authentication System**
- **Login Form** with comprehensive validation:
  - Email format validation
  - Password strength requirements
  - Real-time form validation with Zod
  - Loading states and error handling
  - "Forgot Password" link
  - Google OAuth integration (UI ready)
  
- **Signup Form** with advanced features:
  - Full name, email, password, confirm password fields
  - Password matching validation
  - Form state management with React Hook Form
  - Google OAuth integration (UI ready)

### 🛍️ **Product Management**
- **Product Listing** - Grid view of products with pagination
- **Product Details** - Detailed view with image gallery, size/color selection
- **Category Filtering** - Filter products by category
- **Search Functionality** - Real-time product search
- **Stock Status** - Visual indicators for availability

### 🛒 **Shopping Cart**
- **Cart Management** - Add, remove, and update item quantities
- **Save for Later** - Move items between cart and saved list
- **Real-time Totals** - Automatic subtotal and total calculation
- **Persistent Cart** - Cart state saved for logged-in users

### 💳 **Checkout & Orders**
- **Checkout Process** - Streamlined checkout flow
- **Order Creation** - Secure order placement
- **Order History** - View past orders and status
- **Order Details** - Comprehensive order information

### 👤 **User Profile**
- **Profile Management** - Update personal information
- **Address Book** - Manage shipping addresses (Add, Edit, Delete, Set Default)
- **Change Password** - Secure password update functionality

### ❤️ **Wishlist**
- **Wishlist Management** - Add/Remove items from wishlist
- **Quick Access** - View wishlist from profile or nav

### 🛡️ **Admin Panel**
- **Dashboard** - Overview of store performance
- **Product Management** - Add, Edit, Delete products
- **Order Management** - View and update order status
- **User Management** - View and manage users

### 🧭 **Navigation System**
- **Responsive Navbar** with:
  - Logo integration
  - Desktop navigation menu
  - Search bar
  - Shopping cart with item counter
  - User dropdown menu
  - Theme switcher
  - Mobile hamburger menu

### 🎨 **Theme System**
- **Dark/Light Mode Toggle** - Seamless theme switching
- **System Theme Detection** - Respects user's OS preference
- **Persistent Theme** - Saves user preference

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes group
│   │   ├── login/                # Login page
│   │   │   ├── components/       # Login-specific components
│   │   │   │   └── login-form.tsx
│   │   │   └── page.tsx
│   │   └── signup/               # Signup page
│   │       ├── components/       # Signup-specific components
│   │       │   └── signup-form.tsx
│   │       └── page.tsx
│   ├── (home)/                   # Home page group
│   │   ├── components/           # Home-specific components
│   │   │   └── HeroSection.tsx
│   │   └── page.tsx
│   ├── globals.css               # Global styles & Tailwind
│   ├── layout.tsx                # Root layout with providers
│   └── not-found.tsx             # Custom 404 page
├── components/                   # Reusable components
│   ├── ui/                       # Shadcn/ui components
│   │   ├── shadcn-io/           # Custom navbar components
│   │   │   └── navbar-04/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── navigation-menu.tsx
│   │   └── popover.tsx
│   ├── Logo.tsx                  # Brand logo component
│   └── Navbar.tsx                # Main navigation component
├── lib/                          # Utility functions
│   └── utils.ts                  # Common utilities (cn, etc.)
├── providers/                    # React context providers
│   ├── QueryProvider.tsx        # TanStack Query setup
│   └── theme-provider.tsx       # Theme context
└── types/                        # TypeScript definitions
    └── formTypes.ts              # Form validation schemas
```

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** 
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd merchly/web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production with Turbopack
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🛣️ Roadmap & Next Steps

### 🔄 **In Development**
- [ ] Payment Gateway Integration (Stripe/Razorpay)
- [ ] Email Notifications (Order confirmation, etc.)
- [ ] Advanced Search Filters

### 🎯 **Planned Features**

#### **Advanced Features**
- [ ] Product Reviews and Ratings
- [ ] Related Products Recommendation
- [ ] Multi-language support (i18n)
- [ ] PWA capabilities

#### **Performance & SEO**
- [ ] Image optimization
- [ ] SEO meta tags
- [ ] Sitemap generation
- [ ] Performance monitoring
- [ ] Analytics integration (Google Analytics)

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use existing UI components from `components/ui/`
- Implement proper form validation with Zod
- Ensure responsive design (mobile-first)
- Add proper error handling
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License.

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn/ui Components](https://ui.shadcn.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TanStack Query](https://tanstack.com/query)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

---

**Built with ❤️ using Next.js 15, React 19, and TailwindCSS**
