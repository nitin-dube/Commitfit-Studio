import './Input.css';

const Input = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    icon: Icon,
    ...props
}) => {
    return (
        <div className="input-group">
            {label && (
                <label className="input-label">
                    {label} {required && <span className="required">*</span>}
                </label>
            )}
            <div className="input-wrapper">
                {Icon && (
                    <div className="input-icon">
                        <Icon />
                    </div>
                )}
                <input
                    type={type}
                    className={`input-field ${error ? 'input-error' : ''} ${Icon ? 'input-with-icon' : ''}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    {...props}
                />
            </div>
            {error && <span className="input-error-message">{error}</span>}
        </div>
    );
};

export default Input;
