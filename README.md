🚗⚡ ChargeUp EV – Smart EV Charging Station Finder & Booking System

A full-stack MERN project for discovering, booking, and managing EV charging slots with payment-ready workflow.

🚀 Overview

ChargeUp EV is a complete end-to-end solution that allows EV users to:

Find nearby EV charging stations

View connector types, pricing & availability

Book charging slots easily

Manage bookings in their profile

Cancel bookings with instant refund updates

Access live station data from a centralized backend

This platform is designed for scalability and can be deployed for real-world EV stations.

✨ Features
🔍 Search & Explore

View nearby charging stations

See real-time availability

Explore connector types (Type2, CCS, CHAdeMO, etc.)

⚡ Booking System

Book slots for a specific date & time

Pricing & connector-based booking

Instant booking confirmation

👤 User Authentication

Secure JWT authentication

Login / Register / Logout

Protected routes

🧾 Profile Dashboard

See all past & upcoming bookings

Status badges: confirmed, cancelled

Refund status: processed, amount refunded

🟥 Cancellation + Refunds

Cancel booking in one click

Slot becomes available again

Refund processed instantly

UI automatically updates without page refresh

📱 Responsive UI

Built with shadcn/ui + TailwindCSS

Clean animations and modern EV-themed colors

🛠️ Tech Stack
Frontend

React + TypeScript

Vite

TailwindCSS

shadcn/ui

lucide-react icons

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Helmet + CORS

Deployment

Frontend → Vercel

Backend → Render

MongoDB → MongoDB Atlas

📁 Project Structure
charge-up-spots-nearby-83/
├── src/                   # Frontend (React + Vite)
│   ├── pages/
│   ├── components/
│   ├── contexts/
│   ├── assets/
│   ├── config.ts
│   └── main.tsx
│
└── server/                # Backend (Node + Express)
    ├── routes/
    │   ├── auth.js
    │   ├── stations.js
    │   ├── bookings.js
    │   └── cancelBooking.js
    ├── models/
    │   ├── User.js
    │   ├── Booking.js
    │   └── Station.js
    ├── middleware/
    │   └── authmiddleware.js
    ├── server.js
    └── package.json

⚙️ Environment Variables

Create a .env file in /server:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


And in the frontend .env:

VITE_API_URL=https://your-backend-url.onrender.com/api

🧑‍💻 Installation & Setup
1️⃣ Clone the project
git clone https://github.com/your-username/charge-up-ev.git
cd charge-up-ev

2️⃣ Install frontend dependencies
cd charge-up-spots-nearby-83
npm install

3️⃣ Install backend dependencies
cd server
npm install

▶️ Running the Project
🟦 Start Backend
cd server
npm run start

🟩 Start Frontend
cd charge-up-spots-nearby-83
npm run dev

📡 REST API Endpoints
🔐 Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register User
POST	/api/auth/login	Login User
⚡ Station Routes
Method	Endpoint	Description
GET	/api/stations	Get all stations
📦 Booking Routes
Method	Endpoint	Description
POST	/api/bookings	Create new booking
GET	/api/bookings	Get all user bookings
❌ Cancel Booking + Refund
Method	Endpoint	Description
DELETE	/api/cancel-booking/:id	Cancel booking + process refund

🏁 Deployment
Frontend (Vercel)

Deploy /src

Set environment variable:
VITE_API_URL=https://your-backend.onrender.com/api

Backend (Render)

Deploy /server

Set env variables

Enable CORS

Auto restart on crash
