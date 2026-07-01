# Real Estate App


A modern, full-stack real estate platform for property listings, agent management, and real-time chat using websocket. Built with a robust Node.js/Express backend and a sleek React and TypeScript frontend, this project is designed for scalability, performance, and a seamless user experience.


<div display="flex" align="center" class="text-center">
 
 <img alt="last-commit" src="https://img.shields.io/github/last-commit/anwesha2002/Real-Estate?style=flat&amp;logo=git&amp;logoColor=white&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;"/>
 <img alt="repo-top-language" src="https://img.shields.io/github/languages/top/anwesha2002/Real-Estate?style=flat&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;"/>
 <img alt="repo-language-count" src="https://img.shields.io/github/languages/count/anwesha2002/Real-Estate?style=flat&amp;color=0080ff" class="inline-block mx-1" style="margin: 0px 2px;"/>
</div>



## 🚀 Features
 - Property Listings: Browse, search, and filter properties with rich details and images.
 - Agent Management: View agent profiles, contact agents, and manage your own profile.
 - Real-Time Chat: Secure, instant messaging, live notification between users and agents and typing indicator, Recipient's availability using WebSockets.
 - Dashboard Analytics: Visualize data with interactive charts and revenue tracking.
 - Authentication: Secure login and user management.
 - Responsive Design: Optimized for desktop and mobile devices.
 - Modern UI: Clean, intuitive interface with custom components and SCSS styling.

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/ecc1abd8-5e34-4a05-a8ef-b660046b815c" />

   
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

<div display="flex" align="center" class="text-center">
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&amp;logo=React&amp;logoColor=black" class="inline-block mx-1" style="margin: 0px 2px;"/>
  <img alt="Typescript" src="https://img.shields.io/badge/TypeScript-61DAFB.svg?style=flat&amp;logo=TypeScript&amp;logoColor=black" class="inline-block mx-1" style="margin: 0px 2px;"/>
  <img alt="Express" src="https://img.shields.io/badge/Express-000000.svg?style=flat&amp;logo=Express&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="Socket.io" src="https://img.shields.io/badge/Socket.io-000000.svg?style=flat&amp;logo=Socket.io&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="JSON" src="https://img.shields.io/badge/JSON-000000.svg?style=flat&amp;logo=JSON&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-3492FF.svg?style=flat&amp;logo=Node.js&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;"/>
  <img alt="Mongoose" src="https://img.shields.io/badge/Mongoose-F04D35.svg?style=flat&amp;logo=Mongoose&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;"/>
  <img alt="Nodemon" src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&amp;logo=Nodemon&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;"/>
  <img alt="Lodash" src="https://img.shields.io/badge/Lodash-3492FF.svg?style=flat&amp;logo=Lodash&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;"/>
  <img alt="Cloudinary" src="https://img.shields.io/badge/Cloudinary-3448C5.svg?style=flat&amp;logo=Cloudinary&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;"/>
  <img alt="npm" src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&amp;logo=npm&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;"/>
</div>
   
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

<img width="2192" height="1120" alt="Untitled (21)" src="https://github.com/user-attachments/assets/fa2aa6a5-d3c2-432e-9112-e07810851572" />
