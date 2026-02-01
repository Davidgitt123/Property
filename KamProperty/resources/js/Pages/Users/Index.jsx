import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { useLanguage } from "@/contexts/LanguageContext";
import Dropdown from "@/Components/Dropdown";

const Index = ({ users, filters, totalCounts }) => {
    const { language } = useLanguage();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const translations = {
        en: {
            title: "User Management",
            createUser: "Create New User",
            search: "Search users...",
            filterByRole: "Filter by Role",
            filterByStatus: "Filter by Status",
            all: "All",
            admin: "Admin",
            agent: "Agent",
            user: "User",
            active: "Active",
            inactive: "Inactive",
            suspended: "Suspended",
            name: "Name",
            email: "Email",
            role: "Role",
            status: "Status",
            lastLogin: "Last Login",
            actions: "Actions",
            edit: "Edit",
            view: "View",
            delete: "Delete",
            showing: "Showing",
            to: "to",
            of: "of",
            results: "results",
            totalUsers: "Total Users",
            activeUsers: "Active Users",
            inactiveUsers: "Inactive Users",
            noUsersFound: "No users found.",
            confirmDelete: "Are you sure you want to delete this user?",
            deleteWarning: "This action cannot be undone.",
            cancel: "Cancel",
            deleteUser: "Delete User",
            stats: "Statistics",
            admins: "Admins",
            agents: "Agents",
            users: "Users",
        },
        kh: {
            title: "ការគ្រប់គ្រងអ្នកប្រើប្រាស់",
            createUser: "បង្កើតអ្នកប្រើប្រាស់ថ្មី",
            search: "ស្វែងរកអ្នកប្រើប្រាស់...",
            filterByRole: "ត្រងតាមតួនាទី",
            filterByStatus: "ត្រងតាមស្ថានភាព",
            all: "ទាំងអស់",
            admin: "អ្នកគ្រប់គ្រង",
            agent: "ភ្នាក់ងារ",
            user: "អ្នកប្រើប្រាស់",
            active: "សកម្ម",
            inactive: "អសកម្ម",
            suspended: "ផ្អាក",
            name: "ឈ្មោះ",
            email: "អ៊ីមែល",
            role: "តួនាទី",
            status: "ស្ថានភាព",
            lastLogin: "ចូលចុងក្រោយ",
            actions: "សកម្មភាព",
            edit: "កែសម្រួល",
            view: "មើល",
            delete: "លុប",
            showing: "បង្ហាញ",
            to: "ទៅ",
            of: "នៃ",
            results: "លទ្ធផល",
            totalUsers: "អ្នកប្រើប្រាស់សរុប",
            activeUsers: "អ្នកប្រើប្រាស់សកម្ម",
            inactiveUsers: "អ្នកប្រើប្រាស់អសកម្ម",
            noUsersFound: "រកមិនឃើញអ្នកប្រើប្រាស់ទេ។",
            confirmDelete: "តើអ្នកពិតជាចង់លុបអ្នកប្រើប្រាស់នេះមែនទេ?",
            deleteWarning: "សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។",
            cancel: "បោះបង់",
            deleteUser: "លុបអ្នកប្រើប្រាស់",
            stats: "ស្ថិតិ",
            admins: "អ្នកគ្រប់គ្រង",
            agents: "ភ្នាក់ងារ",
            users: "អ្នកប្រើប្រាស់",
        },
    };

    const t = translations[language];

    const handleSearch = (e) => {
        router.get(
            route("users.index"),
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
            route("users.index"),
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

    const handleDelete = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            router.delete(route("users.destroy", userToDelete.id));
            setShowDeleteModal(false);
            setUserToDelete(null);
        }
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
                month: "short",
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
                            {t.title}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {t.totalUsers}: {totalCounts.total} |{" "}
                            {t.activeUsers}: {totalCounts.active}
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href={route("users.statistics")}>
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
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                                {t.stats}
                            </SecondaryButton>
                        </Link>
                        <Link href={route("users.create")}>
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
                                {t.createUser}
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={t.title} />

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-2xl font-bold text-gray-900">
                        {totalCounts.total}
                    </div>
                    <div className="text-sm text-gray-600">{t.totalUsers}</div>
                    <div className="mt-2 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-2xl font-bold text-green-600">
                        {totalCounts.admins}
                    </div>
                    <div className="text-sm text-gray-600">{t.admins}</div>
                    <div className="mt-2 h-1 w-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-2xl font-bold text-primary">
                        {totalCounts.agents}
                    </div>
                    <div className="text-sm text-gray-600">{t.agents}</div>
                    <div className="mt-2 h-1 w-full bg-gradient-to-r from-primary to-green-500 rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-2xl font-bold text-green-600">
                        {totalCounts.users}
                    </div>
                    <div className="text-sm text-gray-600">{t.users}</div>
                    <div className="mt-2 h-1 w-full bg-gradient-to-r from-green-500 to-yellow-500 rounded-full"></div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                    {/* Role Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t.filterByRole}
                        </label>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="w-full text-left px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200">
                                    <div className="flex justify-between items-center">
                                        <span>
                                            {filters.role
                                                ? filters.role === "admin"
                                                    ? t.admin
                                                    : filters.role === "agent"
                                                    ? t.agent
                                                    : filters.role === "user"
                                                    ? t.user
                                                    : filters.role
                                                : t.all}
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

                            <Dropdown.Content width="full">
                                <div className="py-1">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleFilterChange("role", "")
                                        }
                                        className={`block w-full text-left px-4 py-2 text-sm ${
                                            !filters.role
                                                ? "bg-primary text-white"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {t.all}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleFilterChange("role", "admin")
                                        }
                                        className={`block w-full text-left px-4 py-2 text-sm ${
                                            filters.role === "admin"
                                                ? "bg-accent text-white"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {t.admin}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleFilterChange("role", "agent")
                                        }
                                        className={`block w-full text-left px-4 py-2 text-sm ${
                                            filters.role === "agent"
                                                ? "bg-primary text-white"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {t.agent}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleFilterChange("role", "user")
                                        }
                                        className={`block w-full text-left px-4 py-2 text-sm ${
                                            filters.role === "user"
                                                ? "bg-green-500 text-white"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {t.user}
                                    </button>
                                </div>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t.filterByStatus}
                        </label>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="w-full text-left px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200">
                                    <div className="flex justify-between items-center">
                                        <span>
                                            {filters.status
                                                ? filters.status === "active"
                                                    ? t.active
                                                    : filters.status ===
                                                      "inactive"
                                                    ? t.inactive
                                                    : filters.status ===
                                                      "suspended"
                                                    ? t.suspended
                                                    : filters.status
                                                : t.all}
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

                            <Dropdown.Content width="full">
                                <div className="py-1">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleFilterChange("status", "")
                                        }
                                        className={`block w-full text-left px-4 py-2 text-sm ${
                                            !filters.status
                                                ? "bg-primary text-white"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {t.all}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleFilterChange(
                                                "status",
                                                "active"
                                            )
                                        }
                                        className={`block w-full text-left px-4 py-2 text-sm ${
                                            filters.status === "active"
                                                ? "bg-green-100 text-green-800"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {t.active}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleFilterChange(
                                                "status",
                                                "inactive"
                                            )
                                        }
                                        className={`block w-full text-left px-4 py-2 text-sm ${
                                            filters.status === "inactive"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {t.inactive}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleFilterChange(
                                                "status",
                                                "suspended"
                                            )
                                        }
                                        className={`block w-full text-left px-4 py-2 text-sm ${
                                            filters.status === "suspended"
                                                ? "bg-red-100 text-red-800"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {t.suspended}
                                    </button>
                                </div>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>

            {/* Users Table */}
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
                                    {t.role}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t.status}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t.lastLogin}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t.actions}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.data.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                                {user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {user.phone}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getRoleColor(
                                                user.role
                                            )}`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                user.status
                                            )}`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(user.last_login_at)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <Link
                                                href={route(
                                                    "users.show",
                                                    user.id
                                                )}
                                                className="text-primary hover:text-primary-dark"
                                            >
                                                {t.view}
                                            </Link>
                                            <Link
                                                href={route(
                                                    "users.edit",
                                                    user.id
                                                )}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                {t.edit}
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(user)
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
                {users.data.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        {t.noUsersFound}
                    </div>
                ) : (
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                {t.showing}{" "}
                                <span className="font-medium">
                                    {users.from}
                                </span>{" "}
                                {t.to}{" "}
                                <span className="font-medium">{users.to}</span>{" "}
                                {t.of}{" "}
                                <span className="font-medium">
                                    {users.total}
                                </span>{" "}
                                {t.results}
                            </div>
                            <div className="flex space-x-2">
                                {users.links.map((link, index) => (
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
                                        {t.deleteUser}
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
