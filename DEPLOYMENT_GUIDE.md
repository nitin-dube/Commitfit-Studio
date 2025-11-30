# 🚀 Deployment Guide - CommitFit Studio

Complete deployment guide for CommitFit Studio with JSON Database

---

## 📦 What You Need

- ✅ GitHub account
- ✅ Render account (for backend)
- ✅ Vercel account (for frontend)
- ✅ Updated backend code (JSON database, no MongoDB)

---

## PART 1️⃣: Deploy Backend to Render

### Step 1: Prepare Your Repository

```bash
# Navigate to your project
cd "c:\Users\NITIN DUBEY\Desktop\Project"

# Add all changes
git add .

# Commit changes
git commit -m "Migrated to JSON database, removed MongoDB"

# Push to GitHub
git push origin main
```

### Step 2: Create Web Service on Render

1. **Login to Render**: Visit [https://dashboard.render.com/](https://dashboard.render.com/)

2. **Click "New +"** → Select **"Web Service"**

3. **Connect Repository**:
   - Select "Connect a repository"
   - Choose your GitHub account
   - Select the `Project` repository

4. **Configure Service**:
   ```
   Name: commitfit-studio
   Environment: Node
   Region: Choose closest to you
   Branch: main
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

5. **Select Plan**:
   - Free tier works fine for testing
   - Note: Free tier has ephemeral storage (database resets on restart)

### Step 3: Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `JWT_SECRET` | `commitfitstudio-secret-key-2024` |
| `FRONTEND_URL` | `https://YOUR-VERCEL-DOMAIN.vercel.app` |

> ⚠️ **IMPORTANT**: Make sure to REMOVE these variables if they exist:
> - `MONGODB_URI`
> - `MONGO_URI`
> - Any other MongoDB-related variables

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (2-5 minutes)
3. You'll get a URL like: `https://commitfit-studio.onrender.com`

### Step 5: Verify Backend Deployment

#### Test Root Endpoint
Open in browser:
```
https://commitfit-studio.onrender.com/
```

Should see:
```json
{
  "success": true,
  "message": "Gym Management System API",
  "version": "1.0.0",
  "endpoints": {...}
}
```

#### Test Login Endpoint
Using curl, PowerShell, or Postman:

**PowerShell:**
```powershell
$body = @{
    email = "admin@commitfitstudio.com"
    password = "admin123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://commitfit-studio.onrender.com/api/auth/login" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
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

✅ **If you see this, backend is working!**

---

## PART 2️⃣: Update Frontend on Vercel

### Step 1: Update Environment Variable

1. **Login to Vercel**: Visit [https://vercel.com/dashboard](https://vercel.com/dashboard)

2. **Select Your Project**: Click on your CommitFit Studio frontend project

3. **Go to Settings**: Click **"Settings"** tab

4. **Environment Variables**: Click **"Environment Variables"**

5. **Update API URL**:
   - Find `VITE_API_URL` variable (or create if doesn't exist)
   - Set value to: `https://commitfit-studio.onrender.com/api`
   - Make sure it's enabled for **Production**, **Preview**, and **Development**

### Step 2: Redeploy Frontend

**Option A: Automatic Redeployment**
```bash
# Make a commit to trigger redeployment
git commit --allow-empty -m "Update API URL to Render backend"
git push origin main
```

**Option B: Manual Redeployment**
1. Go to **"Deployments"** tab in Vercel
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**

### Step 3: Wait for Deployment
- Usually takes 1-2 minutes
- You'll get a notification when complete

---

## PART 3️⃣: Test Full Integration

### Step 1: Open Your Frontend
Visit your Vercel URL:
```
https://your-app-name.vercel.app
```

### Step 2: Test Login
1. Navigate to `/login`
2. Enter credentials:
   - **Email**: `admin@commitfitstudio.com`
   - **Password**: `admin123`
3. Click **Login**

✅ **Expected**: Successful login, redirected to dashboard

### Step 3: Test Features
Try these features to ensure everything works:

1. **Dashboard**: View statistics
2. **Members**: Click "Add Member" and create a test member
3. **Attendance**: Test check-in with member ID
4. **Profile**: View admin profile

---

## 🔍 Troubleshooting

### Issue: "Network Error" on Login

**Solution**:
1. Check Vercel environment variable `VITE_API_URL` is correct
2. Verify Render backend is running (visit root URL)
3. Check CORS settings allow your Vercel domain

### Issue: "Route not found" on API calls

**Solution**:
1. Verify Render environment has `/api` in routes
2. Check `VITE_API_URL` ends with `/api`
3. Ensure backend routes are properly mounted in `server.js`

### Issue: Backend not starting on Render

**Solution**:
1. Check Render logs for errors
2. Verify `package.json` has correct start script
3. Ensure all environment variables are set
4. Check for MongoDB references (should be none)

### Issue: Database resets on Render

**Expected Behavior**:
- Render free tier has ephemeral storage
- Database resets on deployment/restart
- This is normal for free tier

**Solution**:
- Upgrade to paid Render plan for persistent storage
- Or use external database service

---

## 📊 Monitoring

### Check Render Logs
1. Go to Render Dashboard
2. Click your service
3. Click **"Logs"** tab
4. Monitor for errors

### Check Vercel Logs
1. Go to Vercel Dashboard
2. Click your project
3. Click **"Deployments"** → Select latest
4. Click **"View Function Logs"**

---

## 🎉 Success Checklist

- [ ] Backend deployed to Render
- [ ] Backend root endpoint returns JSON
- [ ] Backend login endpoint works
- [ ] Frontend environment variable updated
- [ ] Frontend redeployed on Vercel
- [ ] Login works from frontend
- [ ] Can see dashboard
- [ ] Can create members
- [ ] Can mark attendance

When all checked: **🎊 YOU'RE DONE! 🎊**

---

## 🔗 Quick Reference

### Backend URLs
- **Root**: `https://commitfit-studio.onrender.com/`
- **API**: `https://commitfit-studio.onrender.com/api`
- **Login**: `https://commitfit-studio.onrender.com/api/auth/login`

### Frontend URL
- **Production**: `https://your-app.vercel.app`

### Default Credentials
- **Email**: `admin@commitfitstudio.com`
- **Password**: `admin123`

### Environment Variables

**Render (Backend)**:
```
NODE_ENV=production
PORT=5000
JWT_SECRET=commitfitstudio-secret-key-2024
FRONTEND_URL=https://your-app.vercel.app
```

**Vercel (Frontend)**:
```
VITE_API_URL=https://commitfit-studio.onrender.com/api
```

---

## 📞 Need Help?

1. Check the main [README.md](file:///c:/Users/NITIN%20DUBEY/Desktop/Project/backend/README.md)
2. Review the [Walkthrough](file:///C:/Users/NITIN%20DUBEY/.gemini/antigravity/brain/862248d3-c3cf-4ced-b53b-b683c25a486d/walkthrough.md)
3. Check Render/Vercel documentation
4. Review error logs

---

**Good luck! 🚀**
