import { memberDb, attendanceDb } from '../db.js';
import { successResponse } from '../utils/apiResponse.js';

// @desc    Get dashboard summary
// @route   GET /api/dashboard/summary
// @access  Private
export const getDashboardSummary = async (req, res, next) => {
    try {
        // Total members
        const totalMembers = memberDb.count();

        // Active members
        const activeMembers = memberDb.count({ status: 'Active' });

        // Today's check-ins
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todaysCheckins = attendanceDb.count({ startDate: today });

        // Pending payments (mock for now - would need Payment model)
        // Calculate based on expired members or members nearing expiry
        const pendingPayments = memberDb.count({ status: 'Expired' });

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
