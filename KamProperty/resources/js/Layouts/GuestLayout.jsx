import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GuestLayout({ children }) {
    const { language } = useLanguage();

    const navItems = {
        en: {
            home: 'Home',
            properties: 'Properties',
            login: 'Login',
            getStarted: 'Get Started'
        },
        kh: {
            home: 'ទំព័រដើម',
            properties: 'អចលនទ្រព្យ',
            login: 'ចូល',
            getStarted: 'ចាប់ផ្តើម'
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-light">
            {/* Language Switcher */}
            <div className="absolute top-14 right-4 z-50">
                <LanguageSwitcher />
            </div>

            {/* Navigation */}
            <nav className="absolute top-8 left-0 right-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="h-12 w-auto" />
                            </Link>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="/" className="
                                                        text-light font-medium
                                                        bg-[linear-gradient(theme(colors.primary)_0_0)]
                                                        bg-no-repeat bg-left-bottom
                                                        bg-[length:0_2px]
                                                        hover:bg-[length:100%_2px]
                                                        transition-[background-size] duration-300 ease-in-out
                                                        pb-1
                                                        ">
                                {navItems[language].home}
                            </Link>
                            <Link href="/properties" className="
                                                        text-light font-medium
                                                        bg-[linear-gradient(theme(colors.primary)_0_0)]
                                                        bg-no-repeat bg-left-bottom
                                                        bg-[length:0_2px]
                                                        hover:bg-[length:100%_2px]
                                                        transition-[background-size] duration-300 ease-in-out
                                                        pb-1
                                                        ">
                                {navItems[language].properties}
                            </Link>
                            <Link href="/login" className="
                                                        text-light font-medium
                                                        bg-[linear-gradient(theme(colors.primary)_0_0)]
                                                        bg-no-repeat bg-left-bottom
                                                        bg-[length:0_2px]
                                                        hover:bg-[length:100%_2px]
                                                        transition-[background-size] duration-300 ease-in-out
                                                        pb-1
                                                        ">
                                {navItems[language].login}
                            </Link>
                            <Link 
                                href="/register" 
                                className="btn-primary"
                            >
                                {navItems[language].getStarted}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
}