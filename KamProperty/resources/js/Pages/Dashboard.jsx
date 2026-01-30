import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Dashboard({ auth, stats, recentData, userRole }) {
    const { language } = useLanguage();

    const translations = {
        en: {
            dashboard: "Dashboard",
            overview: "Overview",
            quickStats: "Quick Stats",
            recentActivity: "Recent Activity",
            viewAll: "View All",
            properties: "Properties",
            users: "Users",
            inquiries: "Inquiries",
            revenue: "Revenue",
            pending: "Pending",
            active: "Active",
            closed: "Closed",
            agents: "Agents",
            owners: "Owners",
            commission: "Commission",
            listings: "Listings",
            assigned: "Assigned",
            addNew: "Add New",
            manage: "Manage",
            seeDetails: "See Details",
            welcome: "Welcome back",
            lastLogin: "Last login",
            today: "Today",
            thisWeek: "This Week",
            thisMonth: "This Month",
            total: "Total",
            adminDashboard: "Admin Dashboard",
            agentDashboard: "Agent Dashboard",
            systemOverview: "System Overview",
            myPerformance: "My Performance",
            quickActions: "Quick Actions",
        },
        kh: {
            dashboard: "ផ្ទាំងគ្រប់គ្រង",
            overview: "ទិដ្ឋភាពទូទៅ",
            quickStats: "ស្ថិតិរហ័ស",
            recentActivity: "សកម្មភាពថ្មីៗ",
            viewAll: "មើលទាំងអស់",
            properties: "អចលនទ្រព្យ",
            users: "អ្នកប្រើប្រាស់",
            inquiries: "ការស្នើសុំ",
            revenue: "ចំណូល",
            pending: "កំពុងរង់ចាំ",
            active: "សកម្ម",
            closed: "បានបិទ",
            agents: "ភ្នាក់ងារ",
            owners: "ម្ចាស់",
            commission: "កម្រៃជើងសារ",
            listings: "បញ្ជី",
            assigned: "បានចាត់តាំង",
            addNew: "បន្ថែមថ្មី",
            manage: "គ្រប់គ្រង",
            seeDetails: "មើលព័ត៌មានលម្អិត",
            welcome: "សូមស្វាគមន៍ត្រឡប់មកវិញ",
            lastLogin: "ការចូលចុងក្រោយ",
            today: "ថ្ងៃនេះ",
            thisWeek: "សប្តាហ៍នេះ",
            thisMonth: "ខែនេះ",
            total: "សរុប",
            adminDashboard: "ផ្ទាំងគ្រប់គ្រងអ្នកគ្រប់គ្រង",
            agentDashboard: "ផ្ទាំងគ្រប់គ្រងភ្នាក់ងារ",
            systemOverview: "ទិដ្ឋភាពទូទៅប្រព័ន្ធ",
            myPerformance: "ការសម្តែងរបស់ខ្ញុំ",
            quickActions: "សកម្មភាពរហ័ស",
        },
    };

    const t = translations[language];

    const isAdmin = userRole === "admin";
    const isAgent = userRole === "agent";

    const getDashboardContent = () => {
        if (isAdmin) {
            return (
                <>
                    {/* Admin Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title={t.properties}
                            value={stats.total_properties}
                            change="+12%"
                            icon="properties"
                            color="primary"
                            link={route("properties.index")}
                        />
                        <StatCard
                            title={t.users}
                            value={stats.total_users}
                            change="+8%"
                            icon="users"
                            color="accent"
                            link="#"
                        />
                        <StatCard
                            title={t.inquiries}
                            value={stats.total_inquiries}
                            change="+23%"
                            icon="inquiries"
                            color="green"
                            link="#"
                        />
                        <StatCard
                            title={t.revenue}
                            value={`$${stats.revenue?.toLocaleString() || "0"}`}
                            change="+15%"
                            icon="revenue"
                            color="purple"
                            link="#"
                        />
                    </div>

                    {/* Secondary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-xl p-6 shadow-soft">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-dark">
                                    {t.agents}
                                </h3>
                                <span className="text-2xl font-bold text-primary">
                                    {stats.total_agents}
                                </span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        {t.active}
                                    </span>
                                    <span className="font-semibold">
                                        {stats.active_users}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-soft">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-dark">
                                    {t.inquiries}
                                </h3>
                                <span className="text-2xl font-bold text-accent">
                                    {stats.pending_inquiries}
                                </span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        {t.pending}
                                    </span>
                                    <span className="font-semibold">
                                        {stats.pending_inquiries}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-soft">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-dark">
                                    {t.owners}
                                </h3>
                                <span className="text-2xl font-bold text-green-500">
                                    {stats.total_owners}
                                </span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        {t.total}
                                    </span>
                                    <span className="font-semibold">
                                        {stats.total_owners}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }

        if (isAgent) {
            return (
                <>
                    {/* Agent Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title={t.listings}
                            value={stats.my_properties}
                            change="+5%"
                            icon="properties"
                            color="primary"
                            link={route("properties.index")}
                        />
                        <StatCard
                            title={t.inquiries}
                            value={stats.assigned_inquiries}
                            change="+15%"
                            icon="inquiries"
                            color="accent"
                            link="#"
                        />
                        <StatCard
                            title={t.owners}
                            value={stats.my_owners}
                            change="+3%"
                            icon="owners"
                            color="green"
                            link="#"
                        />
                        <StatCard
                            title={t.commission}
                            value={`$${
                                stats.estimated_commission?.toLocaleString() ||
                                "0"
                            }`}
                            change="+12%"
                            icon="revenue"
                            color="purple"
                            link="#"
                        />
                    </div>

                    {/* Secondary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-xl p-6 shadow-soft">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-dark">
                                    {t.properties}
                                </h3>
                                <span className="text-2xl font-bold text-primary">
                                    {stats.active_listings}
                                </span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        {t.forSale}
                                    </span>
                                    <span className="font-semibold">
                                        {stats.for_sale}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        {t.forRent}
                                    </span>
                                    <span className="font-semibold">
                                        {stats.for_rent}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-soft">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-dark">
                                    {t.inquiries}
                                </h3>
                                <span className="text-2xl font-bold text-accent">
                                    {stats.pending_inquiries}
                                </span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        {t.pending}
                                    </span>
                                    <span className="font-semibold">
                                        {stats.pending_inquiries}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        {t.closed}
                                    </span>
                                    <span className="font-semibold">
                                        {stats.closed_inquiries}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-soft">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-dark">
                                    {t.performance}
                                </h3>
                                <span className="text-2xl font-bold text-green-500">
                                    85%
                                </span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        {t.responseRate}
                                    </span>
                                    <span className="font-semibold">92%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        {t.conversionRate}
                                    </span>
                                    <span className="font-semibold">15%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }

        return null;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-xl text-dark leading-tight">
                            {isAdmin ? t.adminDashboard : t.agentDashboard}
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">
                            {t.welcome}, {auth.user.name}!
                        </p>
                    </div>
                    <div className="flex space-x-4">
                        <Link href={route("properties.create")}>
                            <PrimaryButton>
                                + {t.addNew} {t.properties}
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={t.dashboard} />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 mb-8 text-white">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold mb-2">
                                    {isAdmin
                                        ? t.systemOverview
                                        : t.myPerformance}
                                </h1>
                                <p className="text-primary-light">
                                    {isAdmin
                                        ? "Manage properties, users, and inquiries"
                                        : "Track your listings and commissions"}
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <div className="text-sm">
                                    <span className="opacity-80">
                                        {t.lastLogin}:{" "}
                                    </span>
                                    <span className="font-semibold">
                                        Today, 09:42 AM
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-dark mb-4">
                            {t.quickActions}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <QuickAction
                                title={
                                    isAdmin ? "Manage Users" : "Add Property"
                                }
                                description={
                                    isAdmin
                                        ? "View and manage all users"
                                        : "Create new property listing"
                                }
                                icon="users"
                                color="primary"
                                link={
                                    isAdmin ? "#" : route("properties.create")
                                }
                            />
                            <QuickAction
                                title={
                                    isAdmin ? "View Inquiries" : "My Inquiries"
                                }
                                description={
                                    isAdmin
                                        ? "Check all property inquiries"
                                        : "View assigned inquiries"
                                }
                                icon="inbox"
                                color="accent"
                                link="#"
                            />
                            <QuickAction
                                title={
                                    isAdmin ? "System Reports" : "Performance"
                                }
                                description={
                                    isAdmin
                                        ? "Generate system reports"
                                        : "View your performance metrics"
                                }
                                icon="chart"
                                color="green"
                                link="#"
                            />
                            <QuickAction
                                title={isAdmin ? "Settings" : "Commission"}
                                description={
                                    isAdmin
                                        ? "System configuration"
                                        : "View commission earnings"
                                }
                                icon="settings"
                                color="purple"
                                link="#"
                            />
                        </div>
                    </div>

                    {/* Main Stats */}
                    {getDashboardContent()}

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Properties */}
                        <div className="bg-white rounded-xl shadow-soft">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-dark">
                                        {isAdmin
                                            ? "Recent Properties"
                                            : "My Recent Listings"}
                                    </h3>
                                    <Link
                                        href={route("properties.index")}
                                        className="text-primary hover:text-primary-dark text-sm font-medium"
                                    >
                                        {t.viewAll}
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                {recentData?.recent_properties?.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentData.recent_properties.map(
                                            (property) => (
                                                <RecentItem
                                                    key={property.id}
                                                    title={property.title}
                                                    description={
                                                        property.location
                                                    }
                                                    status={property.status}
                                                    date={property.created_at}
                                                    user={
                                                        isAdmin
                                                            ? property.user
                                                                  ?.name
                                                            : null
                                                    }
                                                    link={route(
                                                        "properties.show",
                                                        property.id
                                                    )}
                                                />
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        {isAdmin
                                            ? "No properties found"
                                            : "You have no listings yet"}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Inquiries */}
                        <div className="bg-white rounded-xl shadow-soft">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-dark">
                                        {isAdmin
                                            ? "Recent Inquiries"
                                            : "My Recent Inquiries"}
                                    </h3>
                                    <Link
                                        href="#"
                                        className="text-primary hover:text-primary-dark text-sm font-medium"
                                    >
                                        {t.viewAll}
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                {recentData?.recent_inquiries?.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentData.recent_inquiries.map(
                                            (inquiry) => (
                                                <RecentItem
                                                    key={inquiry.id}
                                                    title={`Inquiry for ${
                                                        inquiry.property
                                                            ?.title ||
                                                        "Property"
                                                    }`}
                                                    description={
                                                        inquiry.message.substring(
                                                            0,
                                                            60
                                                        ) + "..."
                                                    }
                                                    status={inquiry.status}
                                                    date={inquiry.created_at}
                                                    user={inquiry.name}
                                                    link="#"
                                                />
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        {isAdmin
                                            ? "No inquiries found"
                                            : "No assigned inquiries"}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Top Agents (Admin only) */}
                    {isAdmin && recentData?.top_agents?.length > 0 && (
                        <div className="mt-8 bg-white rounded-xl shadow-soft">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-bold text-dark">
                                    Top Performing Agents
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Agent
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Properties
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Inquiries
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {recentData.top_agents.map(
                                                (agent) => (
                                                    <tr key={agent.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                                    <span className="font-bold text-primary">
                                                                        {agent.name
                                                                            .charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase()}
                                                                    </span>
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {
                                                                            agent.name
                                                                        }
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {
                                                                            agent.email
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">
                                                                {
                                                                    agent.properties_count
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">
                                                                24
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Active
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Stat Card Component
const StatCard = ({ title, value, change, icon, color, link }) => {
    const colorClasses = {
        primary: "bg-primary text-white",
        accent: "bg-accent text-white",
        green: "bg-green-500 text-white",
        purple: "bg-purple-500 text-white",
    };

    const iconComponents = {
        properties: (
            <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
            </svg>
        ),
        users: (
            <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
            </svg>
        ),
        inquiries: (
            <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
            </svg>
        ),
        revenue: (
            <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        owners: (
            <svg
                className="w-6 h-6"
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
        ),
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    {iconComponents[icon]}
                </div>
                <span
                    className={`text-sm font-semibold ${
                        change.startsWith("+")
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                >
                    {change}
                </span>
            </div>
            <h3 className="text-2xl font-bold text-dark mb-1">{value}</h3>
            <p className="text-gray-600 mb-4">{title}</p>
            {link && (
                <a
                    href={link}
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                >
                    View Details →
                </a>
            )}
        </div>
    );
};

// Quick Action Component
const QuickAction = ({ title, description, icon, color, link }) => {
    const colorClasses = {
        primary: "text-primary bg-primary/10",
        accent: "text-accent bg-accent/10",
        green: "text-green-600 bg-green-100",
        purple: "text-purple-600 bg-purple-100",
    };

    const iconComponents = {
        users: (
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
            </svg>
        ),
        inbox: (
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
            </svg>
        ),
        chart: (
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
            </svg>
        ),
        settings: (
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
        ),
    };

    return (
        <a
            href={link}
            className="block bg-white rounded-xl p-4 shadow-soft hover:shadow-md transition-shadow"
        >
            <div className="flex items-start">
                <div className={`p-2 rounded-lg ${colorClasses[color]} mr-3`}>
                    {iconComponents[icon]}
                </div>
                <div>
                    <h4 className="font-bold text-dark">{title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
            </div>
        </a>
    );
};

// Recent Item Component
const RecentItem = ({ title, description, status, date, user, link }) => {
    const statusColors = {
        pending: "bg-yellow-100 text-yellow-800",
        contacted: "bg-blue-100 text-blue-800",
        viewed: "bg-green-100 text-green-800",
        closed: "bg-gray-100 text-gray-800",
        "For Sale": "bg-green-100 text-green-800",
        "For Rent": "bg-blue-100 text-blue-800",
    };

    return (
        <a
            href={link}
            className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h4 className="font-medium text-dark">{title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                    {user && (
                        <div className="flex items-center mt-2">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                <span className="text-xs font-bold text-primary">
                                    {user.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">
                                {user}
                            </span>
                        </div>
                    )}
                </div>
                <div className="text-right ml-4">
                    <span
                        className={`text-xs px-2 py-1 rounded-full ${
                            statusColors[status] || "bg-gray-100 text-gray-800"
                        }`}
                    >
                        {status}
                    </span>
                    <div className="text-xs text-gray-500 mt-2">
                        {new Date(date).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </a>
    );
};
