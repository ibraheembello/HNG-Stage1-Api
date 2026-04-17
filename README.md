# 🚀 HNG Stage 1: Full-Stack Profile Classification System

[![Node.js](https://img.shields.io/badge/Node.js-20.x-brightgreen?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-3982CE?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-316192?logo=postgresql)](https://neon.tech/)

A professional, full-stack application that classifies user demographics (Gender, Age Group, Nationality) using real-time data from three external APIs. It features a high-performance Express backend and a modern, interactive React dashboard.

---

## 🏗 Project Architecture

- **Frontend (`/frontend`)**: React 19 + Vite + TypeScript + Lucide Icons. Highly responsive dashboard with real-time filtering and sleek glassmorphic UI.
- **Backend (`/src`)**: Express.js + TypeScript + Prisma ORM. Handles concurrent API fetching, classification logic, and data persistence.
- **Infrastructure**: PostgreSQL (Neon Cloud) for storage, Vercel for serverless deployment.

---

## 📋 Features

### **Interactive Dashboard (Frontend)**
- **Real-time Classification**: Instantly process names with visual loading feedback.
- **Advanced Filtering**: Filter by Gender, Age Group, and Country ID with a case-insensitive search.
- **Data Visualization**: Clear breakdown of demographic probabilities and data sample sizes.
- **Full Management**: Delete profiles directly from the UI with safety confirmations.
- **Responsive Design**: Optimized for everything from mobile phones to 4K monitors.

### **Robust API (Backend)**
- **Concurrent API Fetching**: Parallel calls to Genderize, Agify, and Nationalize for <1s response times.
- **Intelligent Logic**: 
  - Age groups: 0-12 (child), 13-19 (teenager), 20-59 (adult), 60+ (senior).
  - Nationality: Automatic selection of the highest-probability country.
- **Full Idempotency**: Prevents duplicate records for the same name.
- **UUID v7**: Modern, time-ordered IDs for better database performance.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL Database URL (e.g., Neon.tech)

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd hng-stage1-api

# Install Backend dependencies
npm install

# Install Frontend dependencies
cd frontend && npm install
```

### 3. Environment Setup
Create a `.env` file in the root:
```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
PORT=3000
```

### 4. Running Locally
```bash
# Start Backend (from root)
npm run dev

# Start Frontend (from /frontend)
npm run dev
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/profiles` | Classify a name and create/return a profile. |
| `GET` | `/api/profiles` | Get all profiles (Supports: `gender`, `country_id`, `age_group`). |
| `GET` | `/api/profiles/:id` | Fetch a single profile by ID. |
| `DELETE` | `/api/profiles/:id` | Remove a profile (204 No Content). |

---

## 🛡 License
MIT License. Developed for **HNG Internship Stage 1**.
