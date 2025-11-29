import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { FiUser } from 'react-icons/fi';
import './CheckinForm.css';

const CheckinForm = ({ onCheckin }) => {
    const [memberInput, setMemberInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!memberInput.trim()) {
            alert('Please enter a Member ID or Phone number');
            return;
        }

        setLoading(true);
        try {
            await onCheckin(memberInput.trim());
            setMemberInput(''); // Clear input on success
        } catch (error) {
            console.error('Check-in error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkin-form-card">
            <h3 className="form-title">Mark Check-in</h3>
            <form className="checkin-form" onSubmit={handleSubmit}>
                <Input
                    label="Member ID or Phone Number"
                    placeholder="Enter member ID or phone..."
                    value={memberInput}
                    onChange={(e) => setMemberInput(e.target.value)}
                    icon={FiUser}
                    required
                />
                <Button
                    type="submit"
                    variant="success"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Mark Check-in'}
                </Button>
            </form>
        </div>
    );
};

export default CheckinForm;
