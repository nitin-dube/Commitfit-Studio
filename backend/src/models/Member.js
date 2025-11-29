import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    memberId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true
    },
    plan: {
        type: String,
        enum: ['Monthly', 'Quarterly', 'Annual', 'Free Trial'],
        required: [true, 'Plan is required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    status: {
        type: String,
        enum: ['Active', 'Expired', 'Inactive'],
        default: 'Active'
    },
    notes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Auto-generate memberId before saving
memberSchema.pre('save', async function (next) {
    if (!this.isNew || this.memberId) {
        return next();
    }

    // Get the count of members to generate ID
    const count = await mongoose.model('Member').countDocuments();
    this.memberId = `M${String(count + 1).padStart(3, '0')}`;
    next();
});

// Index for faster searches
memberSchema.index({ name: 'text', memberId: 'text', phone: 'text' });

const Member = mongoose.model('Member', memberSchema);

export default Member;
