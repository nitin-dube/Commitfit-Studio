import './SummaryCard.css';

const SummaryCard = ({ icon: Icon, label, value, trend, trendValue, gradient }) => {
    return (
        <div className={`summary-card ${gradient || 'gradient-primary'}`}>
            <div className="summary-icon">
                <Icon />
            </div>
            <div className="summary-content">
                <p className="summary-label">{label}</p>
                <h3 className="summary-value">{value}</h3>
                {trend && (
                    <p className={`summary-trend ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
                        {trend === 'up' ? '↑' : '↓'} {trendValue}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SummaryCard;
