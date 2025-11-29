# Gym Management System

A modern, full-stack Gym Management System built with React.js (Frontend) and Node.js/Express (Backend). This application helps gym owners and staff manage memberships, track attendance, and organize gym operations from a single, intuitive interface.

## 🎯 Features

### Core Modules
- **Authentication**: Secure login system with JWT-based authentication
- **Dashboard**: Overview with key metrics, charts, and real-time statistics
- **Members Management**: Complete CRUD operations, search, and status tracking
- **Attendance Tracking**: Real-time check-ins by member ID or phone
- **Classes**: Schedule and manage gym classes (Frontend implemented)
- **Billing**: Invoice management and payment tracking (Frontend implemented)
- **Reports**: Analytics and performance metrics (Frontend implemented)
- **Settings**: Configurable gym profile and system preferences

## 🎨 Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Routing**: React Router v6
- **Styling**: Vanilla CSS with CSS Variables (Glassmorphism design)
- **State Management**: Context API
- **HTTP Client**: Axios (via custom ApiClient)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs
- **Security**: Helmet, CORS, Rate Limiting (ready)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gym-management-system
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure your environment variables
   npm run seed          # Seed database with initial data
   npm run dev           # Start backend server (default: port 5000)
   ```

3. **Setup Frontend**
   ```bash
   cd ../gym-management-system
   npm install
   npm run dev           # Start frontend server (default: port 3000)
   ```

### Environment Variables

**Backend (.env)**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gym-db
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

## 📦 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder.
3. Set `VITE_API_URL` environment variable to your production backend URL.

### Backend (Render/Railway)
1. Connect repository.
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Configure environment variables (MONGODB_URI, JWT_SECRET, FRONTEND_URL).

## 📚 API Documentation

| Module | Method | Endpoint | Description |
|--------|--------|----------|-------------|
| Auth | POST | `/api/auth/login` | Login user |
| Auth | GET | `/api/auth/me` | Get current user |
| Members | GET | `/api/members` | Get all members |
| Members | POST | `/api/members` | Add new member |
| Attendance | POST | `/api/attendance/checkin` | Check-in member |
| Dashboard | GET | `/api/dashboard/stats` | Get dashboard stats |

## 📄 License
This project is open source and available for educational purposes.

## 👨‍💻 Developed By
**Commitfit Studio Tech Team**
