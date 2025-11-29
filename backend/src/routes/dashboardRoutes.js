import express from 'express';
import { getDashboardSummary } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/summary', getDashboardSummary);

export default router;
