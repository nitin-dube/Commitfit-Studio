# CommitFit Studio - Deployment & Mobile Testing Guide

## 📱 1. Mobile Responsiveness Updates
I have updated the application to be fully mobile-friendly:
- **Sidebar**: Now acts as a drawer on mobile (hidden by default, slides in).
- **Topbar**: Added a "Menu" button visible only on mobile.
- **Tables**: Added horizontal scrolling for data tables on small screens.
- **Forms**: Inputs now stack vertically on mobile for better usability.

## 🏠 2. Local Smartphone Testing
You can now test the app on your phone while running it locally on your computer.

### Steps:
1.  **Find your Local IP Address**:
    - **Windows**: Open Command Prompt (`cmd`) and run `ipconfig`. Look for `IPv4 Address` (e.g., `192.168.1.5`).
    - **Mac/Linux**: Run `ifconfig` or `ip a`.

2.  **Start the Server**:
    - Run `npm run dev` in the `gym-management-system` folder.
    - I added the `--host` flag, so it will show a "Network" URL like `http://192.168.1.5:5173`.

3.  **Open on Phone**:
    - Connect your phone to the **same Wi-Fi network** as your computer.
    - Open Chrome/Safari on your phone.
    - Type the Network URL (e.g., `http://192.168.1.5:5173`).

4.  **Backend Connection**:
    - I updated the backend CORS settings to allow requests from local network IPs.
    - Ensure your backend is running (`npm run dev` in `backend` folder).
    - **Note**: If your phone cannot connect to the backend (login fails), you might need to update `VITE_API_URL` in your frontend `.env` (or `apiClient.js`) to use your computer's IP instead of `localhost`.
    - Example: Change `http://localhost:5000/api` to `http://192.168.1.5:5000/api`.

## 🚀 3. Vercel Deployment (Frontend)

### Prerequisites:
- Push your latest code to GitHub.

### Steps:
1.  **Go to Vercel Dashboard** and click **"Add New..."** -> **"Project"**.
2.  **Import** your `Commitfit-Studio` repository.
3.  **Configure Project**:
    - **Project Name**: `commitfit-studio` (or similar).
    - **Framework Preset**: Vite (should be auto-detected).
    - **Root Directory**: Click `Edit` and select `gym-management-system`.
4.  **Environment Variables**:
    - Add `VITE_API_URL`.
    - Value: The URL of your deployed backend (see Section 4).
    - *For now, if you don't have a deployed backend, you can put a placeholder, but the app won't fetch data.*
5.  **Deploy**: Click "Deploy".

### Final URL:
Your app will be available at something like: `https://commitfit-studio.vercel.app`.

## ☁️ 4. Backend Deployment (Render/Railway)

Since you have a Node.js/Express backend, **Render** or **Railway** are great choices.

### Example: Render Deployment
1.  Create a new **Web Service** on Render.
2.  Connect your GitHub repo.
3.  **Root Directory**: `backend`.
4.  **Build Command**: `npm install`.
5.  **Start Command**: `npm start`.
6.  **Environment Variables**:
    - `MONGODB_URI`: Your MongoDB connection string (from Atlas).
    - `JWT_SECRET`: A secure random string.
    - `FRONTEND_URL`: `https://commitfit-studio.vercel.app` (Your Vercel frontend URL).
    - `NODE_ENV`: `production`.
7.  **Deploy**. Render will give you a URL like `https://commitfit-backend.onrender.com`.

### 🔗 Connecting Frontend & Backend
1.  Copy the Backend URL (e.g., `https://commitfit-backend.onrender.com`).
2.  Go to your **Vercel Project Settings** -> **Environment Variables**.
3.  Edit `VITE_API_URL` and paste the backend URL + `/api`.
    - Example: `https://commitfit-backend.onrender.com/api`
4.  **Redeploy** the Frontend on Vercel for changes to take effect.

## ✅ 5. Final Checklist
- [x] **Mobile Layout**: Sidebar toggles, tables scroll, forms stack.
- [x] **Local Access**: `npm run dev` exposes Network URL.
- [x] **CORS**: Backend allows local IPs and Vercel domain.
- [x] **Deployment**: Ready for Vercel (Frontend) and Render (Backend).
