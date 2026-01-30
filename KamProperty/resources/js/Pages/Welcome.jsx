import React from "react";
import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/utils/translation";

export default function Welcome() {
    const { language } = useLanguage();
    const t = useTranslation(language);

    // Team members data with your actual team
    const teamMembers = [
        {
            id: 1,
            khName: "យ៉ុន ដេវីត",
            enName: "Yon David",
            studentId: "62712",
            role: "Project Lead & Full Stack Developer",
            description: "Lead developer and system architect",
            image: "/images/yondavid.png",
        },
        {
            id: 2,
            khName: "ហាន ទិតធារិត",
            enName: "Han Tiththearith",
            studentId: "62744",
            role: "Backend Developer",
            description: "Database design and API development",
            image: "/images/hantiththearith.png",
        },
        {
            id: 3,
            khName: "ប៊ុត សៀវថុង",
            enName: "But SeavThong",
            studentId: "61964",
            role: "Frontend Developer",
            description: "UI/UX design and React development",
            image: "/images/butseavthong.png",
        },
        {
            id: 4,
            khName: "ឡេង ឆេងលាង",
            enName: "Leng Chhangleang",
            studentId: "63250",
            role: "Frontend Developer",
            description: "React components and user interface",
            image: "/images/lengchhangleang.png",
        },
        {
            id: 5,
            khName: "សុខ សុធា",
            enName: "Sok Sothea",
            studentId: "62746",
            role: "Property Specialist & Tester",
            description: "Property expertise and quality assurance",
            image: "/images/soksothea.png",
        },
        {
            id: 6,
            khName: "ប៉ាល់ សត្យា",
            enName: "Pal Satya",
            studentId: "61352",
            role: "Documentation & Support",
            description: "Project documentation and user support",
            image: "/images/palsatya.png",
        },
        {
            id: 7,
            khName: "ចាំង គីមហុង",
            enName: "Chang Kimhong",
            studentId: "59437",
            role: "Nothing to do",
            description: "Project documentation and user support",
            image: "/images/kimhong.png",
        },
    ];

    // Fallback avatar if image doesn't exist
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <GuestLayout>
            <Head title="Welcome" />

            {/* Hero Section with Background Image */}
            <div
                className="relative min-h-screen bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage:
                        'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80")',
                }}
            >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark/40"></div>

                <div className="relative z-10 min-h-screen flex flex-col justify-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-light mb-6">
                                <span className="block">{t.heroTitle1}</span>
                                <span className="block text-primary mt-2">
                                    {t.heroTitle2}
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0">
                                {t.heroDescription}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                                <Link
                                    href={route("register")}
                                    className="btn-primary text-lg font-semibold py-4 px-8 inline-flex items-center justify-center"
                                >
                                    {t.getStarted}
                                    <svg
                                        className="ml-2 w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </Link>
                                <Link
                                    href={route("login")}
                                    className="bg-light/20 hover:bg-light/30 backdrop-blur-sm text-light text-lg font-semibold py-4 px-8 rounded-lg border-2 border-light/30 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                                >
                                    {t.signIn}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-20 gradient-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-light mb-6">
                            {t.ourTeam}
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Meet the talented team behind KamProperty - Working
                            together to revolutionize property management
                        </p>
                        <div className="mt-4 text-primary font-semibold">
                            {language === "en"
                                ? "Year 4 - Computer Science"
                                : "ឆ្នាំទី៤ - វិទ្យាសាស្ត្រកុំព្យូទ័រ"}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className="bg-dark/50 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-dark border border-gray-700"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 relative">
                                        {/* Team member image or avatar */}
                                        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-primary mx-auto">
                                            <img
                                                src={member.image}
                                                alt={
                                                    language === "en"
                                                        ? member.enName
                                                        : member.khName
                                                }
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // If image fails to load, show initials
                                                    e.target.style.display =
                                                        "none";
                                                    e.target.parentElement.innerHTML = `
                                                        <div class="w-full h-full bg-primary flex items-center justify-center text-light text-3xl font-bold">
                                                            ${getInitials(
                                                                member.enName
                                                            )}
                                                        </div>
                                                    `;
                                                }}
                                            />
                                        </div>

                                        {/* Student ID badge */}
                                        <div className="absolute -bottom-2 -right-2 bg-accent text-light px-3 py-1 rounded-full text-sm font-semibold">
                                            ID: {member.studentId}
                                        </div>
                                    </div>

                                    {/* Name based on language */}
                                    <h3 className="text-xl font-bold text-light mb-1">
                                        {language === "en"
                                            ? member.enName
                                            : member.khName}
                                    </h3>

                                    {/* Show both names on hover */}
                                    <div className="text-sm text-gray-400 mb-3">
                                        {language === "en"
                                            ? member.khName
                                            : member.enName}
                                    </div>

                                    <div className="text-primary font-medium mb-2">
                                        {member.role}
                                    </div>
                                    <p className="text-gray-300 text-sm mb-4">
                                        {member.description}
                                    </p>

                                    {/* Contact icons */}
                                    <div className="mt-4 flex space-x-3">
                                        <button
                                            className="w-8 h-8 rounded-full bg-dark border border-gray-600 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors"
                                            title="Email"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                            </svg>
                                        </button>
                                        <button
                                            className="w-8 h-8 rounded-full bg-dark border border-gray-600 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors"
                                            title="GitHub"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </button>
                                        <button
                                            className="w-8 h-8 rounded-full bg-dark border border-gray-600 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors"
                                            title="Telegram"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.698.064-1.229-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Team Stats */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-dark/30 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700">
                            <div className="text-3xl font-bold text-primary mb-2">
                                6
                            </div>
                            <div className="text-light font-medium">
                                Team Members
                            </div>
                            <div className="text-gray-400 text-sm mt-1">
                                សមាជិកក្រុម
                            </div>
                        </div>
                        <div className="bg-dark/30 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700">
                            <div className="text-3xl font-bold text-primary mb-2">
                                4
                            </div>
                            <div className="text-light font-medium">
                                Developers
                            </div>
                            <div className="text-gray-400 text-sm mt-1">
                                អ្នកអភិវឌ្ឍន៍
                            </div>
                        </div>
                        <div className="bg-dark/30 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700">
                            <div className="text-3xl font-bold text-primary mb-2">
                                2
                            </div>
                            <div className="text-light font-medium">
                                Specialists
                            </div>
                            <div className="text-gray-400 text-sm mt-1">
                                អ្នកជំនាញ
                            </div>
                        </div>
                        <div className="bg-dark/30 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700">
                            <div className="text-3xl font-bold text-primary mb-2">
                                100%
                            </div>
                            <div className="text-light font-medium">
                                Dedication
                            </div>
                            <div className="text-gray-400 text-sm mt-1">
                                ការប្តេជ្ញាចិត្ត
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold text-dark sm:text-5xl">
                            {t.featuresTitle}
                        </h2>
                        <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
                            {t.featuresSubtitle}
                        </p>
                    </div>

                    <div className="mt-16">
                        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="text-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-light mx-auto mb-6">
                                    <svg
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-dark">
                                    {t.feature1Title}
                                </h3>
                                <p className="mt-2 text-base text-gray-600">
                                    {t.feature1Desc}
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-light mx-auto mb-6">
                                    <svg
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-dark">
                                    {t.feature2Title}
                                </h3>
                                <p className="mt-2 text-base text-gray-600">
                                    {t.feature2Desc}
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-light mx-auto mb-6">
                                    <svg
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-dark">
                                    {t.feature3Title}
                                </h3>
                                <p className="mt-2 text-base text-gray-600">
                                    {t.feature3Desc}
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-light mx-auto mb-6">
                                    <svg
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-dark">
                                    {t.feature4Title}
                                </h3>
                                <p className="mt-2 text-base text-gray-600">
                                    {t.feature4Desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative gradient-primary overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundSize: "30px",
                        }}
                    ></div>
                </div>

                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold tracking-tight text-light sm:text-5xl">
                            <span className="block">{t.ctaTitle}</span>
                        </h2>
                        <p className="mt-6 text-xl leading-8 text-light/90">
                            {t.ctaDescription}
                        </p>
                        <div className="mt-10">
                            <Link
                                href={route("register")}
                                className="inline-flex items-center justify-center px-8 py-3 border-2 border-light text-base font-medium rounded-md text-primary bg-light hover:bg-light/90 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105"
                            >
                                {t.signUpFree}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
