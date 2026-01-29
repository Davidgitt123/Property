import React from 'react';
import UserLayout from '@/Layouts/UserLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage({ auth }) {
    const { language } = useLanguage();

    const translations = {
        en: {
            welcome: 'Welcome to KamProperty! This is Home Page',
            
        },
        kh: {
            welcome: 'សូមស្វាគមន៍មកកាន់ KamProperty',
            
        }
    };

    const t = translations[language];

    return (
        <UserLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-dark leading-tight">{t.welcome}</h2>}
        >
            <Head title={t.welcome} />

           
        </UserLayout>
    );
}