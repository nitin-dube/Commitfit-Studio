import api from './api';

export const loginApi = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return {
            success: true,
            token: response.data.data.token,
            user: response.data.data.user
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Login failed'
        };
    }
};

export const logoutApi = async () => {
    try {
        await api.get('/auth/logout');
        return { success: true };
    } catch (error) {
        return { success: true }; // Logout locally anyway
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await api.get('/auth/me');
        return {
            success: true,
            user: response.data.data
        };
    } catch (error) {
        return {
            success: false,
            error: 'Not authenticated'
        };
    }
};
