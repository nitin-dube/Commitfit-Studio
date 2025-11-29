import './CheckinsChart.css';

const CheckinsChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="chart-placeholder">
                <p>Chart visualization will be displayed here</p>
                <p className="chart-note">Integrate a charting library like Recharts or Chart.js for data visualization</p>
            </div>
        );
    }

    // Calculate max value for scaling
    const maxValue = Math.max(...data.map(d => d.count));

    return (
        <div className="checkins-chart">
            <h3 className="chart-title">Check-ins This Week</h3>
            <div className="chart-container">
                {data.map((item, index) => (
                    <div key={index} className="chart-bar-wrapper">
                        <div className="chart-bar-container">
                            <div
                                className="chart-bar"
                                style={{
                                    height: `${(item.count / maxValue) * 100}%`,
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                <span className="bar-value">{item.count}</span>
                            </div>
                        </div>
                        <span className="bar-label">{item.day}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckinsChart;
