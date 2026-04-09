#  Hospital Management System

A full-stack web application developed to streamline hospital operations by managing patients, doctors, appointments, rooms, billing, and notifications through a centralized dashboard.

This project is designed to improve hospital workflow, reduce manual record handling, and provide an efficient management system for both administrative staff and users.


# Features

-  Doctor Management
  - Add, update, and view doctor details
  - Manage doctor specialization and availability

-  Patient Management
  - Register and manage patient records
  - View patient history and details

-  Appointment Booking
  - Book appointments with doctors
  - Manage appointment schedules
  - Update appointment status

-  Room Management
  - Manage hospital room allocation
  - Check room availability

-  Billing System
  - Generate and manage patient bills
  - Store payment details

-  Notifications
  - Display important alerts and updates

-  Authentication
  - Secure login and registration system
  - Role-based access

# Tech Stack

# Frontend
- React.js
- Bootstrap / CSS
- Axios

# Backend
- Node.js
- Express.js

# Database
- MongoDB



# Project Structure

hospital-management/
│
├── frontend/ # React frontend
│ ├── src/
│ └── public/
│
├── backend/ # Node + Express backend
│ ├── routes/
│ ├── models/
│ └── server.js
│
├── vercel.json
└── README.md

---

# Installation & Setup

# Backend Setup
cd backend
npm install
node server.js

# Frontend Setup
cd frontend
npm install
npm start

# Environment Variables
Create .env file inside backend folder:

PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/hospitalDB

# Clone Repository
```bash
git clone https://github.com/yourusername/hospital-management.git
cd hospital-management

# Objective
The main objective of this project is to digitalize hospital operations and provide an easy-to-use management portal for better efficiency and record maintenance.

# Developed By

Priyanka Panchal
B.Tech Information Technology
