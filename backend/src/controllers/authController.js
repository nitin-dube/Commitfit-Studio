import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return errorResponse(res, 'User already exists with this email', 400);
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'admin'
        });

        return successResponse(res, null, 'User registered successfully', 201);
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return errorResponse(res, 'Please provide email and password', 400);
        }

        // Find user (include password for comparison)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return errorResponse(res, 'Invalid credentials', 401);
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return errorResponse(res, 'Invalid credentials', 401);
        }

        // Generate token
        const token = generateToken(user._id);

        // Remove password from output
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        return successResponse(res, { token, user: userResponse }, 'Login successful');
    } catch (error) {
        next(error);
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
    try {
        const user = {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        };

        return successResponse(res, user, 'User retrieved successfully');
    } catch (error) {
        next(error);
    }
};
