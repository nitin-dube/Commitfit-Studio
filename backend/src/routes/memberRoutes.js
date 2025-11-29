import express from 'express';
import {
    getMembers,
    getMember,
    createMember,
    updateMember,
    updateMemberStatus,
    deleteMember
} from '../controllers/memberController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.route('/')
    .get(getMembers)
    .post(createMember);

router.route('/:id')
    .get(getMember)
    .put(updateMember)
    .delete(deleteMember);

router.patch('/:id/status', updateMemberStatus);

export default router;
