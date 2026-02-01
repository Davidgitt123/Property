import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import Dropdown from "@/Components/Dropdown";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = ({ owners, filters, stats }) => {
    const { language } = useLanguage();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [ownerToDelete, setOwnerToDelete] = useState(null);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    const translations = {
        en: {
            title: "Property Owners",
            subtitle: "Manage property owners and their information",
            addOwner: "Add New Owner",
            search: "Search owners...",
            filterByProperties: "Filter by Properties",
            allOwners: "All Owners",
            withProperties: "With Properties",
            withoutProperties: "Without Properties",
            name: "Name",
            email: "Email",
            phone: "Phone",
            properties: "Properties",
            status: "Status",
            actions: "Actions",
            view: "View",
            edit: "Edit",
            delete: "Delete",
            showing: "Showing",
            to: "to",
            of: "of",
            results: "results",
            totalOwners: "Total Owners",
            withPropertiesCount: "With Properties",
            withoutPropertiesCount: "Without Properties",
            linkedAccounts: "Linked Accounts",
            noOwnersFound: "No owners found.",
            confirmDelete: "Are you sure you want to delete this owner?",
            deleteWarning:
                "This action cannot be undone. Owner must not have any properties.",
            cancel: "Cancel",
            deleteOwner: "Delete Owner",
            linked: "Linked",
            notLinked: "Not Linked",
        },
        kh: {
            title: "ម្ចាស់អចលនទ្រព្យ",
            subtitle: "គ្រប់គ្រងម្ចាស់អចលនទ្រព្យនិងព័ត៌មានរបស់ពួកគេ",
            addOwner: "បន្ថែមម្ចាស់ថ្មី",
            search: "ស្វែងរកម្ចាស់...",
            filterByProperties: "ត្រងតាមអចលនទ្រព្យ",
            allOwners: "ម្ចាស់ទាំងអស់",
            withProperties: "មានអចលនទ្រព្យ",
            withoutProperties: "គ្មានអចលនទ្រព្យ",
            name: "ឈ្មោះ",
            email: "អ៊ីមែល",
            phone: "ទូរស័ព្ទ",
            properties: "អចលនទ្រព្យ",
            status: "ស្ថានភាព",
            actions: "សកម្មភាព",
            view: "មើល",
            edit: "កែសម្រួល",
            delete: "លុប",
            showing: "បង្ហាញ",
            to: "ទៅ",
            of: "នៃ",
            results: "លទ្ធផល",
            totalOwners: "ម្ចាស់សរុប",
            withPropertiesCount: "មានអចលនទ្រព្យ",
            withoutPropertiesCount: "គ្មានអចលនទ្រព្យ",
            linkedAccounts: "គណនីភ្ជាប់",
            noOwnersFound: "រកមិនឃើញម្ចាស់ទេ។",
            confirmDelete: "តើអ្នកពិតជាចង់លុបម្ចាស់នេះមែនទេ?",
            deleteWarning:
                "សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។ ម្ចាស់ត្រូវតែគ្មានអចលនទ្រព្យណាមួយ។",
            cancel: "បោះបង់",
            deleteOwner: "លុបម្ចាស់",
            linked: "បានភ្ជាប់",
            notLinked: "មិនបានភ្ជាប់",
        },
    };

    const t = translations[language];

    const handleSearch = (e) => {
        router.get(
            route("owners.index"),
            {
                ...filters,
                search: e.target.value,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleFilterChange = (filterName, value) => {
        router.get(
            route("owners.index"),
            {
                ...filters,
                [filterName]: value,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleDelete = (owner) => {
        setOwnerToDelete(owner);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (ownerToDelete) {
            router.delete(route("owners.destroy", ownerToDelete.id));
            setShowDeleteModal(false);
            setOwnerToDelete(null);
        }
    };

    const getStatusColor = (hasProperties, isLinked) => {
        if (hasProperties > 0) {
            return "bg-green-100 text-green-800";
        }
        if (isLinked) {
            return "bg-blue-100 text-blue-800";
        }
        return "bg-gray-100 text-gray-800";
    };

    const getStatusText = (hasProperties, isLinked) => {
        if (hasProperties > 0) {
            return `${hasProperties} ${t.properties.toLowerCase()}`;
        }
        return isLinked ? t.linked : t.notLinked;
    };

    const formatPhone = (phone) => {
        if (!phone) return "-";
        return phone;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            {t.title}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {t.subtitle}
                        </p>
                    </div>
                    <Link href={route("owners.create")}>
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
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            {t.addOwner}
                        </PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title={t.title} />

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-2xl font-bold text-gray-900">
                        {stats.total}
                    </div>
                    <div className="text-sm text-gray-600">{t.totalOwners}</div>
                    <div className="mt-2 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-2xl font-bold text-green-600">
                        {stats.with_properties}
                    </div>
                    <div className="text-sm text-gray-600">
                        {t.withPropertiesCount}
                    </div>
                    <div className="mt-2 h-1 w-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-2xl font-bold text-yellow-600">
                        {stats.without_properties}
                    </div>
                    <div className="text-sm text-gray-600">
                        {t.withoutPropertiesCount}
                    </div>
                    <div className="mt-2 h-1 w-full bg-gradient-to-r from-yellow-500 to-red-500 rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-2xl font-bold text-primary">
                        {stats.linked_accounts}
                    </div>
                    <div className="text-sm text-gray-600">
                        {t.linkedAccounts}
                    </div>
                    <div className="mt-2 h-1 w-full bg-gradient-to-r from-primary to-green-500 rounded-full"></div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t.search}
                        </label>
                        <input
                            type="text"
                            placeholder={t.search}
                            value={filters.search || ""}
                            onChange={handleSearch}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    {/* Properties Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t.filterByProperties}
                        </label>

                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="w-full text-left px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                                    onClick={() =>
                                        setShowFilterDropdown(
                                            !showFilterDropdown
                                        )
                                    }
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-900">
                                            {filters.has_properties === "with"
                                                ? t.withProperties
                                                : filters.has_properties ===
                                                  "without"
                                                ? t.withoutProperties
                                                : t.allOwners}
                                        </span>
                                        <svg
                                            className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                                                showFilterDropdown
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
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
                                <div className="py-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleFilterChange(
                                                "has_properties",
                                                ""
                                            );
                                            setShowFilterDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 flex items-center ${
                                            !filters.has_properties
                                                ? "bg-primary/10 text-primary"
                                                : "hover:bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        {!filters.has_properties && (
                                            <svg
                                                className="w-4 h-4 mr-2 text-primary"
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
                                        {t.allOwners}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleFilterChange(
                                                "has_properties",
                                                "with"
                                            );
                                            setShowFilterDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 flex items-center ${
                                            filters.has_properties === "with"
                                                ? "bg-green-50 text-green-700"
                                                : "hover:bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        {filters.has_properties === "with" && (
                                            <svg
                                                className="w-4 h-4 mr-2 text-green-600"
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
                                        <div className="flex items-center">
                                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                                <svg
                                                    className="w-3 h-3 text-green-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                            {t.withProperties}
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleFilterChange(
                                                "has_properties",
                                                "without"
                                            );
                                            setShowFilterDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 flex items-center ${
                                            filters.has_properties === "without"
                                                ? "bg-yellow-50 text-yellow-700"
                                                : "hover:bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        {filters.has_properties ===
                                            "without" && (
                                            <svg
                                                className="w-4 h-4 mr-2 text-yellow-600"
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
                                        <div className="flex items-center">
                                            <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                                                <svg
                                                    className="w-3 h-3 text-yellow-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </div>
                                            {t.withoutProperties}
                                        </div>
                                    </button>
                                </div>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>

            {/* Owners Table */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t.name}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t.email}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t.phone}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t.properties}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t.status}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t.actions}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {owners.data.map((owner) => (
                                <tr key={owner.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                                {owner.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {owner.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {owner.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {formatPhone(owner.phone)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {owner.properties_count || 0}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                owner.properties_count || 0,
                                                owner.user_id
                                            )}`}
                                        >
                                            {getStatusText(
                                                owner.properties_count || 0,
                                                owner.user_id
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <Link
                                                href={route(
                                                    "owners.show",
                                                    owner.id
                                                )}
                                                className="text-primary hover:text-primary-dark"
                                            >
                                                {t.view}
                                            </Link>
                                            <Link
                                                href={route(
                                                    "owners.edit",
                                                    owner.id
                                                )}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                {t.edit}
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(owner)
                                                }
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                {t.delete}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {owners.data.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        {t.noOwnersFound}
                    </div>
                ) : (
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                {t.showing}{" "}
                                <span className="font-medium">
                                    {owners.from}
                                </span>{" "}
                                {t.to}{" "}
                                <span className="font-medium">{owners.to}</span>{" "}
                                {t.of}{" "}
                                <span className="font-medium">
                                    {owners.total}
                                </span>{" "}
                                {t.results}
                            </div>
                            <div className="flex space-x-2">
                                {owners.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || "#"}
                                        className={`px-3 py-1 rounded-md ${
                                            link.active
                                                ? "bg-primary text-white"
                                                : "text-gray-700 hover:bg-gray-100"
                                        } ${
                                            !link.url
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                <svg
                                    className="h-6 w-6 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.73-.833-2.464 0L3.742 16.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4 text-center">
                                {t.confirmDelete}
                            </h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500 text-center">
                                    {t.deleteWarning}
                                </p>
                            </div>
                            <div className="items-center px-4 py-3 mt-4">
                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={() =>
                                            setShowDeleteModal(false)
                                        }
                                        className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    >
                                        {t.cancel}
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        {t.deleteOwner}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default Index;
