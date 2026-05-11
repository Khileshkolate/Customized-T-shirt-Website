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

## Deployment Notes

### Backend on Render
Set these environment variables on the Render backend service:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
CLIENT_URL=https://your-vercel-domain.vercel.app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_google_app_password
SMTP_FROM="ViragKala <your_email@gmail.com>"
```

For Gmail, `SMTP_PASS` must be a Google App Password. A normal Gmail account password will not work.
Prefer `SMTP_PORT=465` for Gmail on Render. The backend also forces SMTP DNS resolution toward IPv4 to avoid Render/Gmail IPv6 `ENETUNREACH` connection errors.

You can check the backend email configuration after deployment at:

```text
https://your-render-service.onrender.com/api/auth/otp-health
```

`data.email.configured` should be `true`. If it is `false`, OTP emails cannot be sent.

### Frontend on Vercel
Set this environment variable on the Vercel frontend project:

```env
VITE_API_URL=https://your-render-service.onrender.com/api
```

After changing Vercel environment variables, redeploy the frontend so the new API URL is baked into the Vite build.
