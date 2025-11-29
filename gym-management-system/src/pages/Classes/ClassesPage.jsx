import { useState } from 'react';
import { FiPlus, FiClock, FiUsers, FiTrendingUp } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import './ClassesPage.css';

// Dummy data for classes
const dummyClasses = [
    { id: 1, name: 'Morning Yoga', trainer: 'Priya Sharma', day: 'Mon, Wed, Fri', time: '6:00 AM - 7:00 AM', capacity: 15, enrolled: 12, level: 'Beginner', status: 'Active' },
    { id: 2, name: 'CrossFit Training', trainer: 'Rajesh Kumar', day: 'Tue, Thu, Sat', time: '7:00 AM - 8:30 AM', capacity: 20, enrolled: 18, level: 'Advanced', status: 'Active' },
    { id: 3, name: 'Zumba Dance', trainer: 'Sneha Reddy', day: 'Mon, Wed, Fri', time: '6:00 PM - 7:00 PM', capacity: 25, enrolled: 22, level: 'All Levels', status: 'Active' },
    { id: 4, name: 'Strength & Conditioning', trainer: 'Vikram Singh', day: 'Daily', time: '5:00 PM - 6:30 PM', capacity: 15, enrolled: 15, level: 'Intermediate', status: 'Full' },
    { id: 5, name: 'Functional Fitness', trainer: 'Amit Patel', day: 'Tue, Thu', time: '8:00 AM - 9:00 AM', capacity: 12, enrolled: 8, level: 'Intermediate', status: 'Active' },
    { id: 6, name: 'Evening Meditation', trainer: 'Anita Desai', day: 'Daily', time: '7:30 PM - 8:00 PM', capacity: 30, enrolled: 15, level: 'All Levels', status: 'Active' }
];

const ClassesPage = () => {
    const [classes] = useState(dummyClasses);
    const [filter, setFilter] = useState('all');

    const filteredClasses = filter === 'all' ? classes : classes.filter(c => c.status.toLowerCase() === filter);

    return (
        <div className="classes-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Classes & Schedule</h1>
                    <p className="page-subtitle">Manage group classes and trainer schedules</p>
                </div>
                <Button variant="primary">
                    <FiPlus /> Add Class
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="classes-summary">
                <Card className="summary-card-mini">
                    <div className="summary-icon" style={{ background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)' }}>
                        <FiUsers />
                    </div>
                    <div>
                        <p className="summary-label">Total Classes</p>
                        <p className="summary-value">{classes.length}</p>
                    </div>
                </Card>
                <Card className="summary-card-mini">
                    <div className="summary-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                        <FiTrendingUp />
                    </div>
                    <div>
                        <p className="summary-label">Active Classes</p>
                        <p className="summary-value">{classes.filter(c => c.status === 'Active').length}</p>
                    </div>
                </Card>
                <Card className="summary-card-mini">
                    <div className="summary-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                        <FiClock />
                    </div>
                    <div>
                        <p className="summary-label">Total Enrollment</p>
                        <p className="summary-value">{classes.reduce((sum, c) => sum + c.enrolled, 0)}</p>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <div className="classes-filters">
                <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Classes</button>
                <button className={`filter-btn ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
                <button className={`filter-btn ${filter === 'full' ? 'active' : ''}`} onClick={() => setFilter('full')}>Full</button>
            </div>

            {/* Classes Grid */}
            <div className="classes-grid">
                {filteredClasses.map(cls => (
                    <Card key={cls.id} className="class-card">
                        <div className="class-header">
                            <h3>{cls.name}</h3>
                            <span className={`class-status ${cls.status.toLowerCase()}`}>{cls.status}</span>
                        </div>
                        <div className="class-details">
                            <div className="class-detail-row">
                                <FiUsers className="detail-icon" />
                                <span>Trainer: {cls.trainer}</span>
                            </div>
                            <div className="class-detail-row">
                                <FiClock className="detail-icon" />
                                <span>{cls.time}</span>
                            </div>
                            <div className="class-detail-row">
                                <span className="detail-label">Days:</span>
                                <span>{cls.day}</span>
                            </div>
                            <div className="class-detail-row">
                                <span className="detail-label">Level:</span>
                                <span className="level-badge">{cls.level}</span>
                            </div>
                        </div>
                        <div className="class-capacity">
                            <div className="capacity-bar">
                                <div className="capacity-fill" style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}></div>
                            </div>
                            <span className="capacity-text">{cls.enrolled}/{cls.capacity} enrolled</span>
                        </div>
                        <div className="class-actions">
                            <Button variant="secondary" size="small">View Details</Button>
                            <Button variant="outline" size="small">Edit</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ClassesPage;
