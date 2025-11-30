import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { FiMail, FiLock } from 'react-icons/fi';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    // Warm up the server on component mount
    useEffect(() => {
        const warmUpServer = async () => {
            try {
                console.log('🔥 Waking up server...');
                await api.get('/health');
                console.log('✅ Server is awake!');
            } catch (error) {
                // Ignore errors, this is just a warm-up
                console.log('Server warm-up ping failed (expected if offline/sleeping)');
            }
        };

        warmUpServer();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);

        try {
            const result = await login(email, password);

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <div className="login-logo">💪</div>
                    <h1 className="login-title">GymPro</h1>
                    <p className="login-subtitle">Commitfit Studio</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="error-alert">
                            {error}
                        </div>
                    )}

                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={FiMail}
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={FiLock}
                        required
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>

                    <div className="login-hint">
                        <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px', color: 'var(--primary-color)', textAlign: 'center' }}>
                            "Stronger Every Day"
                        </p>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center' }}>
                            Your fitness journey starts here.<br />Transform your body, transform your life.
                        </p>
                    </div>
                </form>

                <div className="login-footer">
                    <p>&copy; {new Date().getFullYear()} Commitfit Studio. All rights reserved.</p>
                </div>
            </div>

            <div className="login-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>
        </div>
    );
};

export default LoginPage;
