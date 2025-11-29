import Member from '../models/Member.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// @desc    Get all members
// @route   GET /api/members
// @access  Private
export const getMembers = async (req, res, next) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { memberId: { $regex: search, $options: 'i' } },
                    { phone: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const members = await Member.find(query).sort({ createdAt: -1 });

        return successResponse(res, members, 'Members retrieved successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Get single member
// @route   GET /api/members/:id
// @access  Private
export const getMember = async (req, res, next) => {
    try {
        const member = await Member.findById(req.params.id);

        if (!member) {
            return errorResponse(res, 'Member not found', 404);
        }

        return successResponse(res, member, 'Member retrieved successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Create new member
// @route   POST /api/members
// @access  Private
export const createMember = async (req, res, next) => {
    try {
        const member = await Member.create(req.body);

        return successResponse(res, member, 'Member created successfully', 201);
    } catch (error) {
        next(error);
    }
};

// @desc    Update member
// @route   PUT /api/members/:id
// @access  Private
export const updateMember = async (req, res, next) => {
    try {
        const member = await Member.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!member) {
            return errorResponse(res, 'Member not found', 404);
        }

        return successResponse(res, member, 'Member updated successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Update member status
// @route   PATCH /api/members/:id/status
// @access  Private
export const updateMemberStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!status) {
            return errorResponse(res, 'Status is required', 400);
        }

        const member = await Member.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!member) {
            return errorResponse(res, 'Member not found', 404);
        }

        return successResponse(res, member, 'Member status updated successfully');
    } catch (error) {
        next(error);
    }
};

// @desc    Delete member (soft delete)
// @route   DELETE /api/members/:id
// @access  Private
export const deleteMember = async (req, res, next) => {
    try {
        const member = await Member.findByIdAndUpdate(
            req.params.id,
            { status: 'Inactive' },
            { new: true }
        );

        if (!member) {
            return errorResponse(res, 'Member not found', 404);
        }

        return successResponse(res, null, 'Member deactivated successfully');
    } catch (error) {
        next(error);
    }
};
