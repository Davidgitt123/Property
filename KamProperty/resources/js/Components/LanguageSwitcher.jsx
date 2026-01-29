import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSwitcher = ({ className = '' }) => {
    const { language, setLanguageTo } = useLanguage();

    return (
        <div className={`${className} bg-dark/20 backdrop-blur-sm rounded-lg p-1 flex items-center space-x-1`}>
            <button
                onClick={() => setLanguageTo('en')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                    language === 'en' 
                        ? 'bg-primary text-light' 
                        : 'text-light/70 hover:text-light hover:bg-dark/30'
                }`}
            >
                ENG
            </button>
            <span className="text-light/30">|</span>
            <button
                onClick={() => setLanguageTo('kh')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                    language === 'kh' 
                        ? 'bg-primary text-light' 
                        : 'text-light/70 hover:text-light hover:bg-dark/30'
                }`}
            >
                KH
            </button>
        </div>
    );
};

export default LanguageSwitcher;