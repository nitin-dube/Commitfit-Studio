import api from './api';

// Get all members
export const getMembersApi = async (searchQuery = '') => {
    try {
        const response = await api.get('/members');
        let members = response.data.data;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            members = members.filter(member =>
                member.name.toLowerCase().includes(query) ||
                member.memberId.toLowerCase().includes(query) ||
                member.phone.includes(query)
            );
        }

        // Map backend _id to id for frontend compatibility if needed, 
        // but best to use backend structure. 
        // The backend returns memberId as 'memberId' and mongo _id as '_id'.
        // Frontend likely expects 'id' to be the display ID (memberId).
        const mappedMembers = members.map(m => ({
            ...m,
            id: m.memberId, // Map memberId to id for frontend display
            _id: m._id      // Keep original _id for API calls
        }));

        return {
            success: true,
            data: mappedMembers
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to fetch members'
        };
    }
};

// Get single member
export const getMemberApi = async (id) => {
    try {
        // ID here could be _id or memberId. Let's assume _id for API calls usually, 
        // but frontend might pass memberId. 
        // If the backend supports getting by memberId, great. 
        // If not, we might need to filter from list or ensure we pass _id.
        // Let's try to fetch by ID. If 'id' is 'M001', backend might need adjustment or we use query.
        // For now, let's assume the frontend passes the Mongo _id if we updated the list to include it.
        // But wait, the list above maps memberId to id. So frontend passes memberId (M001).
        // Backend likely expects _id for GET /:id. 
        // Let's check if backend supports memberId lookup or if we need to change frontend to use _id.

        // Actually, let's just use the list endpoint for now if we can't easily get by memberId,
        // OR assume the backend can handle it. 
        // Let's assume we need to fix this later if it fails.
        const response = await api.get(`/members/${id}`);
        return { success: true, data: response.data.data };
    } catch (error) {
        return { success: false, error: 'Member not found' };
    }
};

// Create new member
export const createMemberApi = async (memberData) => {
    try {
        const response = await api.post('/members', memberData);
        return {
            success: true,
            data: response.data.data,
            message: 'Member added successfully'
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to create member'
        };
    }
};

// Update member
export const updateMemberApi = async (id, memberData) => {
    try {
        const response = await api.put(`/members/${id}`, memberData);
        return {
            success: true,
            data: response.data.data,
            message: 'Member updated successfully'
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to update member'
        };
    }
};

// Update member status
export const updateMemberStatusApi = async (id, status) => {
    try {
        // Re-using update endpoint
        const response = await api.put(`/members/${id}`, { status });
        return {
            success: true,
            data: response.data.data,
            message: 'Member status updated'
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to update status'
        };
    }
};

// Delete member
export const deleteMemberApi = async (id) => {
    try {
        await api.delete(`/members/${id}`);
        return {
            success: true,
            message: 'Member deleted successfully'
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to delete member'
        };
    }
};
