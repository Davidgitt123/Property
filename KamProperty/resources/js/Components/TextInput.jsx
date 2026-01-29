import React from 'react';

export default function TextInput({
    id,
    name,
    type = 'text',
    value,
    className = '',
    autoComplete,
    required,
    isFocused,
    onChange,
    ...props
}) {
    const inputRef = React.useRef();

    React.useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            id={id}
            ref={inputRef}
            name={name}
            type={type}
            value={value}
            autoComplete={autoComplete}
            required={required}
            onChange={onChange}
            className={
                `border-gray-300 focus:border-primary focus:ring-primary placeholder-gray-400 rounded-lg shadow-sm ` +
                className
            }
        />
    );
}