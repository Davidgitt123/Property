import React, { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import LanguageSwitcher from "@/Components/LanguageSwitcher";
import { Link, usePage } from "@inertiajs/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AuthenticatedLayout({ header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const { language } = useLanguage();
    const { auth } = usePage().props;

    const user = auth?.user;

    // Safety check - if no user, show loading
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    const translations = {
        en: {
            dashboard: "Dashboard",
            properties: "Properties",
            inquiries: "Inquiries",
            users: "Users Management",
            owners: "Owners Management",
            reports: "Reports",
            myListings: "My Listings",
            browseProperties: "Browse Properties",
            commission: "Commission",
            owners: "Owners",
            profile: "Profile",
            logout: "Log Out",
            settings: "Settings",
        },
        kh: {
            dashboard: "ផ្ទាំងគ្រប់គ្រង",
            properties: "អចលនទ្រព្យ",
            inquiries: "ការស្នើសុំ",
            users: "អ្នកប្រើប្រាស់",
            reports: "របាយការណ៍",
            myListings: "បញ្ជីរបស់ខ្ញុំ",
            browseProperties: "រុករកអចលនទ្រព្យ",
            commission: "កម្រៃជើងសារ",
            owners: "ម្ចាស់អចលនទ្រព្យ",
            profile: "ប្រវត្តិរូប",
            logout: "ចាកចេញ",
            settings: "ការកំណត់",
        },
    };

    const t = translations[language];

    // Role-based navigation items
    const getNavigationItems = () => {
        const items = [
            {
                name: t.dashboard,
                href: route("dashboard"),
                current: route().current("dashboard"),
                icon: (
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                    </svg>
                ),
            },
        ];

        if (user.is_admin || user.is_agent) {
            items.push(
                {
                    name: t.properties,
                    href: route("properties.index"),
                    current: route().current("properties.*"),
                    icon: (
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                        </svg>
                    ),
                },
                {
                    name: t.inquiries,
                    href: route("inquiries.index"),
                    current: route().current("inquiries.*"),
                    icon: (
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    ),
                }
            );
        }

        if (user.is_admin) {
            items.push(
                {
                    name: t.users,
                    href: route("users.index"),
                    current: route().current("users.*"),
                    icon: (
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    ),
                },
                {
                    name: t.owners,
                    href: route("owners.index"),
                    current: route().current("owners.*"),
                    icon: (
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    ),
                },
                {
                    name: t.reports,
                    href: route("reports.index"),
                    current: route().current("reports.*"),
                    icon: (
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                        </svg>
                    ),
                }
            );
        }

        if (user.is_agent) {
            items.push(
                {
                    name: t.myListings,
                    href: route("properties.my"),
                    current: route().current("properties.my"),
                    icon: (
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    ),
                },
                {
                    name: t.commission,
                    href: route("commission.index"),
                    current: route().current("commission.*"),
                    icon: (
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    ),
                }
            );
        }

        return items;
    };

    const getRoleColor = (role) => {
        switch (role) {
            case "admin":
                return "bg-accent text-white";
            case "agent":
                return "bg-primary text-white";
            case "user":
                return "bg-green-500 text-white";
            default:
                return "bg-gray-600 text-white";
        }
    };

    const getRoleText = (role) => {
        switch (role) {
            case "admin":
                return "Admin";
            case "agent":
                return "Agent";
            case "user":
                return "User";
            default:
                return role;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex fixed inset-0 overflow-hidden">
            {/* Dark Sidebar */}
            <div className="w-64 bg-dark flex flex-col hidden md:flex">
                {/* Logo */}
                <div className="p-6 border-b border-gray-800">
                    <Link href="/" className="flex items-center">
                        <ApplicationLogo className="h-8 w-auto fill-current text-white" />
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="px-4 space-y-1">
                        {getNavigationItems().map((item) => (
                            <NavLink
                                key={item.name}
                                href={item.href}
                                active={item.current}
                                className="flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 relative group hover:bg-gray-800/30"
                                activeClassName="text-white bg-gray-800/40"
                                inactiveClassName="text-gray-400 hover:text-white"
                            >
                                {/* Active indicator dot */}
                                {item.current && (
                                    <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"></div>
                                )}

                                {/* Icon */}
                                <div className="flex-shrink-0">{item.icon}</div>

                                {/* Label */}
                                <div className="ml-3 flex-1">
                                    <div className="relative inline-block">
                                        {item.name}
                                        {/* Hover underline effect */}
                                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Language Switcher in Sidebar */}
                    <div className="px-4 mt-4">
                        {/* Separator before language switcher */}
                        <div className="relative mb-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-800/50"></div>
                            </div>
                        </div>

                        <div className="flex items-center px-4 py-3 rounded-lg bg-gray-800/40">
                            <LanguageSwitcher darkMode={true} />
                        </div>
                    </div>
                </div>

                {/* User Info at Bottom - SIMPLIFIED VERSION */}
                <div className="p-4 border-t border-gray-800">
                    <div className="flex flex-col space-y-3">
                        {/* User Info */}
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-3 text-left flex-1 min-w-0">
                                <div className="text-sm font-medium text-white truncate">
                                    {user.name}
                                </div>
                                <div className="text-xs text-gray-400 truncate">
                                    {user.email}
                                </div>
                                <div
                                    className={`mt-1 inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${getRoleColor(
                                        user.role
                                    )}`}
                                >
                                    {getRoleText(user.role)}
                                </div>
                            </div>
                        </div>

                        {/* Profile and Logout Buttons */}
                        <div className="flex flex-col space-y-2">
                            <Link
                                href={route("profile.edit")}
                                className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
                            >
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                {t.profile}
                            </Link>

                            {(user.is_admin || user.is_agent) && (
                                <Link
                                    href={route("settings.index")}
                                    className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    {t.settings}
                                </Link>
                            )}

                            <div className="border-t border-gray-800 pt-2">
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="flex items-center px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors duration-200 w-full text-left"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    {t.logout}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation Bar (Mobile) */}
                <nav className="bg-gray-900 md:hidden">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            {/* Logo */}
                            <div className="flex items-center">
                                <Link href="/" className="flex items-center">
                                    <ApplicationLogo className="h-8 w-auto fill-current text-white" />
                                </Link>
                            </div>

                            {/* Mobile menu button and User Info */}
                            <div className="flex items-center space-x-4">
                                {/* Mobile Language Switcher */}
                                <LanguageSwitcher darkMode={true} />

                                {/* User Info */}
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="ml-2 text-sm text-white font-medium hidden sm:block">
                                        {user.name}
                                    </span>
                                </div>

                                {/* Mobile menu button */}
                                <div className="flex items-center">
                                    <button
                                        onClick={() =>
                                            setShowingNavigationDropdown(
                                                (previousState) =>
                                                    !previousState
                                            )
                                        }
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                                    >
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        <svg
                                            className={`${
                                                showingNavigationDropdown
                                                    ? "hidden"
                                                    : "block"
                                            } h-6 w-6`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                        <svg
                                            className={`${
                                                showingNavigationDropdown
                                                    ? "block"
                                                    : "hidden"
                                            } h-6 w-6`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <div
                        className={`${
                            showingNavigationDropdown ? "block" : "hidden"
                        } bg-gray-900`}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {getNavigationItems().map((item) => (
                                <ResponsiveNavLink
                                    key={item.name}
                                    href={item.href}
                                    active={item.current}
                                    className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium relative group ${
                                        item.current
                                            ? "text-white bg-gray-800"
                                            : "text-gray-400 hover:text-white hover:bg-gray-800"
                                    }`}
                                >
                                    {/* Active indicator dot */}
                                    {item.current && (
                                        <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"></div>
                                    )}

                                    <div className="flex items-center ml-3">
                                        <div className="w-5 h-5 mr-3 flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <div className="relative inline-block">
                                            {item.name}
                                            {/* Hover underline effect */}
                                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                        </div>
                                    </div>
                                </ResponsiveNavLink>
                            ))}
                        </div>

                        <div className="pt-4 pb-3 border-t border-gray-800">
                            <div className="flex items-center px-5 mb-4">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-white">
                                        {user.name}
                                    </div>
                                    <div className="text-sm font-medium text-gray-400">
                                        {user.email}
                                    </div>
                                    <div
                                        className={`mt-1 inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${getRoleColor(
                                            user.role
                                        )}`}
                                    >
                                        {getRoleText(user.role)}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 px-2 space-y-2">
                                <ResponsiveNavLink
                                    href={route("profile.edit")}
                                    className="flex items-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg px-3 py-3"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    {t.profile}
                                </ResponsiveNavLink>

                                {(user.is_admin || user.is_agent) && (
                                    <ResponsiveNavLink
                                        href={route("settings.index")}
                                        className="flex items-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg px-3 py-3"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        {t.settings}
                                    </ResponsiveNavLink>
                                )}

                                <div className="border-t border-gray-800 pt-2">
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route("logout")}
                                        as="button"
                                        className="flex items-center text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg px-3 py-3 w-full text-left"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        {t.logout}
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Page Header - Fixed */}
                {header && (
                    <header className="bg-white shadow-sm">
                        <div className="max-w-full mx-auto py-4 px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">{header}</div>
                            </div>
                        </div>
                    </header>
                )}

                {/* Main Content - Scrollable only this area */}
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="py-6 px-4 sm:px-6 lg:px-8">{children}</div>
                </main>

                {/* Optional Footer */}
                <footer className="bg-white border-t border-gray-200">
                    <div className="max-w-full mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="text-sm text-gray-500">
                                © {new Date().getFullYear()} KamProperty. All
                                rights reserved.
                            </div>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                                <a
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-primary"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-primary"
                                >
                                    Terms of Service
                                </a>
                                <a
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-primary"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
