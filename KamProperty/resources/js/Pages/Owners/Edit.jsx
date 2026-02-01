import { React, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useLanguage } from "@/contexts/LanguageContext";
import Dropdown from "@/Components/Dropdown";

export default function Edit({ owner, availableUsers, identificationTypes }) {
    const { language } = useLanguage();

    const [userSearch, setUserSearch] = useState("");
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const { data, setData, put, processing, errors } = useForm({
        name: owner.name || "",
        email: owner.email || "",
        phone: owner.phone || "",
        alternate_phone: owner.alternate_phone || "",
        address: owner.address || "",
        identification_type: owner.identification_type || "",
        identification_number: owner.identification_number || "",
        tax_id: owner.tax_id || "",
        notes: owner.notes || "",
        user_id: owner.user_id || "",
    });

    const translations = {
        en: {
            title: "Edit Owner",
            updateOwner: "Update Owner",
            back: "Back to Owners",
            viewOwner: "View Owner",
            basicInfo: "Basic Information",
            contactInfo: "Contact Information",
            identificationInfo: "Identification Information",
            additionalInfo: "Additional Information",
            name: "Full Name",
            email: "Email Address",
            phone: "Phone Number",
            alternatePhone: "Alternate Phone",
            address: "Address",
            identificationType: "Identification Type",
            selectType: "Select Type",
            identificationNumber: "Identification Number",
            taxId: "Tax ID",
            notes: "Notes",
            linkUserAccount: "Link User Account (Optional)",
            selectUser: "Select User",
            searchUsers: "Search users...",
            clearSelection: "Clear Selection",
            linked: "Linked",
            notLinked: "Not Linked",
            noResults: "No users found",
            unlinkAccount: "Unlink Account",
            noUsersAvailable: "No users available for linking",
            optional: "Optional",
            required: "Required",
            cancel: "Cancel",
            updating: "Updating...",
            currentLinkedAccount: "Currently Linked Account",
            none: "None",
            cannotUnlink: "Cannot unlink account with existing properties",
            unlinkWarning: "Are you sure you want to unlink this user account?",
        },
        kh: {
            title: "កែសម្រួលម្ចាស់",
            updateOwner: "ធ្វើបច្ចុប្បន្នភាពម្ចាស់",
            back: "ត្រឡប់ទៅម្ចាស់",
            viewOwner: "មើលម្ចាស់",
            basicInfo: "ព័ត៌មានមូលដ្ឋាន",
            contactInfo: "ព័ត៌មានទំនាក់ទំនង",
            identificationInfo: "ព័ត៌មានអត្តសញ្ញាណ",
            additionalInfo: "ព័ត៌មានបន្ថែម",
            name: "ឈ្មោះពេញ",
            email: "អាស័យដ្ឋានអ៊ីមែល",
            phone: "លេខទូរស័ព្ទ",
            alternatePhone: "ទូរស័ព្ទជំនួស",
            address: "អាស័យដ្ឋាន",
            identificationType: "ប្រភេទអត្តសញ្ញាណ",
            selectType: "ជ្រើសរើសប្រភេទ",
            identificationNumber: "លេខអត្តសញ្ញាណ",
            taxId: "លេខអត្តសញ្ញាណពន្ធ",
            notes: "កំណត់ចំណាំ",
            linkUserAccount: "ភ្ជាប់គណនីអ្នកប្រើប្រាស់ (ស្រេចចិត្ត)",
            selectUser: "ជ្រើសរើសអ្នកប្រើប្រាស់",
            searchUsers: "ស្វែងរកអ្នកប្រើប្រាស់...",
            clearSelection: "សម្អាតការជ្រើសរើស",
            linked: "ភ្ជាប់",
            notLinked: "ផ្ដាច់",
            noResults: "គ្មានលទ្ធផល",
            unlinkAccount: "ផ្ដាច់គណនី",
            noUsersAvailable: "គ្មានអ្នកប្រើប្រាស់ដែលអាចភ្ជាប់បាន",
            optional: "ស្រេចចិត្ត",
            required: "ទាមទារ",
            cancel: "បោះបង់",
            updating: "កំពុងធ្វើបច្ចុប្បន្នភាព...",
            currentLinkedAccount: "គណនីដែលបានភ្ជាប់បច្ចុប្បន្ន",
            none: "គ្មាន",
            cannotUnlink: "មិនអាចផ្ដាច់គណនីដែលមានអចលនទ្រព្យបានទេ",
            unlinkWarning: "តើអ្នកពិតជាចង់ផ្ដាច់គណនីអ្នកប្រើប្រាស់នេះមែនទេ?",
        },
    };

    const t = translations[language];

    const submit = (e) => {
        e.preventDefault();
        put(route("owners.update", owner.id));
    };

    const unlinkAccount = () => {
        if (owner.properties_count > 0) {
            alert(t.cannotUnlink);
            return;
        }

        if (confirm(t.unlinkWarning)) {
            setData("user_id", "");
            setShowUserDropdown(false);
            setUserSearch("");
        }
    };

    // Get current linked user info
    const currentLinkedUser = availableUsers.find(
        (user) => user.id === owner.user_id
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            {t.title}: {owner.name}
                        </h2>
                    </div>
                    <div className="flex space-x-3">
                        <Link href={route("owners.index")}>
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
                        <Link href={route("owners.show", owner.id)}>
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
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                                {t.viewOwner}
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={t.title} />

            <div className="max-w-4xl mx-auto">
                <form onSubmit={submit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                            {t.basicInfo}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="name"
                                    value={t.name}
                                    required
                                />
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
                                <InputLabel
                                    htmlFor="email"
                                    value={t.email}
                                    required
                                />
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
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                            {t.contactInfo}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="alternate_phone"
                                    value={t.alternatePhone}
                                />
                                <TextInput
                                    id="alternate_phone"
                                    type="tel"
                                    value={data.alternate_phone}
                                    onChange={(e) =>
                                        setData(
                                            "alternate_phone",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.alternate_phone}
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

                    {/* Identification Information */}
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                            {t.identificationInfo}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="identification_type"
                                    value={t.identificationType}
                                />
                                <select
                                    id="identification_type"
                                    value={data.identification_type}
                                    onChange={(e) =>
                                        setData(
                                            "identification_type",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                >
                                    <option value="">{t.selectType}</option>
                                    {Object.entries(identificationTypes).map(
                                        ([key, value]) => (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        )
                                    )}
                                </select>
                                <InputError
                                    message={errors.identification_type}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="identification_number"
                                    value={t.identificationNumber}
                                />
                                <TextInput
                                    id="identification_number"
                                    type="text"
                                    value={data.identification_number}
                                    onChange={(e) =>
                                        setData(
                                            "identification_number",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.identification_number}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-1">
                                <InputLabel htmlFor="tax_id" value={t.taxId} />
                                <TextInput
                                    id="tax_id"
                                    type="text"
                                    value={data.tax_id}
                                    onChange={(e) =>
                                        setData("tax_id", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.tax_id}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Link User Account */}
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                            {t.linkUserAccount}
                        </h3>
                        <div className="space-y-6">
                            {/* Current Linked Account */}
                            {currentLinkedUser && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                                                {currentLinkedUser.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-blue-900">
                                                    {t.currentLinkedAccount}
                                                </p>
                                                <p className="text-sm text-blue-700">
                                                    {currentLinkedUser.name} (
                                                    {currentLinkedUser.email})
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={unlinkAccount}
                                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                                        >
                                            {t.unlinkAccount}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* User Selection with Dropdown */}
                            <div className="relative">
                                <InputLabel value={t.selectUser} />

                                {/* Selected User Display */}
                                {data.user_id ? (
                                    <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-gray-50">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                                                {availableUsers
                                                    .find(
                                                        (u) =>
                                                            u.id ===
                                                            data.user_id
                                                    )
                                                    ?.name?.charAt(0)
                                                    .toUpperCase() || "U"}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {
                                                        availableUsers.find(
                                                            (u) =>
                                                                u.id ===
                                                                data.user_id
                                                        )?.name
                                                    }{" "}
                                                    (
                                                    {
                                                        availableUsers.find(
                                                            (u) =>
                                                                u.id ===
                                                                data.user_id
                                                        )?.email
                                                    }
                                                    )
                                                </p>
                                                <p className="text-xs text-green-600 font-medium">
                                                    <span className="inline-flex items-center">
                                                        <svg
                                                            className="w-3 h-3 mr-1"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        {t.linked}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData("user_id", "");
                                                setShowUserDropdown(false);
                                            }}
                                            className="text-sm text-gray-500 hover:text-gray-700"
                                        >
                                            {t.clearSelection}
                                        </button>
                                    </div>
                                ) : (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button
                                                type="button"
                                                className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                                                onClick={() =>
                                                    setShowUserDropdown(
                                                        !showUserDropdown
                                                    )
                                                }
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500">
                                                        {t.selectUser}
                                                    </span>
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

                                        <Dropdown.Content
                                            width="full"
                                            align="left"
                                        >
                                            <div className="p-2">
                                                {/* Search Input */}
                                                <div className="mb-2">
                                                    <input
                                                        type="text"
                                                        placeholder={
                                                            t.searchUsers
                                                        }
                                                        value={userSearch}
                                                        onChange={(e) =>
                                                            setUserSearch(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                        autoFocus
                                                    />
                                                </div>

                                                {/* Users List */}
                                                <div className="max-h-60 overflow-y-auto">
                                                    {availableUsers.filter(
                                                        (user) =>
                                                            user.id !==
                                                                owner.user_id && // Exclude currently linked user
                                                            (user.name
                                                                .toLowerCase()
                                                                .includes(
                                                                    userSearch.toLowerCase()
                                                                ) ||
                                                                user.email
                                                                    .toLowerCase()
                                                                    .includes(
                                                                        userSearch.toLowerCase()
                                                                    ))
                                                    ).length > 0 ? (
                                                        availableUsers
                                                            .filter(
                                                                (user) =>
                                                                    user.id !==
                                                                        owner.user_id &&
                                                                    (user.name
                                                                        .toLowerCase()
                                                                        .includes(
                                                                            userSearch.toLowerCase()
                                                                        ) ||
                                                                        user.email
                                                                            .toLowerCase()
                                                                            .includes(
                                                                                userSearch.toLowerCase()
                                                                            ))
                                                            )
                                                            .map((user) => (
                                                                <button
                                                                    key={
                                                                        user.id
                                                                    }
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setData(
                                                                            "user_id",
                                                                            user.id
                                                                        );
                                                                        setShowUserDropdown(
                                                                            false
                                                                        );
                                                                        setUserSearch(
                                                                            ""
                                                                        );
                                                                    }}
                                                                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center transition-colors duration-150"
                                                                >
                                                                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                                                                        {user.name
                                                                            .charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase()}
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-gray-900">
                                                                            {
                                                                                user.name
                                                                            }
                                                                        </p>
                                                                        <p className="text-xs text-gray-500">
                                                                            {
                                                                                user.email
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </button>
                                                            ))
                                                    ) : (
                                                        <div className="px-3 py-2 text-sm text-gray-500 text-center">
                                                            {t.noResults}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Dropdown.Content>
                                    </Dropdown>
                                )}

                                <p className="mt-1 text-sm text-gray-500">
                                    {currentLinkedUser
                                        ? `${
                                              t.unlinkAccount
                                          } ${t.optional.toLowerCase()}`
                                        : `${
                                              t.optional
                                          }: ${t.linkUserAccount.toLowerCase()}`}
                                </p>
                                <InputError
                                    message={errors.user_id}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                            {t.additionalInfo}
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <InputLabel htmlFor="notes" value={t.notes} />
                                <textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                    rows="4"
                                />
                                <InputError
                                    message={errors.notes}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-4">
                        <Link href={route("owners.show", owner.id)}>
                            <SecondaryButton type="button">
                                {t.cancel}
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
                            {processing ? t.updating : t.updateOwner}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
