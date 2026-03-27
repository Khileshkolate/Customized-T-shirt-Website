# Customized T-Shirt Website

A full-stack application for customizing and ordering T-shirts.

## Features
- Interactive 3D T-shirt designer
- Admin Panel for product and mockup management
- User authentication and order tracking
- Support for multiple designs and uploads

## Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local instance running on `127.0.0.1:27017`)

## Project Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd Customized-T-shirt-Website
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env`.
   - Update variables as needed (MongoDB URI, JWT Secret, etc.).
4. (Optional) Seed the database with initial data:
   ```bash
   node seed.js
   ```
5. Start the backend:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS, Fabric.js (Canvas)
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Authenticaton**: JWT (JSON Web Tokens)
