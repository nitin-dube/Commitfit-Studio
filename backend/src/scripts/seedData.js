import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Member from '../models/Member.js';
import Attendance from '../models/Attendance.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

// Seed data
const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Member.deleteMany({});
        await Attendance.deleteMany({});

        // Create admin user
        console.log('👤 Creating admin user...');
        await User.create({
            name: 'Commitfit Admin',
            email: 'commitfitstudio@gmail.com',
            password: 'admin123', // Keeping default password for now, user can change later
            role: 'admin'
        });

        // Create sample members
        console.log('👥 Creating sample members...');
        const members = await Member.create([
            {
                memberId: 'M001',
                name: 'Rajesh Kumar',
                phone: '9876543210',
                email: 'rajesh@example.com',
                plan: 'Monthly',
                startDate: new Date('2024-11-01'),
                endDate: new Date('2024-12-01'),
                status: 'Active',
                notes: 'Regular member'
            },
            {
                memberId: 'M002',
                name: 'Priya Sharma',
                phone: '9876543211',
                email: 'priya@example.com',
                plan: 'Quarterly',
                startDate: new Date('2024-10-15'),
                endDate: new Date('2025-01-15'),
                status: 'Active',
                notes: 'Personal training sessions'
            },
            {
                memberId: 'M003',
                name: 'Amit Patel',
                phone: '9876543212',
                email: 'amit@example.com',
                plan: 'Monthly',
                startDate: new Date('2024-10-01'),
                endDate: new Date('2024-11-01'),
                status: 'Expired',
                notes: 'Needs renewal reminder'
            },
            {
                memberId: 'M004',
                name: 'Sneha Reddy',
                phone: '9876543213',
                email: 'sneha@example.com',
                plan: 'Annual',
                startDate: new Date('2024-01-01'),
                endDate: new Date('2025-01-01'),
                status: 'Active',
                notes: 'Premium member'
            },
            {
                memberId: 'M005',
                name: 'Vikram Singh',
                phone: '9876543214',
                email: 'vikram@example.com',
                plan: 'Monthly',
                startDate: new Date('2024-11-15'),
                endDate: new Date('2024-12-15'),
                status: 'Active',
                notes: 'Interested in yoga classes'
            },
            {
                memberId: 'M006',
                name: 'Anita Desai',
                phone: '9876543215',
                email: 'anita@example.com',
                plan: 'Free Trial',
                startDate: new Date('2024-11-25'),
                endDate: new Date('2024-12-02'),
                status: 'Active',
                notes: 'Free trial period'
            }
        ]);

        // Create today's check-ins
        console.log('✅ Creating attendance records...');
        const today = new Date();

        await Attendance.create([
            {
                memberId: members[0]._id,
                memberName: members[0].name,
                checkinTime: new Date(today.setHours(6, 30))
            },
            {
                memberId: members[1]._id,
                memberName: members[1].name,
                checkinTime: new Date(today.setHours(7, 15))
            },
            {
                memberId: members[3]._id,
                memberName: members[3].name,
                checkinTime: new Date(today.setHours(8, 0))
            },
            {
                memberId: members[4]._id,
                memberName: members[4].name,
                checkinTime: new Date(today.setHours(9, 30))
            }
        ]);

        console.log('\n✅ Database seeded successfully!');
        console.log('\n📊 Summary:');
        console.log('   - 1 Admin user created');
        console.log('   - 6 Members created');
        console.log('   - 4 Check-ins created');
        console.log('\n🔐 Login Credentials:');
        console.log('   Email: admin@gym.com');
        console.log('   Password: admin123\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run seeding
seedData();
