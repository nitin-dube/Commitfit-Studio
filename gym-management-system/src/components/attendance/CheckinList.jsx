import { formatTime, formatDate } from '../../data/mockData';
import { FiCheckCircle } from 'react-icons/fi';
import './CheckinList.css';

const CheckinList = ({ checkins }) => {
    if (!checkins || checkins.length === 0) {
        return (
            <div className="checkin-list-card">
                <h3 className="list-title">Today's Check-ins</h3>
                <div className="empty-checkins">
                    <p>No check-ins yet today</p>
                </div>
            </div>
        );
    }

    return (
        <div className="checkin-list-card">
            <h3 className="list-title">
                Today's Check-ins <span className="checkin-count">{checkins.length}</span>
            </h3>
            <div className="checkin-list">
                {checkins.map((checkin, index) => (
                    <div key={checkin.id || index} className="checkin-item">
                        <div className="checkin-icon">
                            <FiCheckCircle />
                        </div>
                        <div className="checkin-info">
                            <p className="member-name">{checkin.memberName}</p>
                            <p className="checkin-time">{formatTime(checkin.checkinTime)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckinList;
