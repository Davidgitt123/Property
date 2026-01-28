import React from 'react';

export default function ApplicationLogo({ className }) {
    return (
        <div className={`flex items-center ${className}`}>
            <img 
                src="/KAM.gif" 
                alt="KamProperty Logo" 
                className="h-30 w-auto mt-40"
            />
            <span className="mt-2 ml-2 text-xl font-bold text-gray-800"></span>
        </div>
    );
}

// Alternative: If you want just the logo without text
export function ApplicationLogoIcon({ className }) {
    return (
        <img 
            src="/KAM.gif" 
            alt="KamProperty" 
            className={`h-10 w-auto ${className}`}
        />
    );
}