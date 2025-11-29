import express from 'express';
import authRoutes from './authRoutes.js';
import memberRoutes from './memberRoutes.js';
import attendanceRoutes from './attendanceRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/members', memberRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/dashboard', dashboardRoutes);

// Health check route
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

export default router;
