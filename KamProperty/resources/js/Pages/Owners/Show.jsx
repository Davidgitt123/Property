import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Show({
    owner,
    ownerPropertiesCount,
    ownerPropertiesValue,
}) {
    const { language } = useLanguage();
    const { flash } = usePage().props;

    const translations = {
        en: {
            title: "Owner Details",
            back: "Back to Owners",
            edit: "Edit Owner",
            basicInfo: "Basic Information",
            contactInfo: "Contact Information",
            identificationInfo: "Identification Information",
            propertiesInfo: "Properties Information",
            additionalInfo: "Additional Information",
            activityInfo: "Activity Information",
            name: "Name",
            email: "Email",
            phone: "Phone",
            alternatePhone: "Alternate Phone",
            address: "Address",
            identificationType: "Identification Type",
            identificationNumber: "Identification Number",
            taxId: "Tax ID",
            notes: "Notes",
            linkedAccount: "Linked Account",
            linked: "Linked",
            notLinked: "Not Linked",
            totalProperties: "Total Properties",
            propertiesValue: "Total Properties Value",
            lastPropertyAdded: "Last Property Added",
            createdAt: "Created At",
            updatedAt: "Updated At",
            viewProperties: "View Properties",
            recentProperties: "Recent Properties",
            noProperties: "No properties listed yet",
            property: "Property",
            price: "Price",
            status: "Status",
            type: "Type",
            location: "Location",
            userAccount: "User Account",
            viewProfile: "View Profile",
            national_id: "National ID",
            passport: "Passport",
            driver_license: "Driver License",
            unknown: "Unknown",
            loading: "Loading...",
            deleteOwner: "Delete Owner",
            confirmDelete: "Are you sure you want to delete this owner?",
            cannotDelete: "Cannot delete owner with existing properties",
        },
        kh: {
            title: "ព័ត៌មានលម្អិតម្ចាស់",
            back: "ត្រឡប់ទៅម្ចាស់",
            edit: "កែសម្រួលម្ចាស់",
            basicInfo: "ព័ត៌មានមូលដ្ឋាន",
            contactInfo: "ព័ត៌មានទំនាក់ទំនង",
            identificationInfo: "ព័ត៌មានអត្តសញ្ញាណ",
            propertiesInfo: "ព័ត៌មានអចលនទ្រព្យ",
            additionalInfo: "ព័ត៌មានបន្ថែម",
            activityInfo: "ព័ត៌មានសកម្មភាព",
            name: "ឈ្មោះ",
            email: "អ៊ីមែល",
            phone: "ទូរស័ព្ទ",
            alternatePhone: "ទូរស័ព្ទជំនួស",
            address: "អាស័យដ្ឋាន",
            identificationType: "ប្រភេទអត្តសញ្ញាណ",
            identificationNumber: "លេខអត្តសញ្ញាណ",
            taxId: "លេខអត្តសញ្ញាណពន្ធ",
            notes: "កំណត់ចំណាំ",
            linkedAccount: "គណនីភ្ជាប់",
            linked: "បានភ្ជាប់",
            notLinked: "មិនបានភ្ជាប់",
            totalProperties: "អចលនទ្រព្យសរុប",
            propertiesValue: "តម្លៃអចលនទ្រព្យសរុប",
            lastPropertyAdded: "អចលនទ្រព្យចុងក្រោយបានបន្ថែម",
            createdAt: "បានបង្កើតនៅ",
            updatedAt: "បានធ្វើបច្ចុប្បន្នភាពនៅ",
            viewProperties: "មើលអចលនទ្រព្យ",
            recentProperties: "អចលនទ្រព្យថ្មីៗ",
            noProperties: "មិនទាន់មានអចលនទ្រព្យដែលបានដាក់បញ្ជីទេ",
            property: "អចលនទ្រព្យ",
            price: "តម្លៃ",
            status: "ស្ថានភាព",
            type: "ប្រភេទ",
            location: "ទីតាំង",
            userAccount: "គណនីអ្នកប្រើប្រាស់",
            viewProfile: "មើលប្រវត្តិរូប",
            national_id: "អត្តសញ្ញាណប័ណ្ណ",
            passport: "លិខិតឆ្លងដែន",
            driver_license: "អាជ្ញាប័ណ្ណបើកបរ",
            unknown: "មិនស្គាល់",
            loading: "កំពុងផ្ទុក...",
            deleteOwner: "លុបម្ចាស់",
            confirmDelete: "តើអ្នកពិតជាចង់លុបម្ចាស់នេះមែនទេ?",
            cannotDelete: "មិនអាចលុបម្ចាស់ដែលមានអចលនទ្រព្យបានទេ",
        },
    };

    const t = translations[language];

    // Helper functions
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

    const formatCurrency = (amount) => {
        if (!amount) return "$0";
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getIdentificationTypeText = (type) => {
        const typeMap = {
            national_id: t.national_id,
            passport: t.passport,
            driver_license: t.driver_license,
        };
        return typeMap[type] || t.unknown;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "for sale":
                return "bg-green-100 text-green-800";
            case "for rent":
                return "bg-blue-100 text-blue-800";
            case "sold":
                return "bg-red-100 text-red-800";
            case "rented":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getPropertyTypeText = (type) => {
        const typeMap = {
            House: language === "kh" ? "ផ្ទះ" : "House",
            Apartment: language === "kh" ? "អាផាតមិន" : "Apartment",
            Land: language === "kh" ? "ដី" : "Land",
            Office: language === "kh" ? "ការិយាល័យ" : "Office",
        };
        return typeMap[type] || type;
    };

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
                        <Link href={route("owners.edit", owner.id)}>
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
            <Head title={`${owner.name} - ${t.title}`} />

            {flash?.success && (
                <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                    <div className="flex items-center">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {flash.success}
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Owner Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information Card */}
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                                {t.basicInfo}
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
                                        {owner.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900">
                                            {owner.name}
                                        </h4>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                                                    owner.user_id
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {owner.user_id
                                                    ? t.linked
                                                    : t.notLinked}
                                            </span>
                                            {ownerPropertiesCount > 0 && (
                                                <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                                                    {ownerPropertiesCount}{" "}
                                                    {t.propertie}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">
                                            {t.email}
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {owner.email}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">
                                            {t.phone}
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {owner.phone || "-"}
                                        </p>
                                    </div>
                                    {owner.alternate_phone && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">
                                                {t.alternatePhone}
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {owner.alternate_phone}
                                            </p>
                                        </div>
                                    )}
                                    {owner.address && (
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-500">
                                                {t.address}
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {owner.address}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Identification Information Card */}
                        {(owner.identification_type ||
                            owner.identification_number ||
                            owner.tax_id) && (
                            <div className="bg-white shadow-sm rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                                    {t.identificationInfo}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {owner.identification_type && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">
                                                {t.identificationType}
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {getIdentificationTypeText(
                                                    owner.identification_type
                                                )}
                                            </p>
                                        </div>
                                    )}
                                    {owner.identification_number && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">
                                                {t.identificationNumber}
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {owner.identification_number}
                                            </p>
                                        </div>
                                    )}
                                    {owner.tax_id && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">
                                                {t.taxId}
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {owner.tax_id}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Recent Properties Card */}
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">
                                    {t.recentProperties}
                                </h3>
                                {ownerPropertiesCount > 0 && (
                                    <Link
                                        href={route("properties.index", {
                                            owner_id: owner.id,
                                        })}
                                        className="text-sm text-primary hover:text-primary-dark font-medium"
                                    >
                                        {t.viewProperties}
                                    </Link>
                                )}
                            </div>

                            {owner.properties && owner.properties.length > 0 ? (
                                <div className="space-y-4">
                                    {owner.properties.map((property) => (
                                        <Link
                                            key={property.id}
                                            href={route(
                                                "properties.show",
                                                property.id
                                            )}
                                            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                                                {property.image ? (
                                                    <img
                                                        src={property.image}
                                                        alt={property.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                        <svg
                                                            className="w-8 h-8 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <h4 className="text-sm font-medium text-gray-900 truncate">
                                                    {property.title}
                                                </h4>
                                                <p className="text-xs text-gray-500">
                                                    {property.location}
                                                </p>
                                                <div className="flex justify-between items-center mt-1">
                                                    <span className="text-sm font-semibold text-primary">
                                                        {formatCurrency(
                                                            property.price
                                                        )}
                                                    </span>
                                                    <span
                                                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                                                            property.status
                                                        )}`}
                                                    >
                                                        {property.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center mt-1 space-x-2">
                                                    <span className="text-xs text-gray-500">
                                                        {getPropertyTypeText(
                                                            property.type
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <svg
                                        className="w-12 h-12 text-gray-400 mx-auto"
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
                                    <p className="mt-2 text-gray-500">
                                        {t.noProperties}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Additional Information */}
                    <div className="space-y-6">
                        {/* Properties Information Card */}
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                                {t.propertiesInfo}
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {t.totalProperties}
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {ownerPropertiesCount}
                                        </p>
                                    </div>
                                    <svg
                                        className="w-8 h-8 text-primary"
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
                                </div>

                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {t.propertiesValue}
                                        </p>
                                        <p className="text-2xl font-bold text-primary">
                                            {formatCurrency(
                                                ownerPropertiesValue
                                            )}
                                        </p>
                                    </div>
                                    <svg
                                        className="w-8 h-8 text-green-500"
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
                                </div>
                            </div>
                        </div>

                        {/* Linked Account Card */}
                        {owner.user_id && owner.user && (
                            <div className="bg-white shadow-sm rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                                    {t.userAccount}
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                            {owner.user.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">
                                                {owner.user.name}
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                {owner.user.email}
                                            </p>
                                            <span
                                                className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full mt-1 ${
                                                    owner.user.role === "admin"
                                                        ? "bg-accent text-white"
                                                        : owner.user.role ===
                                                          "agent"
                                                        ? "bg-primary text-white"
                                                        : "bg-green-500 text-white"
                                                }`}
                                            >
                                                {owner.user.role}
                                            </span>
                                        </div>
                                    </div>
                                    <Link
                                        href={route(
                                            "users.show",
                                            owner.user.id
                                        )}
                                        className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
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
                                        {t.viewProfile}
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Activity Information Card */}
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                                {t.activityInfo}
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">
                                        {t.createdAt}
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {formatDate(owner.created_at)}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">
                                        {t.updatedAt}
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {formatDate(owner.updated_at)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Notes Card */}
                        {owner.notes && (
                            <div className="bg-white shadow-sm rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    {t.notes}
                                </h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                        {owner.notes}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Quick Actions Card */}
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Quick Actions
                            </h3>
                            <div className="space-y-2">
                                <Link
                                    href={route("owners.edit", owner.id)}
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

                                <button
                                    onClick={() => {
                                        if (ownerPropertiesCount > 0) {
                                            alert(t.cannotDelete);
                                        } else if (confirm(t.confirmDelete)) {
                                            router.delete(
                                                route(
                                                    "owners.destroy",
                                                    owner.id
                                                )
                                            );
                                        }
                                    }}
                                    className="flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                    {t.deleteOwner}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
