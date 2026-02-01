import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Create() {
    const { language } = useLanguage();
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "user",
        phone: "",
        address: "",
        status: "active",
    });

    const translations = {
        en: {
            title: "Create New User",
            createUser: "Create User",
            back: "Back to Users",
            basicInfo: "Basic Information",
            accountInfo: "Account Information",
            name: "Full Name",
            email: "Email Address",
            phone: "Phone Number",
            address: "Address",
            password: "Password",
            confirmPassword: "Confirm Password",
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
        },
        kh: {
            title: "បង្កើតអ្នកប្រើប្រាស់ថ្មី",
            createUser: "បង្កើតអ្នកប្រើប្រាស់",
            back: "ត្រឡប់ទៅអ្នកប្រើប្រាស់",
            basicInfo: "ព័ត៌មានមូលដ្ឋាន",
            accountInfo: "ព័ត៌មានគណនី",
            name: "ឈ្មោះពេញ",
            email: "អាស័យដ្ឋានអ៊ីមែល",
            phone: "លេខទូរស័ព្ទ",
            address: "អាស័យដ្ឋាន",
            password: "ពាក្យសម្ងាត់",
            confirmPassword: "បញ្ជាក់ពាក្យសម្ងាត់",
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
        },
    };

    const t = translations[language];

    const submit = (e) => {
        e.preventDefault();
        post(route("users.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            {t.title}
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
                                    required
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
                                    required
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-1">
                                <InputLabel htmlFor="role" value={t.role} />
                                <select
                                    id="role"
                                    value={data.role}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                >
                                    <option value="">{t.selectRole}</option>
                                    <option value="admin">{t.admin}</option>
                                    <option value="agent">{t.agent}</option>
                                    <option value="user">{t.user}</option>
                                </select>
                                <InputError
                                    message={errors.role}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-1">
                                <InputLabel htmlFor="status" value={t.status} />
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                >
                                    <option value="">{t.selectStatus}</option>
                                    <option value="active">{t.active}</option>
                                    <option value="inactive">
                                        {t.inactive}
                                    </option>
                                    <option value="suspended">
                                        {t.suspended}
                                    </option>
                                </select>
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
                            {t.createUser}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
