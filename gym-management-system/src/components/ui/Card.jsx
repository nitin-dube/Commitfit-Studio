import './Card.css';

const Card = ({
    children,
    className = '',
    hover = false,
    onClick,
    ...props
}) => {
    return (
        <div
            className={`card ${hover ? 'card-hover' : ''} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
