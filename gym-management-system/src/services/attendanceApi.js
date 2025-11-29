import api from './api';

// Mark check-in
export const markCheckinApi = async (memberIdOrPhone) => {
    try {
        const response = await api.post('/attendance/check-in', {
            memberId: memberIdOrPhone
        });
        return {
            success: true,
            data: response.data.data,
            message: response.data.message
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Check-in failed'
        };
    }
};

// Get today's check-ins
export const getTodayCheckinsApi = async () => {
    try {
        const response = await api.get('/attendance/today');
        return {
            success: true,
            data: response.data.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to fetch check-ins'
        };
    }
};

// Get weekly check-ins for chart
export const getWeeklyCheckinsApi = async () => {
    try {
        const response = await api.get('/attendance/week');
        return {
            success: true,
            data: response.data.data  // Backend returns array of {day, count}
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to fetch weekly stats',
            data: []  // Return empty array on error
        };
    }
};

// Get dashboard summary
export const getDashboardSummaryApi = async () => {
    try {
        const response = await api.get('/dashboard/summary');
        return {
            success: true,
            data: response.data.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to fetch dashboard stats'
        };
    }
};
