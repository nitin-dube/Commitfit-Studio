import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { formatDate } from '../../data/mockData';
import './MemberRow.css';

const MemberRow = ({ member, onEdit, onDelete }) => {
    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'badge-success';
            case 'expired':
                return 'badge-danger';
            case 'free trial':
                return 'badge-info';
            default:
                return 'badge-warning';
        }
    };

    return (
        <tr>
            <td className="member-id">{member.id}</td>
            <td className="member-name">{member.name}</td>
            <td>{member.phone}</td>
            <td>{member.plan}</td>
            <td>{formatDate(member.startDate)}</td>
            <td>{formatDate(member.endDate)}</td>
            <td>
                <span className={`badge ${getStatusClass(member.status)}`}>
                    {member.status}
                </span>
            </td>
            <td>
                <div className="action-buttons">
                    <button
                        className="action-btn btn-view"
                        onClick={() => onEdit && onEdit(member)}
                        title="View Details"
                    >
                        <FiEye />
                    </button>
                    <button
                        className="action-btn btn-edit"
                        onClick={() => onEdit && onEdit(member)}
                        title="Edit"
                    >
                        <FiEdit2 />
                    </button>
                    <button
                        className="action-btn btn-delete"
                        onClick={() => onDelete && onDelete(member)}
                        title="Delete"
                    >
                        <FiTrash2 />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default MemberRow;
