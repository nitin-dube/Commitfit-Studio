import { memberDb } from '../db.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// @desc    Get all members
// @route   GET /api/members
// @access  Private
export const getMembers = async (req, res, next) => {
    try {
        const { search } = req.query;
        const members = memberDb.findAll({ search });

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
        const member = memberDb.findById(req.params.id);

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
        const member = memberDb.create(req.body);

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
        const member = memberDb.update(req.params.id, req.body);

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

        const member = memberDb.update(req.params.id, { status });

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
        const member = memberDb.update(req.params.id, { status: 'Inactive' });

        if (!member) {
            return errorResponse(res, 'Member not found', 404);
        }

        return successResponse(res, null, 'Member deactivated successfully');
    } catch (error) {
        next(error);
    }
};
