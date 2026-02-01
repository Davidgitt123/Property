import React, { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import LanguageSwitcher from "@/Components/LanguageSwitcher";
import { Link, usePage } from "@inertiajs/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function UserLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const { language } = useLanguage();
    const { url } = usePage();

    const translations = {
        en: {
            dashboard: "Dashboard",
            properties: "Properties",
            browseProperties: "Browse Properties",
            myProperties: "My Properties",
            favorites: "Favorites",
            inquiries: "Inquiries",
            profile: "Profile",
            logout: "Log Out",
            home: "Home",
        },
        kh: {
            dashboard: "ផ្ទាំងគ្រប់គ្រង",
            properties: "អចលនទ្រព្យ",
            browseProperties: "មើលទ្រព្យសម្បត្តិ",
            myProperties: "ទ្រព្យសម្បត្តិរបស់ខ្ញុំ",
            favorites: "ចំណូលចិត្ត",
            inquiries: "ការស្នើសុំ",
            profile: "ប្រវត្តិរូប",
            logout: "ចាកចេញ",
            home: "ទំព័រដើម",
        },
    };

    const t = translations[language];

    const getNavigationItems = () => {
        const items = [
            {
                name: t.home,
                href: route("homepage"),
                current: route().current("homepage"),
            },
            {
                name: t.browseProperties,
                href: route("home.properties.browse"),
                current: route().current("home.properties.*"),
            },
        ];

        // Add "My Properties" if user is admin or agent (links to admin route)
        if (user?.is_admin || user?.is_agent) {
            items.push({
                name: t.myProperties,
                href: route("properties.my"),
                current: route().current("properties.my"),
            });

            // Also add "Manage Properties" for admin/agents to access admin panel
            items.push({
                name: t.manageProperties,
                href: route("properties.index"),
                current:
                    route().current("properties.index") &&
                    !route().current("home.properties.*"),
            });
        }

        items.push(
            { name: t.favorites, href: "#", current: false },
            { name: t.inquiries, href: "#", current: false }
        );

        return items;
    };

    const navigationItems = getNavigationItems();

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-dark border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo and Navigation */}
                        <div className="flex items-center">
                            <Link href="/home">
                                <ApplicationLogo className="h-9 w-auto fill-current text-white" />
                            </Link>

                            {/* Primary Navigation */}
                            <div className="hidden sm:-my-px sm:ms-10 sm:flex">
                                {navigationItems.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        href={item.href}
                                        active={
                                            item.current ||
                                            url.startsWith(item.href)
                                        }
                                        className="text-white hover:text-primary transition-colors duration-200"
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        {/* User Dropdown */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            {/* Language Switcher */}
                            <div className="ml-4">
                                <LanguageSwitcher />
                            </div>
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-transparent hover:text-primary focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-2">
                                                    {user.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                {user.name}
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            {t.profile}
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            {t.logout}
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        {navigationItems.map((item) => (
                            <ResponsiveNavLink
                                key={item.name}
                                href={item.href}
                                active={
                                    item.current || url.startsWith(item.href)
                                }
                                onClick={() =>
                                    setShowingNavigationDropdown(false)
                                }
                                className="text-white hover:bg-gray-700 hover:text-white"
                            >
                                {item.name}
                            </ResponsiveNavLink>
                        ))}
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-700">
                        <div className="px-4">
                            <div className="font-medium text-base text-white">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-400">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("profile.edit")}
                                onClick={() =>
                                    setShowingNavigationDropdown(false)
                                }
                                className="text-white hover:bg-gray-700 hover:text-white"
                            >
                                {t.profile}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                                onClick={() =>
                                    setShowingNavigationDropdown(false)
                                }
                                className="w-full text-left text-white hover:bg-gray-700 hover:text-white"
                            >
                                {t.logout}
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
