import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    onClick,
    type = 'button',
    ...props
}) => {
    const className = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''}`;

    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
