 💪 CommitFit Studio – Gym Management System  
*A Complete Web-Based Fitness Center Management Solution*

---

## 📌 Overview  

CommitFit Studio is a **full-stack Gym Management System** designed for small and medium gyms to digitize their operations. The system centralizes **member management, attendance tracking, class schedules, and basic billing**—making daily administration simple and efficient.

This project uses a **modern MERN-style stack**:  
**React + Vite (Frontend)** · **Node.js + Express (Backend)** · **MongoDB (Database)**

---

## 🚀 Key Features  

### 🔐 Authentication  
- Secure Admin Login with JWT  
- Protected routes & authorization-ready architecture  

### 📊 Dashboard  
- Total Members  
- Today’s Check-ins  
- Active Memberships  
- Pending Payments  
- Weekly attendance statistics  

### 🧍 Members Management  
- Add / Edit / Renew plans  
- Membership status (Active / Expired)  
- Search & filter by name, phone, or ID  

### 🕒 Attendance System  
- Instant check-in via ID/Phone  
- Daily check-in list  
- Visit history & activity overview  

### 🧘 Classes Module  
- Weekly class schedule (UI)  
- Trainers, time slots & capacity (demo data)  

### 💵 Billing Module  
- Invoices & payment status (demo UI)  
- Pending payments overview  

### 📈 Reports  
- UI prepared for analytics (attendance, members, revenue)  

### ⚙ Settings  
- Gym profile (CommitFit Studio branding)  
- Contact details & social media  
- Opening hours & basic preferences  

### 🏬 About & Contact Pages  
- CommitFit Studio story & mission  
- Contact form + direct contact details  

---

## 🛠 Tech Stack  

| Area      | Technologies                                      |
|-----------|---------------------------------------------------|
| Frontend  | React, Vite, React Router, Tailwind/CSS Modules   |
| Backend   | Node.js, Express.js                               |
| Database  | MongoDB + Mongoose                                |
| Auth      | JWT Authentication                                |
| Deploy    | Vercel/Netlify + Render/Railway + MongoDB Atlas   |
| Tools     | Git, VS Code, Postman                             |

---

## 📂 Project Structure  

```text
CommitFit-Studio/
├─ frontend/
│  ├─ src/
│  │  ├─ pages/
│  │  │  ├─ Dashboard/
│  │  │  ├─ Members/
│  │  │  ├─ Attendance/
│  │  │  ├─ Classes/
│  │  │  ├─ Billing/
│  │  │  ├─ Reports/
│  │  │  ├─ Settings/
│  │  │  ├─ AboutGym/
│  │  │  └─ Contact/
│  │  ├─ layouts/          # AdminLayout
│  │  ├─ components/       # UI & shared components
│  │  ├─ context/          # AuthContext, etc.
│  │  ├─ services/         # API clients
│  │  ├─ config/
│  │  │  └─ gymProfile.ts  # CommitFit Studio info
│  │  └─ router/
│  └─ ...
│
├─ backend/
│  ├─ src/
│  │  ├─ controllers/      # auth, members, attendance, dashboard
│  │  ├─ models/           # User, Member, Attendance, Payment (future)
│  │  ├─ routes/           # route definitions
│  │  ├─ middleware/       # auth, error handler, validation
│  │  ├─ services/         # business logic
│  │  ├─ utils/            # helpers (jwt, logger, dates)
│  │  ├─ config/           # db & env setup
│  │  ├─ app.ts
│  │  └─ server.ts
│  └─ ...
│
└─ README.md
````

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/commitfit-studio.git
cd commitfit-studio
```

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run (usually) on:
`http://localhost:5173/` or similar (as per Vite config).

### 3️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will run on:
`http://localhost:5000/` (or the port you configure).

### 4️⃣ Environment Variables

Create a `.env` file in the **backend** directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=5000
```

Optionally, for frontend, create `.env` in **frontend**:

```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## 🧪 API Testing

You can test the backend with **Postman**, **Insomnia**, or **Thunder Client**.

Common endpoints:

### Auth

* `POST /api/auth/login`

  * Body: `{ "email": "admin@example.com", "password": "admin123" }`

### Members

* `GET /api/members` – list all members
* `POST /api/members` – create a member
* `GET /api/members/:id` – fetch details
* `PUT /api/members/:id` – update

### Attendance

* `POST /api/attendance/checkin` – mark check-in
* `GET /api/attendance/today` – today’s check-ins

### Dashboard

* `GET /api/dashboard/summary` – key metrics

(Exact URLs may vary depending on your implementation.)

---

## 🚀 Deployment

Recommended deployment setup:

### Frontend

* Deploy to **Vercel** or **Netlify**
* Build command: `npm run build`
* Output directory: `dist`

### Backend

* Deploy to **Render**, **Railway**, or **AWS/DigitalOcean**
* Start command: `node dist/server.js` or `npm start` (depending on build)

### Database

* Use **MongoDB Atlas** for cloud database
* Update `MONGO_URI` in `.env` with your Atlas connection string

---

## 🌱 Future Enhancements

* Online payment integration (UPI, cards, wallets)
* Membership expiry email/SMS reminders
* Role-based access: Admin / Trainer / Staff
* Mobile app (React Native / Flutter)
* Advanced analytics & custom reports
* Export data to CSV/Excel

---

## 👤 CommitFit Studio

**CommitFit Studio – Stronger Every Day**

📞 **9835736553**
📧 **[commitfitstudio@gmail.com](mailto:commitfitstudio@gmail.com)**
📍 **Ranchi, Jharkhand, India**

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m "Add some feature"`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📜 License

This project is intended for **learning, portfolio, and internal gym use**.
For commercial use, please contact the owner of the repository or CommitFit Studio.

---

### ⭐ If you like this project, don’t forget to star the repo!

