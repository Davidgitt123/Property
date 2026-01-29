import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Register() {
    const { language } = useLanguage();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
    });

    const translations = {
        en: {
            title: 'Create Account',
            subtitle: 'Sign up to browse and save properties',
            name: 'Full Name',
            email: 'Email Address',
            phone: 'Phone Number',
            address: 'Address',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            terms: 'I agree to the Terms and Conditions',
            privacy: 'Privacy Policy',
            signUp: 'Sign Up',
            haveAccount: 'Already have an account?',
            signIn: 'Sign In',
            passwordRequirements: 'Password must be at least 8 characters',
            or: 'Or',
            continueWith: 'Continue with',
            successTitle: 'Welcome to KamProperty!',
            successMessage: 'Your account has been created successfully. Start exploring properties now!',
            exploreProperties: 'Explore Properties',
        },
        kh: {
            title: 'បង្កើតគណនី',
            subtitle: 'ចុះឈ្មោះដើម្បីរុករក និងរក្សាទុកអចលនទ្រព្យ',
            name: 'ឈ្មោះពេញ',
            email: 'អាសយដ្ឋានអ៊ីមែល',
            phone: 'លេខទូរស័ព្ទ',
            address: 'អាសយដ្ឋាន',
            password: 'ពាក្យសម្ងាត់',
            confirmPassword: 'បញ្ជាក់ពាក្យសម្ងាត់',
            terms: 'ខ្ញុំយល់ព្រមតាមលក្ខខណ្ឌ និងល័ក្ខខ័ណ្ឌ',
            privacy: 'គោលការណ៍ឯកជន',
            signUp: 'ចុះឈ្មោះ',
            haveAccount: 'មានគណនីរួចហើយ?',
            signIn: 'ចូល',
            passwordRequirements: 'ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ ៨ តួអក្សរ',
            or: 'ឬ',
            continueWith: 'បន្តជាមួយ',
            successTitle: 'សូមស្វាគមន៍មកកាន់ KamProperty!',
            successMessage: 'គណនីរបស់អ្នកត្រូវបានបង្កើតដោយជោគជ័យ។ ចាប់ផ្តើមរុករកអចលនទ្រព្យឥឡូវនេះ!',
            exploreProperties: 'រុករកអចលនទ្រព្យ',
        }
    };

    const t = translations[language];

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onSuccess: () => {
                // Redirect to HomePage after successful registration
                router.visit(route('homepage'));
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title={t.title} />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark/100 to-dark/90 p-4">
                <div className="max-w-md w-full">
                    {/* Register Card */}
                    <div className="bg-light rounded-2xl shadow-soft p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-dark mb-2">
                                {t.title}
                            </h2>
                            <p className="text-gray-600">
                                {t.subtitle}
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            {/* Name Input */}
                            <div>
                                <InputLabel htmlFor="name" value={t.name} className="text-dark font-medium mb-2" />
                                <div className="relative">
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="block w-full border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Email Input */}
                            <div>
                                <InputLabel htmlFor="email" value={t.email} className="text-dark font-medium mb-2" />
                                <div className="relative">
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="block w-full border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                </div>
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            {/* Phone Input */}
                            <div>
                                <InputLabel htmlFor="phone" value={t.phone} className="text-dark font-medium mb-2" />
                                <div className="relative">
                                    <TextInput
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        value={data.phone}
                                        className="block w-full border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
                                        autoComplete="tel"
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                </div>
                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                           

                            {/* Password Input */}
                            <div>
                                <InputLabel htmlFor="password" value={t.password} className="text-dark font-medium mb-2" />
                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="block w-full border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <InputError message={errors.password} className="mt-2" />
                                <p className="mt-1 text-xs text-gray-500">{t.passwordRequirements}</p>
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <InputLabel htmlFor="password_confirmation" value={t.confirmPassword} className="text-dark font-medium mb-2" />
                                <div className="relative">
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="block w-full border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        required
                                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="text-gray-600">
                                        {t.terms}{' '}
                                        <Link href="#" className="text-primary hover:text-primary-dark">
                                            {t.privacy}
                                        </Link>
                                    </label>
                                </div>
                            </div>

                            {/* Register Button */}
                            <PrimaryButton 
                                className="w-full justify-center py-3 text-base font-medium mt-2"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {language === 'en' ? 'Creating account...' : 'កំពុងបង្កើតគណនី...'}
                                    </>
                                ) : t.signUp}
                            </PrimaryButton>
                        </form>

                       

                        {/* Sign In Link */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600">
                                {t.haveAccount}{' '}
                                <Link
                                    href={route('login')}
                                    className="font-medium text-primary hover:text-primary-dark"
                                >
                                    {t.signIn}
                                </Link>
                            </p>
                        </div>
                    </div>

                    
                </div>
            </div>
        </GuestLayout>
    );
}