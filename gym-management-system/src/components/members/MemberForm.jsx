import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { FiX } from 'react-icons/fi';
import './MemberForm.css';

const MemberForm = ({ member, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: member?.name || '',
        phone: member?.phone || '',
        email: member?.email || '',
        plan: member?.plan || 'Monthly',
        startDate: member?.startDate || new Date().toISOString().split('T')[0],
        endDate: member?.endDate || '',
        status: member?.status || 'Active',
        notes: member?.notes || ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.email.includes('@')) newErrors.email = 'Invalid email format';
        if (!formData.startDate) newErrors.startDate = 'Start date is required';
        if (!formData.endDate) newErrors.endDate = 'End date is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{member ? 'Edit Member' : 'Add New Member'}</h2>
                    <button className="modal-close" onClick={onCancel}>
                        <FiX />
                    </button>
                </div>

                <form className="member-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <Input
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <Input
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            required
                        />
                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label className="input-label">
                                Plan <span className="required">*</span>
                            </label>
                            <select
                                name="plan"
                                className="input-field"
                                value={formData.plan}
                                onChange={handleChange}
                            >
                                <option value="Monthly">Monthly</option>
                                <option value="Quarterly">Quarterly</option>
                                <option value="Annual">Annual</option>
                                <option value="Free Trial">Free Trial</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label className="input-label">
                                Status <span className="required">*</span>
                            </label>
                            <select
                                name="status"
                                className="input-field"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Active">Active</option>
                                <option value="Expired">Expired</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <Input
                            label="Start Date"
                            name="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={handleChange}
                            error={errors.startDate}
                            required
                        />
                        <Input
                            label="End Date"
                            name="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={handleChange}
                            error={errors.endDate}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label className="input-label">Notes</label>
                            <textarea
                                name="notes"
                                className="input-field"
                                rows="3"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Additional notes about the member..."
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <Button type="button" variant="secondary" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            {member ? 'Update Member' : 'Add Member'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MemberForm;
