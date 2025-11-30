# CommitFit Studio - Backend API

Backend API for Gym Management System using **JSON File Database** (no MongoDB required).

## 🚀 Features

- ✅ **JSON File Database** - Simple file-based storage, no MongoDB needed
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **RESTful API** - Clean, well-documented endpoints
- ✅ **Member Management** - Create, read, update members
- ✅ **Attendance Tracking** - Check-in system with daily tracking
- ✅ **Dashboard Analytics** - Real-time statistics

## 📦 Installation

```bash
# Install dependencies
npm install

# Start the server
npm start

# Development mode with auto-reload
npm run dev
```

## 🔑 Default Admin Credentials

The system automatically creates an admin user on first startup:

- **Email**: `admin@commitfitstudio.com`
- **Password**: `admin123`

## 🌐 Environment Variables

Create a `.env` file in the backend directory:

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-secret-key-here
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user (Protected)

### Members
- `GET /api/members` - Get all members (Protected)
- `GET /api/members/:id` - Get single member (Protected)
- `POST /api/members` - Create member (Protected)
- `PUT /api/members/:id` - Update member (Protected)
- `PATCH /api/members/:id/status` - Update member status (Protected)
- `DELETE /api/members/:id` - Deactivate member (Protected)

### Attendance
- `POST /api/attendance/checkin` - Mark check-in (Protected)
- `GET /api/attendance/today` - Get today's check-ins (Protected)
- `GET /api/attendance/week` - Get weekly check-in data (Protected)

### Dashboard
- `GET /api/dashboard/summary` - Get dashboard summary stats (Protected)

### Health Check
- `GET /api/health` - API health check

## 📊 Database Structure

The database is stored in `src/data/db.json`:

```json
{
  "users": [...],
  "members": [...],
  "attendance": [...]
}
```

### User Schema
```javascript
{
  id: string,
  name: string,
  email: string,
  password: string (hashed),
  role: "admin" | "staff" | "trainer",
  createdAt: ISO Date,
  updatedAt: ISO Date
}
```

### Member Schema
```javascript
{
  id: string,
  memberId: string (auto-generated: M001, M002, etc.),
  name: string,
  phone: string,
  email: string,
  plan: "Monthly" | "Quarterly" | "Annual" | "Free Trial",
  startDate: ISO Date,
  endDate: ISO Date,
  status: "Active" | "Expired" | "Inactive",
  notes: string,
  createdAt: ISO Date,
  updatedAt: ISO Date
}
```

### Attendance Schema
```javascript
{
  id: string,
  memberId: string,
  memberName: string,
  checkinTime: ISO Date,
  createdAt: ISO Date,
  updatedAt: ISO Date
}
```

## 🚀 Deployment to Render

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Backend with JSON database"
git push origin main
```

### Step 2: Create Web Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `commitfit-studio`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

### Step 3: Set Environment Variables
Add these in Render Dashboard → Environment:
- `JWT_SECRET` = `commitfitstudio-secret-key-2024`
- `NODE_ENV` = `production`
- `PORT` = `5000`
- `FRONTEND_URL` = `https://your-vercel-domain.vercel.app`

### Step 4: Deploy
Click **Create Web Service** and wait for deployment to complete.

## 🔗 Connect Frontend

Update your frontend `.env` file:
```env
VITE_API_URL=https://commitfit-studio.onrender.com/api
```

Redeploy the frontend on Vercel.

## 🧪 Testing the API

### Test Login
```bash
curl -X POST https://commitfit-studio.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@commitfitstudio.com","password":"admin123"}'
```

Expected Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "name": "Admin",
      "email": "admin@commitfitstudio.com",
      "role": "admin"
    }
  },
  "message": "Login successful"
}
```

### Test with Token
```bash
curl -X GET https://commitfit-studio.onrender.com/api/members \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── env.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── memberController.js
│   │   ├── attendanceController.js
│   │   └── dashboardController.js
│   ├── data/
│   │   └── db.json
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── authRoutes.js
│   │   ├── memberRoutes.js
│   │   ├── attendanceRoutes.js
│   │   └── dashboardRoutes.js
│   ├── utils/
│   │   ├── apiResponse.js
│   │   └── jwt.js
│   ├── db.js
│   └── server.js
├── .env
├── .env.example
├── package.json
└── README.md
```

## 🛠️ Technology Stack

- **Express.js** - Web framework
- **JSON File Storage** - Database
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **helmet** - Security headers

## ⚠️ Important Notes

### Database Persistence on Render
Render's free tier uses **ephemeral storage**, meaning the database file will reset on each deployment or restart. For production:
1. Use Render's paid plan with persistent disks
2. Or migrate to a proper database (PostgreSQL, MySQL)
3. Or use a cloud storage solution (AWS S3, Google Cloud Storage)

For testing and development purposes, the JSON database works perfectly fine.

## 🔒 Security Features

- JWT token-based authentication
- Bcrypt password hashing
- CORS configuration
- Helmet security headers
- Protected routes with middleware

## 📝 License

ISC

## 👨‍💻 Author

CommitFit Studio Team
