import Attendance from '../models/Attendance.js';
import Member from '../models/Member.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// @desc    Mark check-in
// @route   POST /api/attendance/checkin
// @access  Private
export const markCheckin = async (req, res, next) => {
    try {
        const { memberIdOrPhone } = req.body;

        if (!memberIdOrPhone) {
            return errorResponse(res, 'Member ID or Phone is required', 400);
        }

        // Find member
        const member = await Member.findOne({
            $or: [
                { memberId: memberIdOrPhone },
                { phone: memberIdOrPhone }
            ]
        });

        if (!member) {
            return errorResponse(res, 'Member not found', 404);
        }

        // Check if member is active
        if (member.status !== 'Active') {
            return errorResponse(res, `Cannot check in. Membership status: ${member.status}`, 400);
        }

        // Check if already checked in today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingCheckin = await Attendance.findOne({
            memberId: member._id,
            checkinTime: { $gte: today }
        });

        if (existingCheckin) {
            return errorResponse(res, 'Member already checked in today', 400);
        }

        // Create check-in record
        const attendance = await Attendance.create({
            memberId: member._id,
            memberName: member.name
        });

        return successResponse(
            res,
            {
                id: attendance._id,
                memberId: member._id,
                memberName: member.name,
                checkinTime: attendance.checkinTime
            },
            `Check-in successful for ${member.name}`,
            201
        );
    } catch (error) {
        next(error);
    }
};

// @desc    Get today's check-ins
// @route   GET /api/attendance/today
// @access  Private
export const getTodayCheckins = async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const checkins = await Attendance.find({
            checkinTime: { $gte: today }
        }).sort({ checkinTime: -1 });

        // Format response
        const formattedCheckins = checkins.map(c => ({
            id: c._id,
            memberId: c.memberId,
            memberName: c.memberName,
            checkinTime: c.checkinTime
        }));

        return successResponse(res, formattedCheckins, 'Today\'s check-ins retrieved successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Get weekly check-ins data
// @route   GET /api/attendance/week
// @access  Private
export const getWeeklyCheckins = async (req, res, next) => {
    try {
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        const checkins = await Attendance.find({
            checkinTime: { $gte: weekAgo }
        });

        // Group by day
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weekData = {};

        // Initialize all days with 0
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekAgo.getTime() + i * 24 * 60 * 60 * 1000);
            const dayName = dayNames[date.getDay()];
            weekData[dayName] = 0;
        }

        // Count check-ins per day
        checkins.forEach(checkin => {
            const dayName = dayNames[new Date(checkin.checkinTime).getDay()];
            weekData[dayName]++;
        });

        // Format for frontend
        const chartData = Object.keys(weekData).map(day => ({
            day,
            count: weekData[day]
        }));

        return successResponse(res, chartData, 'Weekly check-ins data retrieved successfully');
    } catch (error) {
        next(error);
    }
};
