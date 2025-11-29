import { useState } from 'react';
import { FiSave, FiMail, FiPhone, FiMapPin, FiUser } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import gymProfile from '../../config/gymProfile';
import './SettingsPage.css';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        name: gymProfile.name,
        tagline: gymProfile.tagline,
        addressLine1: gymProfile.address.line1,
        city: gymProfile.address.city,
        state: gymProfile.address.state,
        pincode: gymProfile.address.pincode,
        country: gymProfile.address.country,
        hours: gymProfile.hours.weekday,
        phone: gymProfile.contact.phone,
        email: gymProfile.contact.email,
        supportEmail: gymProfile.contact.supportEmail,
        ownerName: gymProfile.owner.name,
        ownerRole: gymProfile.owner.role
    });

    const handleSave = () => {
        alert('Settings saved successfully! (Demo - not persisted to backend)');
    };

    return (
        <div className="settings-page fade-in">
            <div className="page-header">
                <h1>Settings</h1>
                <p className="page-subtitle">Manage gym profile and system configuration</p>
            </div>

            <div className="settings-container">
                <div className="settings-sidebar">
                    <button
                        className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <FiMapPin /> Gym Profile
                    </button>
                    <button
                        className={`settings-tab ${activeTab === 'contact' ? 'active' : ''}`}
                        onClick={() => setActiveTab('contact')}
                    >
                        <FiPhone /> Contact Info
                    </button>
                    <button
                        className={`settings-tab ${activeTab === 'owner' ? 'active' : ''}`}
                        onClick={() => setActiveTab('owner')}
                    >
                        <FiUser /> Owner Profile
                    </button>
                </div>

                <div className="settings-content-area">
                    {activeTab === 'profile' && (
                        <Card>
                            <h2 className="settings-section-title">Gym Profile</h2>
                            <div className="settings-form">
                                <Input
                                    label="Gym Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <Input
                                    label="Tagline"
                                    value={formData.tagline}
                                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                />
                                <Input
                                    label="Address"
                                    value={formData.addressLine1}
                                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                                />
                                <div className="input-row">
                                    <Input
                                        label="City"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    />
                                    <Input
                                        label="State"
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    />
                                </div>
                                <div className="input-row">
                                    <Input
                                        label="Pincode"
                                        value={formData.pincode}
                                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                    />
                                    <Input
                                        label="Country"
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    />
                                </div>
                                <Input
                                    label="Operating Hours"
                                    value={formData.hours}
                                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                                />
                                <Button onClick={handleSave}><FiSave /> Save Changes</Button>
                            </div>
                        </Card>
                    )}

                    {activeTab === 'contact' && (
                        <Card>
                            <h2 className="settings-section-title">Contact Information</h2>
                            <div className="settings-form">
                                <Input
                                    label="Contact Phone"
                                    icon={FiPhone}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                <Input
                                    label="Contact Email"
                                    icon={FiMail}
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <Input
                                    label="Support Email"
                                    icon={FiMail}
                                    type="email"
                                    value={formData.supportEmail}
                                    onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                                />
                                <Button onClick={handleSave}><FiSave /> Save Changes</Button>
                            </div>
                        </Card>
                    )}

                    {activeTab === 'owner' && (
                        <Card>
                            <h2 className="settings-section-title">Owner Profile</h2>
                            <div className="settings-form">
                                <Input
                                    label="Owner Name"
                                    value={formData.ownerName}
                                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                                />
                                <Input
                                    label="Role / Title"
                                    value={formData.ownerRole}
                                    onChange={(e) => setFormData({ ...formData, ownerRole: e.target.value })}
                                />
                                <Button onClick={handleSave}><FiSave /> Save Changes</Button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
