import { errorResponse } from '../utils/apiResponse.js';

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return errorResponse(res, 'Validation Error', 400, errors);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return errorResponse(res, `${field} already exists`, 400);
    }

    // Mongoose cast error (invalid ObjectId)
    if (err.name === 'CastError') {
        return errorResponse(res, 'Invalid ID format', 400);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return errorResponse(res, 'Invalid token', 401);
    }

    if (err.name === 'TokenExpiredError') {
        return errorResponse(res, 'Token expired', 401);
    }

    // Default error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return errorResponse(res, message, statusCode);
};

export default errorHandler;
