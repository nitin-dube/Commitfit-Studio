import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    memberName: {
        type: String,
        required: true
    },
    checkinTime: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster date-based queries
attendanceSchema.index({ checkinTime: -1 });
attendanceSchema.index({ memberId: 1, checkinTime: -1 });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
