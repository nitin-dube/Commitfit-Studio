// Mock data for the Gym Management System

// Admin User
export const adminUser = {
    id: '1',
    email: 'admin@gym.com',
    password: 'admin123', // In production, this would be hashed
    name: 'Admin User',
    role: 'admin'
};

// Sample Members Data
export const mockMembers = [
    {
        id: 'M001',
        name: 'Rajesh Kumar',
        phone: '9876543210',
        email: 'rajesh@example.com',
        plan: 'Monthly',
        startDate: '2024-11-01',
        endDate: '2024-12-01',
        status: 'Active',
        notes: 'Regular member',
        createdAt: '2024-11-01'
    },
    {
        id: 'M002',
        name: 'Priya Sharma',
        phone: '9876543211',
        email: 'priya@example.com',
        plan: 'Quarterly',
        startDate: '2024-10-15',
        endDate: '2025-01-15',
        status: 'Active',
        notes: 'Personal training sessions',
        createdAt: '2024-10-15'
    },
    {
        id: 'M003',
        name: 'Amit Patel',
        phone: '9876543212',
        email: 'amit@example.com',
        plan: 'Monthly',
        startDate: '2024-10-01',
        endDate: '2024-11-01',
        status: 'Expired',
        notes: 'Needs renewal reminder',
        createdAt: '2024-10-01'
    },
    {
        id: 'M004',
        name: 'Sneha Reddy',
        phone: '9876543213',
        email: 'sneha@example.com',
        plan: 'Annual',
        startDate: '2024-01-01',
        endDate: '2025-01-01',
        status: 'Active',
        notes: 'Premium member',
        createdAt: '2024-01-01'
    },
    {
        id: 'M005',
        name: 'Vikram Singh',
        phone: '9876543214',
        email: 'vikram@example.com',
        plan: 'Monthly',
        startDate: '2024-11-15',
        endDate: '2024-12-15',
        status: 'Active',
        notes: 'Interested in yoga classes',
        createdAt: '2024-11-15'
    },
    {
        id: 'M006',
        name: 'Anita Desai',
        phone: '9876543215',
        email: 'anita@example.com',
        plan: 'Free Trial',
        startDate: '2024-11-25',
        endDate: '2024-12-02',
        status: 'Active',
        notes: 'Free trial period',
        createdAt: '2024-11-25'
    }
];

// Sample Attendance Data
export const mockAttendance = [
    {
        id: 'A001',
        memberId: 'M001',
        memberName: 'Rajesh Kumar',
        checkinTime: '2024-11-28T06:30:00',
        createdAt: '2024-11-28T06:30:00'
    },
    {
        id: 'A002',
        memberId: 'M002',
        memberName: 'Priya Sharma',
        checkinTime: '2024-11-28T07:15:00',
        createdAt: '2024-11-28T07:15:00'
    },
    {
        id: 'A003',
        memberId: 'M004',
        memberName: 'Sneha Reddy',
        checkinTime: '2024-11-28T08:00:00',
        createdAt: '2024-11-28T08:00:00'
    },
    {
        id: 'A004',
        memberId: 'M005',
        memberName: 'Vikram Singh',
        checkinTime: '2024-11-28T09:30:00',
        createdAt: '2024-11-28T09:30:00'
    }
];

// Dashboard Statistics
export const mockDashboardStats = {
    totalMembers: mockMembers.length,
    activeMembers: mockMembers.filter(m => m.status === 'Active').length,
    todaysCheckins: mockAttendance.length,
    pendingPayments: 3 // This would be calculated from billing data
};

// Weekly Check-ins Data (for chart)
export const mockWeeklyCheckins = [
    { day: 'Mon', count: 15 },
    { day: 'Tue', count: 22 },
    { day: 'Wed', count: 18 },
    { day: 'Thu', count: 25 },
    { day: 'Fri', count: 20 },
    { day: 'Sat', count: 30 },
    { day: 'Sun', count: 12 }
];

// Helper function to generate new member ID
export const generateMemberId = () => {
    const lastId = mockMembers[mockMembers.length - 1]?.id || 'M000';
    const num = parseInt(lastId.substring(1)) + 1;
    return `M${String(num).padStart(3, '0')}`;
};

// Helper function to format date
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

// Helper function to format time
export const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

// Helper function to check if membership is expiring soon (within 7 days)
export const isExpiringSoon = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 7;
};
