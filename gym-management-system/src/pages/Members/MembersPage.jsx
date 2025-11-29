import { useState, useEffect } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import MemberTable from '../../components/members/MemberTable';
import MemberForm from '../../components/members/MemberForm';
import { getMembersApi, createMemberApi, updateMemberApi } from '../../services/memberApi';
import './MembersPage.css';

const MembersPage = () => {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMembers();
    }, []);

    useEffect(() => {
        filterMembers();
    }, [searchQuery, members]);

    const loadMembers = async () => {
        setLoading(true);
        try {
            const response = await getMembersApi();
            if (response.success) {
                setMembers(response.data);
            }
        } catch (error) {
            console.error('Error loading members:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterMembers = () => {
        if (!searchQuery.trim()) {
            setFilteredMembers(members);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = members.filter(member =>
            member.name.toLowerCase().includes(query) ||
            member.id.toLowerCase().includes(query) ||
            member.phone.includes(query)
        );
        setFilteredMembers(filtered);
    };

    const handleAddMember = () => {
        setSelectedMember(null);
        setShowForm(true);
    };

    const handleEditMember = (member) => {
        setSelectedMember(member);
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (selectedMember) {
                // Update existing member
                const response = await updateMemberApi(selectedMember.id, formData);
                if (response.success) {
                    // Reload members
                    await loadMembers();
                    alert('Member updated successfully!');
                }
            } else {
                // Create new member
                const response = await createMemberApi(formData);
                if (response.success) {
                    // Reload members
                    await loadMembers();
                    alert('Member added successfully!');
                }
            }
            setShowForm(false);
        } catch (error) {
            console.error('Error saving member:', error);
            alert('Error saving member. Please try again.');
        }
    };

    const handleDeleteMember = async (member) => {
        if (window.confirm(`Are you sure you want to deactivate ${member.name}?`)) {
            // In a real app, you'd call deleteMemberApi here
            alert('Member deactivated (demo only)');
        }
    };

    if (loading) {
        return (
            <div className="members-loading">
                <div className="spinner"></div>
                <p>Loading members...</p>
            </div>
        );
    }

    return (
        <div className="members-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Members Management</h1>
                    <p className="page-subtitle">Manage gym members and their memberships</p>
                </div>
                <Button variant="primary" onClick={handleAddMember}>
                    <FiPlus /> Add Member
                </Button>
            </div>

            <div className="members-toolbar">
                <Input
                    placeholder="Search by name, ID, or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={FiSearch}
                />
                <div className="members-stats">
                    <span className="stat">
                        <strong>{filteredMembers.length}</strong> members found
                    </span>
                </div>
            </div>

            <MemberTable
                members={filteredMembers}
                onEdit={handleEditMember}
                onDelete={handleDeleteMember}
            />

            {showForm && (
                <MemberForm
                    member={selectedMember}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowForm(false)}
                />
            )}
        </div>
    );
};

export default MembersPage;
