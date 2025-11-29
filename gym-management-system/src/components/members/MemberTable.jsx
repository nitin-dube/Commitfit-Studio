import './MemberTable.css';
import MemberRow from './MemberRow';

const MemberTable = ({ members, onEdit, onDelete }) => {
    if (!members || members.length === 0) {
        return (
            <div className="empty-state">
                <p>No members found</p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="member-table">
                <thead>
                    <tr>
                        <th>Member ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Plan</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <MemberRow
                            key={member.id}
                            member={member}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MemberTable;
