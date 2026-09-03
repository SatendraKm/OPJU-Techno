# OPJU-Techno

A modern, full-stack web application built with **Next.js 15** and **TypeScript**, featuring authentication, user management, and data export capabilities. The project is designed for handling event management and user registration with a professional, responsive UI.

**Live Demo**: [https://opju-techno.vercel.app](https://opju-techno.vercel.app)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Key Dependencies](#key-dependencies)
- [Project Architecture](#project-architecture)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## 🎯 Overview

**OPJU-Techno** is a comprehensive web platform for managing technical events and user registrations. It provides secure authentication, user profile management, and tools for exporting participant data in multiple formats (CSV, Excel).

The application combines modern web technologies with best practices in security, performance, and user experience to deliver a scalable solution.

---

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI component library
- **Framer Motion** - Animation library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Serverless backend
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Nodemailer** - Email notifications

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **PostCSS** - CSS processing

---

## ✨ Features

### Authentication & Authorization
- ✅ User sign-up with email validation
- ✅ Secure login/logout functionality
- ✅ JWT-based session management
- ✅ Protected routes and API endpoints
- ✅ User dropdown with authenticated/guest views

### User Management
- ✅ User profile management
- ✅ Secure password handling
- ✅ Welcome email notifications (via Nodemailer)
- ✅ User data persistence

### Data Export
- ✅ Export user data to CSV format
- ✅ Export user data to Excel format
- ✅ Filter and export outsider registrations

### UI/UX
- ✅ Responsive design for all devices
- ✅ Smooth animations with Framer Motion
- ✅ Accessible components (Radix UI)
- ✅ Toast notifications
- ✅ Loading states and error handling

---

## 📁 Project Structure

```
OPJU-Techno/
├── src/                          # Source code directory
│   ├── app/                       # Next.js app directory
│   │   ├── auth/                  # Authentication pages
│   │   │   ├── login/             # Login page
│   │   │   ├── signup/            # Sign-up page
│   │   │   └── layout.tsx
│   │   ├── api/                   # API routes
│   │   ├── page.tsx               # Home page
│   │   └── layout.tsx             # Root layout
│   ├── components/                # Reusable React components
│   │   ├── ui/                    # UI components (Radix UI based)
│   │   └── [Feature Components]
│   ├── lib/                       # Utility functions
│   ├── models/                    # Mongoose models
│   ├── schemas/                   # Validation schemas
│   ├── scripts/                   # Utility scripts
│   │   └── exportOutsiders.js     # Export outsider data
│   └── middleware.ts              # Next.js middleware (protected routes)
├── public/                        # Static assets
├── components.json                # shadcn/ui configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── next.config.ts                 # Next.js configuration
├── postcss.config.mjs             # PostCSS configuration
├── eslint.config.mjs              # ESLint configuration
├── package.json                   # Project dependencies
└── README.md                       # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** cluster (local or cloud-based)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SatendraKm/OPJU-Techno.git
   cd OPJU-Techno
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Setup

Create a `.env.local` file in the root directory and add the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Email (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password

# Application
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Note**: 
- Replace `your_mongodb_connection_string` with your actual MongoDB URI
- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password
- The `JWT_SECRET` should be a strong, random string

### Running the Application

1. **Development mode**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

2. **Production build**
   ```bash
   npm run build
   npm start
   ```

3. **Port specification** (Custom port)
   ```bash
   npm start -p 8080
   ```

---

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build application for production |
| `npm start` | Start production server (port 8080 by default) |
| `npm run lint` | Run ESLint to check code quality |
| `npm run export:outsiders` | Export outsider registrations to file |
| `npm run build-no-checks` | Build without TypeScript and ESLint checks |

---

## 📦 Key Dependencies

### UI & Components
- `@radix-ui/*` - Accessible component primitives
- `lucide-react` - Icon library
- `framer-motion` - Advanced animations
- `embla-carousel-react` - Carousel component
- `react-day-picker` - Date picker

### Form & Validation
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - Resolvers for react-hook-form

### Data & Storage
- `mongoose` - MongoDB object modeling
- `dotenv` - Environment variable management
- `js-cookie` - Cookie management
- `jose` - JWT handling

### Utilities
- `date-fns` - Date utilities
- `csv-writer` - CSV export
- `exceljs` - Excel file generation
- `xlsx` - Excel file reading/writing
- `nodemailer` - Email sending
- `clsx` & `tailwind-merge` - Utility styling
- `class-variance-authority` - Component variant management

---

## 🏗 Project Architecture

### Authentication Flow
```
User Input → Sign Up/Login Page
    ↓
API Route (/api/auth/*)
    ↓
Validation (Zod Schema)
    ↓
MongoDB Query
    ↓
JWT Token Generation
    ↓
Store in Cookie/SessionStorage
    ↓
Protected Routes Middleware
```

### Database Schema
The application uses MongoDB with Mongoose for data persistence. Key models include:
- **User Model**: Stores user account information, email, hashed passwords
- **Registration Model**: Tracks event registrations and participant data

### Middleware
Protected routes are managed through `middleware.ts` which:
- Verifies JWT tokens
- Redirects unauthenticated users
- Protects API endpoints

---

## 🙌 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Last Updated**: September 2026  
**Repository**: [SatendraKm/OPJU-Techno](https://github.com/SatendraKm/OPJU-Techno)
