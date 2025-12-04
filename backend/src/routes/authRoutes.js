import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { resetDatabase } from '../controllers/dbResetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/reset-db', resetDatabase); // Emergency database reset

export default router;
