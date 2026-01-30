import React, { useState, useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import ApplicationLogo from "@/Components/ApplicationLogoDark";
import { Head, Link, useForm } from "@inertiajs/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Login({ status, canResetPassword }) {
    const { language } = useLanguage();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        setIsVisible(true);
        return () => setIsVisible(false);
    }, []);

    const translations = {
        en: {
            title: "Welcome Back",
            subtitle: "Sign in to your account to continue",
            email: "Email Address",
            password: "Password",
            remember: "Remember me",
            forgotPassword: "Forgot your password?",
            login: "Log In",
            noAccount: "Don't have an account?",
            signUp: "Sign Up",
            orContinue: "Or continue with",
            loginError: "These credentials do not match our records.",
        },
        kh: {
            title: "សូមស្វាគមន៍មកកាន់",
            subtitle: "ចូលទៅក្នុងគណនីរបស់អ្នកដើម្បីបន្ត",
            email: "អាសយដ្ឋានអ៊ីមែល",
            password: "ពាក្យសម្ងាត់",
            remember: "ចងចាំខ្ញុំ",
            forgotPassword: "ភ្លេចពាក្យសម្ងាត់?",
            login: "ចូល",
            noAccount: "មិនមានគណនីទេ?",
            signUp: "ចុះឈ្មោះ",
            orContinue: "ឬបន្តជាមួយ",
            loginError: "លិខិតសម្គាល់ទាំងនេះមិនត្រូវគ្នានឹងកំណត់ត្រារបស់យើងទេ។",
        },
    };

    const t = translations[language];

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen">
            <Head title={t.title} />
            
            <div className="flex min-h-screen">
                {/* Left Panel - Login Form (30%) */}
                <div className={`w-full lg:w-3/10 flex bg-dark items-center justify-center p-4 transition-all duration-500 ease-in-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                    <div className="max-w-md w-full">
                       

                        {/* Login Card */}
                        <div className="bg-light rounded-2xl shadow-soft p-8">
                            <div className="">
                                                        <Link href={route('homepage')}>
                                                            <ApplicationLogo className="w-24 h-auto mx-auto" />
                                                        </Link>
                                                    </div>
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-dark mb-2">
                                    {t.title}
                                </h2>
                                <p className="text-gray-600">{t.subtitle}</p>
                            </div>

                            {status && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center">
                                        <svg
                                            className="w-5 h-5 text-green-500 mr-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-green-700 text-sm">
                                            {status}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {errors.email &&
                                errors.email.includes("credentials") && (
                                    <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                                        <div className="flex items-center">
                                            <svg
                                                className="w-5 h-5 text-accent mr-2"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-accent text-sm">
                                                {t.loginError}
                                            </span>
                                        </div>
                                    </div>
                                )}

                            <form onSubmit={submit} className="space-y-6">
                                {/* Email Input */}
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value={t.email}
                                        className="text-dark font-medium mb-2"
                                    />
                                    <div className="relative">
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="block w-full border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg
                                                className="h-5 w-5 text-gray-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Password Input */}
                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value={t.password}
                                        className="text-dark font-medium mb-2"
                                    />
                                    <div className="relative">
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="block w-full border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
                                            autoComplete="current-password"
                                            onChange={(e) =>
                                                setData("password", e.target.value)
                                            }
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg
                                                className="h-5 w-5 text-gray-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                            className="text-primary border-gray-300 rounded focus:ring-primary"
                                        />
                                        <span className="ms-2 text-sm text-gray-600">
                                            {t.remember}
                                        </span>
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-sm text-primary hover:text-primary-dark underline transition-colors duration-300"
                                        >
                                            {t.forgotPassword}
                                        </Link>
                                    )}
                                </div>

                                {/* Login Button */}
                                <PrimaryButton
                                    className="w-full justify-center py-3 text-base font-medium transition-transform duration-300 hover:scale-[1.02]"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            {language === "en"
                                                ? "Logging in..."
                                                : "កំពុងចូល..."}
                                        </>
                                    ) : (
                                        t.login
                                    )}
                                </PrimaryButton>
                            </form>

                            {/* Sign Up Link */}
                            <div className="mt-8 text-center">
                                <p className="text-sm text-gray-600">
                                    {t.noAccount}{" "}
                                    <Link
                                        href={route("register")}
                                        className="font-medium text-primary hover:text-primary-dark underline transition-all duration-300 hover:tracking-wide"
                                    >
                                        {t.signUp}
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600">
                                {language === "en"
                                    ? "By logging in, you agree to our Terms and Privacy Policy"
                                    : "ក្នុងការចូល អ្នកយល់ព្រមតាមលក្ខខណ្ឌ និងគោលការណ៍ឯកជនរបស់យើង"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Property Image (70%) */}
                <div className="w-full hidden lg:flex lg:w-7/10 bg-gradient-to-br from-primary/90 to-primary-dark/90 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 z-10"></div>
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                        style={{
                            backgroundImage: "url('https://prestigepropertymagazine.com/wp-content/uploads/2020/01/7309-Bayside-Close-pool-.jpg')",
                            backgroundSize: 'cover',
                            transform: isVisible ? 'scale(1.05)' : 'scale(1)'
                        }}
                    ></div>
                    
                    {/* Property Info Overlay */}
                    <div className={`relative z-20 p-12 flex flex-col justify-end h-full text-white transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="max-w-2xl">
                            <h3 className="text-4xl font-bold mb-4">
                                {language === "en" 
                                    ? "Find Your Dream Property" 
                                    : "ស្វែងរកអចលនទ្រព្យសុបិនរបស់អ្នក"}
                            </h3>
                            <p className="text-lg mb-6 opacity-90">
                                {language === "en"
                                    ? "Access exclusive listings and premium properties across Cambodia"
                                    : "ចូលប្រើប្រាស់បញ្ជីអចលនទ្រព្យពិសេស និងអចលនទ្រព្យដែលមានគុណភាពខ្ពស់នៅទូទាំងកម្ពុជា"}
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex -space-x-3">
                                        {[
                                            '/images/yondavid.png',
                                            '/images/soksothea.png',
                                            '/images/kimhong.png',
                                            '/images/hantiththearith.png'
                                        ].map((avatar, index) => (
                                            <img 
                                                key={index}
                                                src={avatar}
                                                alt={`Customer ${index + 1}`}
                                                className="w-12 h-12 rounded-full border-3 border-white object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/images/avatars/default-avatar.jpg';
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-lg opacity-90">
                                        {language === "en"
                                            ? "Join 5,000+ satisfied customers"
                                            : "ចូលរួមជាមួយអតិថិជនចំនួន ៥,០០០+ នាក់ដែលស្ថិតក្នុងការពេញចិត្ត"}
                                    </span>
                                </div>
                                <span className="text-sm opacity-80">
                                    {language === "en"
                                        ? "Join 5,000+ satisfied customers"
                                        : "ចូលរួមជាមួយអតិថិជនចំនួន ៥,០០០+ នាក់ដែលស្ថិតក្នុងការពេញចិត្ត"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}