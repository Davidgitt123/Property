import React, { useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    FaSearch,
    FaFilter,
    FaHome,
    FaBuilding,
    FaMapMarkerAlt,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaChevronDown,
    FaChevronUp,
    FaHeart,
    FaStar,
} from "react-icons/fa";
import { MdApartment, MdLandscape } from "react-icons/md";

export default function Properties({
    auth,
    properties,
    filters,
    propertyCounts = {},
}) {
    const { language } = useLanguage();
    const [showFilters, setShowFilters] = useState(false);
    const [localFilters, setLocalFilters] = useState({
        type: filters?.type || "all",
        status: filters?.status || "all",
        location: filters?.location || "",
        min_price: filters?.min_price || "",
        max_price: filters?.max_price || "",
        sort_by: filters?.sort_by || "newest",
    });

    const translations = {
        en: {
            title: "Browse Properties",
            subtitle: "Find your perfect home, apartment, land, or office",
            searchPlaceholder: "Search by location, type, or keyword...",
            filters: "Filters",
            clearFilters: "Clear Filters",
            applyFilters: "Apply Filters",
            propertyType: "Property Type",
            status: "Status",
            location: "Location",
            priceRange: "Price Range",
            sortBy: "Sort By",
            viewDetails: "View Details",
            all: "All",
            houses: "Houses",
            apartments: "Apartments",
            lands: "Lands",
            offices: "Offices",
            forSale: "For Sale",
            forRent: "For Rent",
            newest: "Newest First",
            priceLowHigh: "Price: Low to High",
            priceHighLow: "Price: High to Low",
            noProperties: "No properties found",
            tryDifferentFilters: "Try different filters or search terms",
            showing: "Showing",
            of: "of",
            properties: "properties",
            bedrooms: "Bedrooms",
            bathrooms: "Bathrooms",
            size: "Size",
            sqm: "sqm",
            perMonth: "per month",
            featured: "Featured",
            saveToFavorites: "Save to Favorites",
        },
        kh: {
            title: "រាយទ្រព្យសម្បត្តិ",
            subtitle: "ស្វែងរកផ្ទះ អាផាតមិន ដី ឬការិយាល័យដ៏ល្អឥតខ្ចោះរបស់អ្នក",
            searchPlaceholder: "ស្វែងរកតាមទីតាំង ប្រភេទ ឬពាក្យគន្លឹះ...",
            filters: "តម្រង",
            clearFilters: "លុបតម្រង",
            applyFilters: "អនុវត្តតម្រង",
            propertyType: "ប្រភេទទ្រព្យសម្បត្តិ",
            status: "ស្ថានភាព",
            location: "ទីតាំង",
            priceRange: "ជួរតម្លៃ",
            sortBy: "តម្រៀបតាម",
            viewDetails: "មើលព័ត៌មានលម្អិត",
            all: "ទាំងអស់",
            houses: "ផ្ទះ",
            apartments: "អាផាតមិន",
            lands: "ដី",
            offices: "ការិយាល័យ",
            forSale: "លក់",
            forRent: "ជួល",
            newest: "ថ្មីបំផុត",
            priceLowHigh: "តម្លៃ: ទាបទៅខ្ពស់",
            priceHighLow: "តម្លៃ: ខ្ពស់ទៅទាប",
            noProperties: "រកមិនឃើញទ្រព្យសម្បត្តិទេ",
            tryDifferentFilters: "សាកល្បងតម្រងឬពាក្យស្វែងរកផ្សេងទៀត",
            showing: "កំពុងបង្ហាញ",
            of: "នៃ",
            properties: "ទ្រព្យសម្បត្តិ",
            bedrooms: "បន្ទប់គេង",
            bathrooms: "បន្ទប់ទឹក",
            size: "ទំហំ",
            sqm: "ម៉ែត្រការ៉េ",
            perMonth: "ក្នុងមួយខែ",
            featured: "ពិសេស",
            saveToFavorites: "រក្សាទុកក្នុងចំណូលចិត្ត",
        },
    };

    const t = translations[language];

    const propertyTypes = [
        {
            value: "all",
            label: t.all,
            icon: FaFilter,
            count: propertyCounts?.all || 0,
        },
        {
            value: "House",
            label: t.houses,
            icon: FaHome,
            count: propertyCounts?.House || 0,
        },
        {
            value: "Apartment",
            label: t.apartments,
            icon: MdApartment,
            count: propertyCounts?.Apartment || 0,
        },
        {
            value: "Land",
            label: t.lands,
            icon: MdLandscape,
            count: propertyCounts?.Land || 0,
        },
        {
            value: "Office",
            label: t.offices,
            icon: FaBuilding,
            count: propertyCounts?.Office || 0,
        },
    ];

    const statusOptions = [
        { value: "all", label: t.all, count: propertyCounts?.all || 0 },
        {
            value: "For Sale",
            label: t.forSale,
            count: propertyCounts?.["For Sale"] || 0,
        },
        {
            value: "For Rent",
            label: t.forRent,
            count: propertyCounts?.["For Rent"] || 0,
        },
    ];

    const sortOptions = [
        { value: "newest", label: t.newest },
        { value: "price_low_high", label: t.priceLowHigh },
        { value: "price_high_low", label: t.priceHighLow },
    ];

    const handleFilterChange = (key, value) => {
        setLocalFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const applyFilters = () => {
        router.get("/home/properties", localFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        const clearedFilters = {
            type: "all",
            status: "all",
            location: "",
            min_price: "",
            max_price: "",
            sort_by: "newest",
        };
        setLocalFilters(clearedFilters);
        router.get("/home/properties", clearedFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getTranslatedStatus = (status) => {
        return status === "For Sale" ? t.forSale : t.forRent;
    };

    const getTranslatedType = (type) => {
        const typeMap = {
            House: t.houses,
            Apartment: t.apartments,
            Land: t.lands,
            Office: t.offices,
        };
        return typeMap[type] || type;
    };

    return (
        <UserLayout user={auth?.user}>
            <Head title={t.title} />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-dark to-primary-dark text-white py-16">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {t.title}
                        </h1>
                        <p className="text-xl mb-8 text-gray-200">
                            {t.subtitle}
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={localFilters.location}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "location",
                                            e.target.value
                                        )
                                    }
                                    placeholder={t.searchPlaceholder}
                                    className="w-full px-6 py-4 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                                    onKeyPress={(e) =>
                                        e.key === "Enter" && applyFilters()
                                    }
                                />
                                <button
                                    onClick={applyFilters}
                                    className="absolute right-2 top-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                                >
                                    <FaSearch className="inline mr-2" />
                                    {language === "en" ? "Search" : "ស្វែងរក"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="bg-gray-50 py-6 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 text-dark font-medium"
                        >
                            <FaFilter />
                            {t.filters}
                            {showFilters ? <FaChevronUp /> : <FaChevronDown />}
                        </button>

                        <div className="flex items-center gap-4">
                            <select
                                value={localFilters.sort_by}
                                onChange={(e) =>
                                    handleFilterChange(
                                        "sort_by",
                                        e.target.value
                                    )
                                }
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                {sortOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={applyFilters}
                                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                {t.applyFilters}
                            </button>
                        </div>
                    </div>

                    {/* Expanded Filters */}
                    {showFilters && (
                        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg border">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Property Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t.propertyType}
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {propertyTypes.map((type) => {
                                            const Icon = type.icon;
                                            return (
                                                <button
                                                    key={type.value}
                                                    onClick={() =>
                                                        handleFilterChange(
                                                            "type",
                                                            type.value
                                                        )
                                                    }
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                                                        localFilters.type ===
                                                        type.value
                                                            ? "bg-primary text-white border-primary"
                                                            : "bg-white text-dark border-gray-300 hover:border-primary"
                                                    }`}
                                                >
                                                    <Icon />
                                                    <span>{type.label}</span>
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                        {type.count}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t.status}
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {statusOptions.map((status) => (
                                            <button
                                                key={status.value}
                                                onClick={() =>
                                                    handleFilterChange(
                                                        "status",
                                                        status.value
                                                    )
                                                }
                                                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                                                    localFilters.status ===
                                                    status.value
                                                        ? "bg-primary text-white border-primary"
                                                        : "bg-white text-dark border-gray-300 hover:border-primary"
                                                }`}
                                            >
                                                <span>{status.label}</span>
                                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                    {status.count}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t.priceRange}
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="number"
                                            placeholder={
                                                language === "en"
                                                    ? "Min Price"
                                                    : "តម្លៃអប្បបរមា"
                                            }
                                            value={localFilters.min_price}
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    "min_price",
                                                    e.target.value
                                                )
                                            }
                                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        <input
                                            type="number"
                                            placeholder={
                                                language === "en"
                                                    ? "Max Price"
                                                    : "តម្លៃអតិបរមា"
                                            }
                                            value={localFilters.max_price}
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    "max_price",
                                                    e.target.value
                                                )
                                            }
                                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-end gap-2">
                                    <button
                                        onClick={clearFilters}
                                        className="px-6 py-3 border border-gray-300 text-dark rounded-lg hover:bg-gray-100 transition-colors w-full"
                                    >
                                        {t.clearFilters}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Properties Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {properties.data.length > 0 ? (
                        <>
                            {/* Results Info */}
                            <div className="mb-8 text-center">
                                <p className="text-gray-600">
                                    {t.showing}{" "}
                                    <span className="font-bold">
                                        {properties.from || 0}
                                    </span>{" "}
                                    -{" "}
                                    <span className="font-bold">
                                        {properties.to || 0}
                                    </span>{" "}
                                    {t.of}{" "}
                                    <span className="font-bold">
                                        {properties.total}
                                    </span>{" "}
                                    {t.properties}
                                </p>
                            </div>

                            {/* Properties Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {properties.data.map((property) => (
                                    <div
                                        key={property.id}
                                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                                    >
                                        {/* Property Image */}
                                        <div className="relative h-64">
                                            <Link
                                                href={route(
                                                    "home.properties.show",
                                                    property.id
                                                )}
                                            >
                                                <img
                                                    src={
                                                        property.image_url ||
                                                        property.image
                                                    }
                                                    alt={property.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </Link>
                                            <div className="absolute top-4 right-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                        property.status ===
                                                        "For Sale"
                                                            ? "bg-green-500 text-white"
                                                            : "bg-blue-500 text-white"
                                                    }`}
                                                >
                                                    {getTranslatedStatus(
                                                        property.status
                                                    )}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-4 left-4">
                                                <span className="px-3 py-1 bg-dark/80 text-white rounded-full text-sm">
                                                    {getTranslatedType(
                                                        property.type
                                                    )}
                                                </span>
                                            </div>
                                            {property.featured && (
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-semibold">
                                                        <FaStar className="inline mr-1" />
                                                        {t.featured}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Property Details */}
                                        <div className="p-6">
                                            <Link
                                                href={route(
                                                    "home.properties.show",
                                                    property.id
                                                )}
                                            >
                                                <h3 className="text-xl font-bold mb-2 text-dark group-hover:text-primary transition-colors">
                                                    {property.title}
                                                </h3>
                                            </Link>

                                            <div className="flex items-center text-gray-600 mb-4">
                                                <FaMapMarkerAlt className="mr-2 text-primary" />
                                                <span>{property.location}</span>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-100">
                                                <div className="text-center">
                                                    <div className="text-gray-500 text-sm mb-1">
                                                        {t.bedrooms}
                                                    </div>
                                                    <div className="flex items-center justify-center gap-1 text-dark font-semibold">
                                                        <FaBed className="text-primary" />
                                                        <span>
                                                            {property.bedrooms ||
                                                                3}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-gray-500 text-sm mb-1">
                                                        {t.bathrooms}
                                                    </div>
                                                    <div className="flex items-center justify-center gap-1 text-dark font-semibold">
                                                        <FaBath className="text-primary" />
                                                        <span>
                                                            {property.bathrooms ||
                                                                2}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-gray-500 text-sm mb-1">
                                                        {t.size}
                                                    </div>
                                                    <div className="flex items-center justify-center gap-1 text-dark font-semibold">
                                                        <FaRulerCombined className="text-primary" />
                                                        <span>
                                                            {property.formatted_size ||
                                                                `${property.size} ${t.sqm}`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="text-2xl font-bold text-primary">
                                                        {property.formatted_price ||
                                                            `$${property.price}`}
                                                    </div>
                                                    {property.status ===
                                                        "For Rent" && (
                                                        <div className="text-gray-500 text-sm">
                                                            {t.perMonth}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            console.log(
                                                                "Save to favorites:",
                                                                property.id
                                                            )
                                                        }
                                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                        title={
                                                            t.saveToFavorites
                                                        }
                                                    >
                                                        <FaHeart />
                                                    </button>
                                                    <Link
                                                        href={route(
                                                            "home.properties.show",
                                                            property.id
                                                        )}
                                                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                                                    >
                                                        {t.viewDetails}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {properties.links.length > 3 && (
                                <div className="mt-12 flex justify-center">
                                    <nav className="flex items-center gap-2">
                                        {properties.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || "#"}
                                                className={`px-4 py-2 rounded-lg border ${
                                                    link.active
                                                        ? "bg-primary text-white border-primary"
                                                        : "bg-white text-dark border-gray-300 hover:border-primary"
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
                                    </nav>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-6">🏠</div>
                            <h3 className="text-2xl font-bold text-gray-700 mb-4">
                                {t.noProperties}
                            </h3>
                            <p className="text-gray-600 mb-8">
                                {t.tryDifferentFilters}
                            </p>
                            <button
                                onClick={clearFilters}
                                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                {t.clearFilters}
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </UserLayout>
    );
}
