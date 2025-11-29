import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layouts
import AdminLayout from '../layouts/AdminLayout';

// Pages
import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import MembersPage from '../pages/Members/MembersPage';
import AttendancePage from '../pages/Attendance/AttendancePage';
import ClassesPage from '../pages/Classes/ClassesPage';
import BillingPage from '../pages/Billing/BillingPage';
import ReportsPage from '../pages/Reports/ReportsPage';
import SettingsPage from '../pages/Settings/SettingsPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh'
            }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh'
            }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />

                {/* Protected Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="members" element={<MembersPage />} />
                    <Route path="attendance" element={<AttendancePage />} />
                    <Route path="classes" element={<ClassesPage />} />
                    <Route path="billing" element={<BillingPage />} />
                    <Route path="reports" element={<ReportsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>

                {/* Catch all - redirect to dashboard or login */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
