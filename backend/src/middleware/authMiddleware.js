import User from '../models/User.js';
import { verifyToken } from '../utils/jwt.js';
import { errorResponse } from '../utils/apiResponse.js';

export const protect = async (req, res, next) => {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return errorResponse(res, 'Not authorized to access this route', 401);
    }

    try {
        // Verify token
        const decoded = verifyToken(token);

        if (!decoded) {
            return errorResponse(res, 'Invalid or expired token', 401);
        }

        // Get user from token
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return errorResponse(res, 'User not found', 404);
        }

        req.user = user;
        next();
    } catch (error) {
        return errorResponse(res, 'Not authorized to access this route', 401);
    }
};
