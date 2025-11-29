import Member from '../models/Member.js';
import Attendance from '../models/Attendance.js';
import { successResponse } from '../utils/apiResponse.js';

// @desc    Get dashboard summary
// @route   GET /api/dashboard/summary
// @access  Private
export const getDashboardSummary = async (req, res, next) => {
    try {
        // Total members
        const totalMembers = await Member.countDocuments();

        // Active members
        const activeMembers = await Member.countDocuments({ status: 'Active' });

        // Today's check-ins
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todaysCheckins = await Attendance.countDocuments({
            checkinTime: { $gte: today }
        });

        // Pending payments (mock for now - would need Payment model)
        // Calculate based on expired members or members nearing expiry
        const pendingPayments = await Member.countDocuments({ status: 'Expired' });

        const summary = {
            totalMembers,
            activeMembers,
            todaysCheckins,
            pendingPayments
        };

        return successResponse(res, summary, 'Dashboard summary retrieved successfully');
    } catch (error) {
        next(error);
    }
};
