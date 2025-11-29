import { useState, useEffect } from 'react';
import { FiUsers, FiCheckCircle, FiActivity, FiDollarSign } from 'react-icons/fi';
import SummaryCard from '../../components/dashboard/SummaryCard';
import CheckinsChart from '../../components/dashboard/CheckinsChart';
import { getDashboardSummaryApi, getWeeklyCheckinsApi } from '../../services/attendanceApi';
import './DashboardPage.css';

const DashboardPage = () => {
    const [stats, setStats] = useState({
        totalMembers: 0,
        activeMembers: 0,
        todaysCheckins: 0,
        pendingPayments: 0
    });
    const [weeklyData, setWeeklyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [summaryRes, weeklyRes] = await Promise.all([
                getDashboardSummaryApi(),
                getWeeklyCheckinsApi()
            ]);

            if (summaryRes.success) {
                setStats(summaryRes.data);
            }

            if (weeklyRes.success) {
                setWeeklyData(weeklyRes.data);
            }
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-page fade-in">
            <div className="page-header">
                <h1>Dashboard</h1>
                <p className="page-subtitle">Welcome back! Here's what's happening today.</p>
            </div>

            <div className="summary-grid">
                <SummaryCard
                    icon={FiUsers}
                    label="Total Members"
                    value={stats.totalMembers}
                    gradient="gradient-primary"
                />
                <SummaryCard
                    icon={FiCheckCircle}
                    label="Today's Check-ins"
                    value={stats.todaysCheckins}
                    gradient="gradient-success"
                />
                <SummaryCard
                    icon={FiActivity}
                    label="Active Memberships"
                    value={stats.activeMembers}
                    gradient="gradient-warning"
                />
                <SummaryCard
                    icon={FiDollarSign}
                    label="Pending Payments"
                    value={stats.pendingPayments}
                    gradient="gradient-secondary"
                />
            </div>

            <div className="dashboard-content">
                <div className="chart-section">
                    <CheckinsChart data={weeklyData} />
                </div>

                <div className="quick-actions">
                    <h3>Quick Actions</h3>
                    <div className="action-buttons">
                        <button className="action-btn">
                            <FiUsers />
                            <span>Add Member</span>
                        </button>
                        <button className="action-btn">
                            <FiCheckCircle />
                            <span>Mark Attendance</span>
                        </button>
                        <button className="action-btn">
                            <FiDollarSign />
                            <span>Record Payment</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
