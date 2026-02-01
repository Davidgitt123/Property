import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Show({ user }) {
    const { language } = useLanguage();

    const translations = {
        en: {
            title: "User Details",
            back: "Back to Users",
            edit: "Edit User",
            basicInfo: "Basic Information",
            accountInfo: "Account Information",
            activityInfo: "Activity Information",
            name: "Full Name",
            email: "Email Address",
            phone: "Phone Number",
            address: "Address",
            role: "Role",
            status: "Status",
            createdAt: "Joined Date",
            lastLogin: "Last Login",
            properties: "Properties Listed",
            admin: "Administrator",
            agent: "Agent",
            user: "Regular User",
            active: "Active",
            inactive: "Inactive",
            suspended: "Suspended",
            noProperties: "No properties listed yet.",
            userProperties: "User Properties",
        },
        kh: {
            title: "ព័ត៌មានលម្អិតអ្នកប្រើប្រាស់",
            back: "ត្រឡប់ទៅអ្នកប្រើប្រាស់",
            edit: "កែសម្រួលអ្នកប្រើប្រាស់",
            basicInfo: "ព័ត៌មានមូលដ្ឋាន",
            accountInfo: "ព័ត៌មានគណនី",
            activityInfo: "ព័ត៌មានសកម្មភាព",
            name: "ឈ្មោះពេញ",
            email: "អាស័យដ្ឋានអ៊ីមែល",
            phone: "លេខទូរស័ព្ទ",
            address: "អាស័យដ្ឋាន",
            role: "តួនាទី",
            status: "ស្ថានភាព",
            createdAt: "កាលបរិច្ឆេទចូលរួម",
            lastLogin: "ចូលចុងក្រោយ",
            properties: "អចលនទ្រព្យដែលបានដាក់បញ្ជី",
            admin: "អ្នកគ្រប់គ្រង",
            agent: "ភ្នាក់ងារ",
            user: "អ្នកប្រើប្រាស់ធម្មតា",
            active: "សកម្ម",
            inactive: "អសកម្ម",
            suspended: "ផ្អាក",
            noProperties: "មិនទាន់មានអចលនទ្រព្យដែលបានដាក់បញ្ជីទេ។",
            userProperties: "អចលនទ្រព្យរបស់អ្នកប្រើប្រាស់",
        },
    };

    const t = translations[language];

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

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800";
            case "inactive":
                return "bg-yellow-100 text-yellow-800";
            case "suspended":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString(
            language === "kh" ? "km-KH" : "en-US",
            {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            {t.title}: {user.name}
                        </h2>
                    </div>
                    <div className="flex space-x-3">
                        <Link href={route("users.index")}>
                            <SecondaryButton>
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
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                {t.back}
                            </SecondaryButton>
                        </Link>
                        <Link href={route("users.edit", user.id)}>
                            <PrimaryButton>
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
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                                {t.edit}
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={t.title} />

            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column - User Info */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Basic Information Card */}
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                                {t.basicInfo}
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900">
                                            {user.name}
                                        </h4>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(
                                                    user.role
                                                )}`}
                                            >
                                                {user.role}
                                            </span>
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                                    user.status
                                                )}`}
                                            >
                                                {user.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">
                                            {t.email}
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">
                                            {t.phone}
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {user.phone || "-"}
                                        </p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-500">
                                            {t.address}
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {user.address || "-"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Properties Card (if agent or has properties) */}
                        {(user.role === "agent" ||
                            user.properties?.length > 0) && (
                            <div className="bg-white shadow-sm rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                                    {t.userProperties}
                                </h3>
                                {user.properties &&
                                user.properties.length > 0 ? (
                                    <div className="space-y-4">
                                        {user.properties.map((property) => (
                                            <div
                                                key={property.id}
                                                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                                            >
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-medium text-gray-900">
                                                        {property.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {property.location}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-semibold text-primary">
                                                        $
                                                        {property.price.toLocaleString()}
                                                    </div>
                                                    <span
                                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            property.status ===
                                                            "available"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-gray-100 text-gray-800"
                                                        }`}
                                                    >
                                                        {property.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">
                                        {t.noProperties}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Account Info */}
                    <div className="space-y-6">
                        {/* Account Information Card */}
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                                {t.accountInfo}
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">
                                        {t.role}
                                    </label>
                                    <div className="mt-1">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(
                                                user.role
                                            )}`}
                                        >
                                            {user.role}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">
                                        {t.status}
                                    </label>
                                    <div className="mt-1">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                                user.status
                                            )}`}
                                        >
                                            {user.status}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">
                                        {t.createdAt}
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {formatDate(user.created_at)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Activity Information Card */}
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                                {t.activityInfo}
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">
                                        {t.lastLogin}
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {formatDate(user.last_login_at)}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">
                                        {t.properties}
                                    </label>
                                    <p className="mt-1 text-2xl font-semibold text-primary">
                                        {user.properties?.length || 0}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Quick Actions
                            </h3>
                            <div className="space-y-2">
                                <Link
                                    href={route("users.edit", user.id)}
                                    className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                    {t.edit}
                                </Link>
                                <Link
                                    href={route("profile.edit")}
                                    className="flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                    Reset Password
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
