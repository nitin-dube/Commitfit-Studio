import { FiTrendingUp, FiUsers, FiActivity, FiDollarSign } from 'react-icons/fi';
import Card from '../../components/ui/Card';
import './ReportsPage.css';

const ReportsPage = () => {
    // Dummy chart data
    const weeklyData = [
        { day: 'Mon', checkins: 45 },
        { day: 'Tue', checkins: 52 },
        { day: 'Wed', checkins: 48 },
        { day: 'Thu', checkins: 61 },
        { day: 'Fri', checkins: 55 },
        { day: 'Sat', checkins: 38 },
        { day: 'Sun', checkins: 28 }
    ];

    const maxCheckins = Math.max(...weeklyData.map(d => d.checkins));

    const topMembers = [
        { name: 'Rajesh Kumar', checkins: 24, lastVisit: '2024-11-29' },
        { name: 'Priya Sharma', checkins: 22, lastVisit: '2024-11-28' },
        { name: 'Sneha Reddy', checkins: 20, lastVisit: '2024-11-29' },
        { name: 'Vikram Singh', checkins: 18, lastVisit: '2024-11-27' },
        { name: 'Amit Patel', checkins: 16, lastVisit: '2024-11-29' }
    ];

    return (
        <div className="reports-page fade-in">
            <div className="page-header">
                <h1>Reports & Analytics</h1>
                <p className="page-subtitle">Track performance metrics and insights</p>
            </div>

            {/* Summary Cards */}
            <div className="reports-summary">
                <Card className="summary-card-mini">
                    <div className="summary-icon" style={{ background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)' }}>
                        <FiUsers />
                    </div>
                    <div>
                        <p className="summary-label">New Members (This Month)</p>
                        <p className="summary-value">12</p>
                    </div>
                </Card>
                <Card className="summary-card-mini">
                    <div className="summary-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                        <FiActivity />
                    </div>
                    <div>
                        <p className="summary-label">Total Check-ins (This Week)</p>
                        <p className="summary-value">327</p>
                    </div>
                </Card>
                <Card className="summary-card-mini">
                    <div className="summary-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                        <FiTrendingUp />
                    </div>
                    <div>
                        <p className="summary-label">Avg. Daily Check-ins</p>
                        <p className="summary-value">47</p>
                    </div>
                </Card>
                <Card className="summary-card-mini">
                    <div className="summary-icon" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
                        <FiDollarSign />
                    </div>
                    <div>
                        <p className="summary-label">Revenue (This Month)</p>
                        <p className="summary-value">₹42,000</p>
                    </div>
                </Card>
            </div>

            <div className="reports-content">
                {/* Weekly Attendance Chart */}
                <Card className="chart-card">
                    <h2 className="chart-title">Weekly Attendance</h2>
                    <div className="simple-chart">
                        {weeklyData.map((item, index) => (
                            <div key={index} className="chart-bar-wrapper">
                                <div className="chart-bar-container">
                                    <div
                                        className="chart-bar"
                                        style={{
                                            height: `${(item.checkins / maxCheckins) * 100}%`,
                                            animationDelay: `${index * 0.1}s`
                                        }}
                                    >
                                        <span className="bar-value">{item.checkins}</span>
                                    </div>
                                </div>
                                <span className="bar-label">{item.day}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Top Active Members */}
                <Card className="top-members-card">
                    <h2 className="chart-title">Top Active Members</h2>
                    <div className="members-list">
                        {topMembers.map((member, index) => (
                            <div key={index} className="member-row">
                                <div className="member-rank">{index + 1}</div>
                                <div className="member-info">
                                    <p className="member-name">{member.name}</p>
                                    <p className="member-visits">{member.checkins} check-ins</p>
                                </div>
                                <div className="member-last-visit">
                                    <p>Last visit</p>
                                    <p>{member.lastVisit}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ReportsPage;
