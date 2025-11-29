import express from 'express';
import {
    markCheckin,
    getTodayCheckins,
    getWeeklyCheckins
} from '../controllers/attendanceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post('/checkin', markCheckin);
router.get('/today', getTodayCheckins);
router.get('/week', getWeeklyCheckins);

export default router;
