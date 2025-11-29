# Gym Management System - Backend API

Node.js + Express + MongoDB backend for the Gym Management System.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally on port 27017 or MongoDB Atlas)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update MongoDB URI if needed

3. **Seed the database**
   ```bash
   npm run seed
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user (requires auth)

### Members
- `GET /api/members` - Get all members (with optional search)
- `GET /api/members/:id` - Get single member
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member
- `PATCH /api/members/:id/status` - Update member status
- `DELETE /api/members/:id` - Soft delete member

### Attendance
- `POST /api/attendance/checkin` - Mark member check-in
- `GET /api/attendance/today` - Get today's check-ins
- `GET /api/attendance/week` - Get weekly check-in data

### Dashboard
- `GET /api/dashboard/summary` - Get dashboard statistics

### Health Check
- `GET /api/health` - API health status

## 🔐 Default Login Credentials

After running `npm run seed`:
- **Email**: admin@gym.com
- **Password**: admin123

## 🗄️ Database Models

### User (Admin)
- name, email, password (hashed), role

### Member
- memberId (auto-generated), name, phone, email, plan, startDate, endDate, status, notes

### Attendance
- memberId (ref), memberName, checkinTime

## Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gym-management
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

## 📦 Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── models/         # MongoDB models
│   ├── controllers/    # Request handlers
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   ├── scripts/        # Database scripts
│   └── server.js       # Entry point
├── .env
├── .env.example
├── package.json
└── README.md
```

## 🔧 Available Scripts

```bash
npm run dev     # Start development server with nodemon
npm start       # Start production server
npm run seed    # Seed database with sample data
```

## 🛡️ Security Features

- JWT authentication
- Password hashing with bcrypt
- CORS configuration
- Helmet.js security headers
- Request validation
- Error handling

## 📝 Notes

- All API routes except `/api/auth/login` and `/api/auth/register` require JWT authentication
- Include JWT token in Authorization header: `Bearer <token>`
- MongoDB must be running before starting the server

## 🌐 Frontend Integration

The backend is configured to work with the React frontend running on `http://localhost:3000`. CORS is enabled for this origin.

---

Built with Node.js, Express, and MongoDB
