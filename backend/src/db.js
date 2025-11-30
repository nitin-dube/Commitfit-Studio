import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the JSON database file
const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

// Default database structure
const DEFAULT_DB = {
    users: [],
    members: [],
    attendance: []
};

// Ensure data directory and file exist
function ensureDbFile() {
    const dataDir = path.dirname(DB_PATH);
    
    // Create data directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
        console.log('📁 Created data directory');
    }
    
    // Create db.json if it doesn't exist
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DB, null, 2));
        console.log('📄 Created db.json file');
    }
}

// Read the database
export function readDb() {
    try {
        ensureDbFile();
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading database:', error);
        return DEFAULT_DB;
    }
}

// Write to the database
export function writeDb(data) {
    try {
        ensureDbFile();
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing to database:', error);
        return false;
    }
}

// Generate unique ID
export function generateId(prefix = '') {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return prefix ? `${prefix}${timestamp}${random}` : `${timestamp}${random}`;
}

// Initialize database with seed admin user
export async function initDb() {
    try {
        ensureDbFile();
        const db = readDb();
        
        // Check if admin user already exists
        const adminExists = db.users.some(user => user.email === 'admin@commitfitstudio.com');
        
        if (!adminExists) {
            console.log('🔧 Creating admin user...');
            
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            
            // Create admin user
            const adminUser = {
                id: generateId(),
                name: 'Admin',
                email: 'admin@commitfitstudio.com',
                password: hashedPassword,
                role: 'admin',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            db.users.push(adminUser);
            writeDb(db);
            
            console.log('✅ Admin user created successfully');
            console.log('📧 Email: admin@commitfitstudio.com');
            console.log('🔑 Password: admin123');
        } else {
            console.log('✅ Admin user already exists');
        }
        
        console.log('✅ Database initialized successfully');
        console.log(`📊 Users: ${db.users.length}`);
        console.log(`👥 Members: ${db.members.length}`);
        console.log(`📋 Attendance: ${db.attendance.length}`);
        
        return true;
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        throw error;
    }
}

// User operations
export const userDb = {
    // Find user by email
    findByEmail: (email) => {
        const db = readDb();
        return db.users.find(user => user.email.toLowerCase() === email.toLowerCase());
    },
    
    // Find user by ID
    findById: (id) => {
        const db = readDb();
        return db.users.find(user => user.id === id);
    },
    
    // Create new user
    create: async (userData) => {
        const db = readDb();
        
        // Check if user exists
        const existingUser = db.users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
        if (existingUser) {
            throw new Error('User already exists with this email');
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        
        const newUser = {
            id: generateId(),
            name: userData.name,
            email: userData.email.toLowerCase(),
            password: hashedPassword,
            role: userData.role || 'admin',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        db.users.push(newUser);
        writeDb(db);
        
        return newUser;
    },
    
    // Compare password
    comparePassword: async (plainPassword, hashedPassword) => {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
};

// Member operations
export const memberDb = {
    // Get all members
    findAll: (query = {}) => {
        const db = readDb();
        let members = [...db.members];
        
        // Apply search filter if provided
        if (query.search) {
            const searchLower = query.search.toLowerCase();
            members = members.filter(m => 
                m.name.toLowerCase().includes(searchLower) ||
                m.memberId.toLowerCase().includes(searchLower) ||
                m.phone.includes(searchLower)
            );
        }
        
        // Sort by createdAt (newest first)
        members.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        return members;
    },
    
    // Find member by ID
    findById: (id) => {
        const db = readDb();
        return db.members.find(member => member.id === id);
    },
    
    // Find member by memberId or phone
    findByMemberIdOrPhone: (memberIdOrPhone) => {
        const db = readDb();
        return db.members.find(m => 
            m.memberId === memberIdOrPhone || m.phone === memberIdOrPhone
        );
    },
    
    // Create new member
    create: (memberData) => {
        const db = readDb();
        
        // Generate member ID
        const count = db.members.length;
        const memberId = `M${String(count + 1).padStart(3, '0')}`;
        
        const newMember = {
            id: generateId(),
            memberId,
            name: memberData.name,
            phone: memberData.phone,
            email: memberData.email.toLowerCase(),
            plan: memberData.plan,
            startDate: memberData.startDate,
            endDate: memberData.endDate,
            status: memberData.status || 'Active',
            notes: memberData.notes || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        db.members.push(newMember);
        writeDb(db);
        
        return newMember;
    },
    
    // Update member
    update: (id, updateData) => {
        const db = readDb();
        const memberIndex = db.members.findIndex(m => m.id === id);
        
        if (memberIndex === -1) {
            return null;
        }
        
        db.members[memberIndex] = {
            ...db.members[memberIndex],
            ...updateData,
            updatedAt: new Date().toISOString()
        };
        
        writeDb(db);
        return db.members[memberIndex];
    },
    
    // Count members
    count: (query = {}) => {
        const db = readDb();
        if (query.status) {
            return db.members.filter(m => m.status === query.status).length;
        }
        return db.members.length;
    }
};

// Attendance operations
export const attendanceDb = {
    // Get all attendance records
    findAll: (query = {}) => {
        const db = readDb();
        let records = [...db.attendance];
        
        // Filter by date range if provided
        if (query.startDate) {
            records = records.filter(r => 
                new Date(r.checkinTime) >= new Date(query.startDate)
            );
        }
        
        // Sort by checkinTime (newest first)
        records.sort((a, b) => new Date(b.checkinTime) - new Date(a.checkinTime));
        
        return records;
    },
    
    // Find attendance by member ID and date
    findByMemberAndDate: (memberId, date) => {
        const db = readDb();
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        
        return db.attendance.find(a => 
            a.memberId === memberId &&
            new Date(a.checkinTime) >= startOfDay &&
            new Date(a.checkinTime) <= endOfDay
        );
    },
    
    // Create attendance record
    create: (attendanceData) => {
        const db = readDb();
        
        const newAttendance = {
            id: generateId(),
            memberId: attendanceData.memberId,
            memberName: attendanceData.memberName,
            checkinTime: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        db.attendance.push(newAttendance);
        writeDb(db);
        
        return newAttendance;
    },
    
    // Count attendance records
    count: (query = {}) => {
        const db = readDb();
        let records = db.attendance;
        
        if (query.startDate) {
            records = records.filter(r => 
                new Date(r.checkinTime) >= new Date(query.startDate)
            );
        }
        
        return records.length;
    }
};

export default {
    initDb,
    readDb,
    writeDb,
    generateId,
    userDb,
    memberDb,
    attendanceDb
};
