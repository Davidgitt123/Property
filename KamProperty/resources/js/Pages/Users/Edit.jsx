import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Dropdown from "@/Components/Dropdown";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Edit({ user }) {
    const { language } = useLanguage();
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
        role: user.role || "user",
        phone: user.phone || "",
        address: user.address || "",
        status: user.status || "active",
    });

    // State for dropdowns
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    const translations = {
        en: {
            title: "Edit User",
            updateUser: "Update User",
            back: "Back to Users",
            basicInfo: "Basic Information",
            accountInfo: "Account Information",
            name: "Full Name",
            email: "Email Address",
            phone: "Phone Number",
            address: "Address",
            password: "New Password (leave blank to keep current)",
            confirmPassword: "Confirm New Password",
            role: "Role",
            status: "Status",
            selectRole: "Select Role",
            selectStatus: "Select Status",
            admin: "Administrator",
            agent: "Agent",
            user: "Regular User",
            active: "Active",
            inactive: "Inactive",
            suspended: "Suspended",
            currentPassword: "Current password",
            updating: "Updating...",
            chooseRole: "Choose a role",
            chooseStatus: "Choose a status",
        },
        kh: {
            title: "កែសម្រួលអ្នកប្រើប្រាស់",
            updateUser: "អាប់ដេតអ្នកប្រើប្រាស់",
            back: "ត្រឡប់ទៅអ្នកប្រើប្រាស់",
            basicInfo: "ព័ត៌មានមូលដ្ឋាន",
            accountInfo: "ព័ត៌មានគណនី",
            name: "ឈ្មោះពេញ",
            email: "អាស័យដ្ឋានអ៊ីមែល",
            phone: "លេខទូរស័ព្ទ",
            address: "អាស័យដ្ឋាន",
            password:
                "ពាក្យសម្ងាត់ថ្មី (ទុកទទេដើម្បីរក្សាពាក្យសម្ងាត់បច្ចុប្បន្ន)",
            confirmPassword: "បញ្ជាក់ពាក្យសម្ងាត់ថ្មី",
            role: "តួនាទី",
            status: "ស្ថានភាព",
            selectRole: "ជ្រើសរើសតួនាទី",
            selectStatus: "ជ្រើសរើសស្ថានភាព",
            admin: "អ្នកគ្រប់គ្រង",
            agent: "ភ្នាក់ងារ",
            user: "អ្នកប្រើប្រាស់ធម្មតា",
            active: "សកម្ម",
            inactive: "អសកម្ម",
            suspended: "ផ្អាក",
            currentPassword: "ពាក្យសម្ងាត់បច្ចុប្បន្ន",
            updating: "កំពុងធ្វើបច្ចុប្បន្នភាព...",
            chooseRole: "ជ្រើសរើសតួនាទី",
            chooseStatus: "ជ្រើសរើសស្ថានភាព",
        },
    };

    const t = translations[language];

    // Role options with icons
    const roleOptions = [
        { value: "admin", label: t.admin, color: "bg-accent", icon: "👑" },
        { value: "agent", label: t.agent, color: "bg-primary", icon: "👔" },
        { value: "user", label: t.user, color: "bg-green-500", icon: "👤" },
    ];

    // Status options with colors
    const statusOptions = [
        {
            value: "active",
            label: t.active,
            color: "bg-green-100 text-green-800",
            icon: "✅",
        },
        {
            value: "inactive",
            label: t.inactive,
            color: "bg-yellow-100 text-yellow-800",
            icon: "⏸️",
        },
        {
            value: "suspended",
            label: t.suspended,
            color: "bg-red-100 text-red-800",
            icon: "⛔",
        },
    ];

    // Get selected role display
    const getSelectedRole = () => {
        const role = roleOptions.find((r) => r.value === data.role);
        return (
            role || { label: t.selectRole, color: "bg-gray-200", icon: "❓" }
        );
    };

    // Get selected status display
    const getSelectedStatus = () => {
        const status = statusOptions.find((s) => s.value === data.status);
        return (
            status || {
                label: t.selectStatus,
                color: "bg-gray-200 text-gray-800",
                icon: "❓",
            }
        );
    };

    const submit = (e) => {
        e.preventDefault();
        put(route("users.update", user.id));
    };

    // Handle role selection
    const handleRoleSelect = (roleValue) => {
        setData("role", roleValue);
        setShowRoleDropdown(false);
    };

    // Handle status selection
    const handleStatusSelect = (statusValue) => {
        setData("status", statusValue);
        setShowStatusDropdown(false);
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
                    <div>
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
                    </div>
                </div>
            }
        >
            <Head title={t.title} />

            <div className="max-w-3xl mx-auto">
                <form onSubmit={submit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                            {t.basicInfo}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1">
                                <InputLabel htmlFor="name" value={t.name} />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-1">
                                <InputLabel htmlFor="email" value={t.email} />
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-1">
                                <InputLabel htmlFor="phone" value={t.phone} />
                                <TextInput
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <InputLabel
                                    htmlFor="address"
                                    value={t.address}
                                />
                                <textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                    rows="3"
                                />
                                <InputError
                                    message={errors.address}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                            {t.accountInfo}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Password Fields */}
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="password"
                                    value={t.password}
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    placeholder="••••••••"
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value={t.confirmPassword}
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                    placeholder="••••••••"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            {/* Role Dropdown */}
                            <div className="col-span-1">
                                <InputLabel value={t.role} />
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                                            onClick={() =>
                                                setShowRoleDropdown(
                                                    !showRoleDropdown
                                                )
                                            }
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <span
                                                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                                                            getSelectedRole()
                                                                .color
                                                        } text-white mr-3`}
                                                    >
                                                        {getSelectedRole().icon}
                                                    </span>
                                                    <span className="text-gray-900 font-medium">
                                                        {
                                                            getSelectedRole()
                                                                .label
                                                        }
                                                    </span>
                                                </div>
                                                <svg
                                                    className="w-5 h-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </div>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content width="full" align="left">
                                        <div className="p-2">
                                            <div className="px-3 py-2 text-sm text-gray-500 font-medium border-b border-gray-100">
                                                {t.chooseRole}
                                            </div>
                                            <div className="mt-2 space-y-1">
                                                {roleOptions.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() =>
                                                            handleRoleSelect(
                                                                option.value
                                                            )
                                                        }
                                                        className={`w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center transition-colors duration-150 ${
                                                            data.role ===
                                                            option.value
                                                                ? "bg-gray-50"
                                                                : ""
                                                        }`}
                                                    >
                                                        <span
                                                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${option.color} text-white mr-3`}
                                                        >
                                                            {option.icon}
                                                        </span>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {option.label}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {option.value}
                                                            </p>
                                                        </div>
                                                        {data.role ===
                                                            option.value && (
                                                            <svg
                                                                className="w-4 h-4 text-green-500 ml-auto"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>
                                <InputError
                                    message={errors.role}
                                    className="mt-2"
                                />
                            </div>

                            {/* Status Dropdown */}
                            <div className="col-span-1">
                                <InputLabel value={t.status} />
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                                            onClick={() =>
                                                setShowStatusDropdown(
                                                    !showStatusDropdown
                                                )
                                            }
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <span
                                                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                                                            getSelectedStatus().color.split(
                                                                " "
                                                            )[0]
                                                        }`}
                                                    >
                                                        {
                                                            getSelectedStatus()
                                                                .icon
                                                        }
                                                    </span>
                                                    <span className="text-gray-900 font-medium">
                                                        {
                                                            getSelectedStatus()
                                                                .label
                                                        }
                                                    </span>
                                                </div>
                                                <svg
                                                    className="w-5 h-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </div>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content width="full" align="left">
                                        <div className="p-2">
                                            <div className="px-3 py-2 text-sm text-gray-500 font-medium border-b border-gray-100">
                                                {t.chooseStatus}
                                            </div>
                                            <div className="mt-2 space-y-1">
                                                {statusOptions.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() =>
                                                            handleStatusSelect(
                                                                option.value
                                                            )
                                                        }
                                                        className={`w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center transition-colors duration-150 ${
                                                            data.status ===
                                                            option.value
                                                                ? "bg-gray-50"
                                                                : ""
                                                        }`}
                                                    >
                                                        <span
                                                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                                                                option.color.split(
                                                                    " "
                                                                )[0]
                                                            }`}
                                                        >
                                                            {option.icon}
                                                        </span>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {option.label}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {option.value}
                                                            </p>
                                                        </div>
                                                        {data.status ===
                                                            option.value && (
                                                            <svg
                                                                className="w-4 h-4 text-green-500 ml-auto"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>
                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-4">
                        <Link href={route("users.index")}>
                            <SecondaryButton type="button">
                                {t.back}
                            </SecondaryButton>
                        </Link>
                        <PrimaryButton type="submit" disabled={processing}>
                            {processing ? (
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                            ) : null}
                            {processing ? t.updating : t.updateUser}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
