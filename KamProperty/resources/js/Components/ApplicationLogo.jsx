import React from 'react';

export default function ApplicationLogo({ className }) {
    return (
        <div className={`flex items-center ${className}`}>
            <img 
                src="/KamWhite.png" 
                alt="KamProperty Logo" 
                className="h-28 w-auto"
            />
            <span className="mt-2 ml-2 text-xl font-bold text-gray-800"></span>
        </div>
    );
}

// Alternative: If you want just the logo without text
export function ApplicationLogoIcon({ className }) {
    return (
        <img 
            src="/KamBlack.png" 
            alt="KamProperty" 
            className={`h-20 w-auto ${className}`}
        />
    );
}