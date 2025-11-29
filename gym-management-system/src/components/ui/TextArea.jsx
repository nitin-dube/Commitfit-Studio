import './TextArea.css';

const TextArea = ({
    label,
    placeholder,
    value,
    onChange,
    rows = 4,
    required = false,
    error,
    helpText,
    ...props
}) => {
    return (
        <div className="textarea-wrapper">
            {label && (
                <label className="textarea-label">
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}
            <textarea
                className={`textarea-field ${error ? 'error' : ''}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
                required={required}
                {...props}
            />
            {error && <span className="error-text">{error}</span>}
            {helpText && !error && <span className="help-text">{helpText}</span>}
        </div>
    );
};

export default TextArea;
