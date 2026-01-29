import React from 'react';

export default function Checkbox({ name, value, checked, className = '', onChange, ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className={
                'rounded border-gray-300 text-primary focus:ring-primary focus:ring-opacity-50 ' +
                className
            }
        />
    );
}