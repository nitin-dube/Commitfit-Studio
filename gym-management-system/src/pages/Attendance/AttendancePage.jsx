import { useState, useEffect } from 'react';
import CheckinForm from '../../components/attendance/CheckinForm';
import CheckinList from '../../components/attendance/CheckinList';
import { markCheckinApi, getTodayCheckinsApi } from '../../services/attendanceApi';
import './AttendancePage.css';

const AttendancePage = () => {
    const [todayCheckins, setTodayCheckins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTodayCheckins();
    }, []);

    const loadTodayCheckins = async () => {
        setLoading(true);
        try {
            const response = await getTodayCheckinsApi();
            if (response.success) {
                setTodayCheckins(response.data);
            }
        } catch (error) {
            console.error('Error loading check-ins:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckin = async (memberIdOrPhone) => {
        try {
            const response = await markCheckinApi(memberIdOrPhone);

            if (response.success) {
                alert(response.message);
                // Reload check-ins list
                await loadTodayCheckins();
            } else {
                alert(response.error || 'Check-in failed');
            }
        } catch (error) {
            console.error('Check-in error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="attendance-loading">
                <div className="spinner"></div>
                <p>Loading attendance data...</p>
            </div>
        );
    }

    return (
        <div className="attendance-page fade-in">
            <div className="page-header">
                <h1>Attendance Tracking</h1>
                <p className="page-subtitle">Mark member check-ins and view today's attendance</p>
            </div>

            <div className="attendance-content">
                <div className="checkin-section">
                    <CheckinForm onCheckin={handleCheckin} />
                </div>
                <div className="checkins-section">
                    <CheckinList checkins={todayCheckins} />
                </div>
            </div>
        </div>
    );
};

export default AttendancePage;
