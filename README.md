# Real Estate App

A modern, full-stack real estate platform for property listings, agent management, and real-time chat. Built with a robust Node.js/Express backend and a sleek React + Vite frontend, this project is designed for scalability, performance, and a seamless user experience.

## 🚀 Features
 - Property Listings: Browse, search, and filter properties with rich details and images.
 - Agent Management: View agent profiles, contact agents, and manage your own profile.
 - Real-Time Chat: Secure, instant messaging between users and agents using WebSockets.
 - Dashboard Analytics: Visualize data with interactive charts and revenue tracking.
 - Authentication: Secure login and user management.
 - Responsive Design: Optimized for desktop and mobile devices.
 - Modern UI: Clean, intuitive interface with custom components and SCSS styling.
   
## 🏗️ Project Structure

```
real_estate_app/
│
├── Backend/         # Node.js + Express + MongoDB backend
│   ├── src/
│   │   ├── Controllers/   # Route controllers (Chat, Property, User)
│   │   ├── Models/        # Mongoose models (User, Property, Chat, etc.)
│   │   ├── Routes/        # Express route definitions
│   │   ├── mongodb/       # MongoDB connection logic
│   │   ├── socket/        # Socket.io real-time server
│   │   └── util/          # Utility functions
│   ├── package.json
│   └── tsconfig.json
│
├── Frontned/        # React + Vite frontend
│   ├── src/
│   │   ├── Components/    # Reusable UI components
│   │   ├── Context/       # React context providers (Sidebar, Socket)
│   │   ├── Data/          # Static data and configs
│   │   ├── Models/        # TypeScript models/interfaces
│   │   ├── Network/       # API service layer
│   │   ├── Pages/         # Main app pages (Dashboard, Agents, etc.)
│   │   ├── Screen/        # Screen-level components
│   │   ├── Style/         # SCSS/CSS modules
│   │   └── Util/          # Utility functions
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## 🛠️ Tech Stack

 - Frontend: React, Vite, TypeScript, SCSS, Socket.io-client
 - Backend: Node.js, Express, MongoDB, Mongoose, Socket.io
   
## ⚡ Getting Started

Prerequisites

 - Node.js (v18+ recommended)
 - npm or yarn
 - MongoDB instance (local or cloud)
   
1. Clone the Repository

```
git clone https://github.com/your-username/real_estate_app.git
cd real_estate_app
```

3. Setup Backend

```
cd Backend
npm install
```

 Create a .env file with your MongoDB URI and other secrets
```
npm start
```

4. Setup Frontend

```
cd ../Frontned
npm install
npm run dev
```

5. Open in Browser

## 🧩 Key Components
 - Property Management: Create, edit, and view property listings.
 - Agent Directory: Find and connect with real estate agents.
 - Chat System: Real-time messaging for inquiries and negotiations.
 - User Profiles: Manage your account, view your properties, and track activity.
 - Analytics Dashboard: Visualize sales, revenue, and property stats.
   
## 📸 Screenshots
