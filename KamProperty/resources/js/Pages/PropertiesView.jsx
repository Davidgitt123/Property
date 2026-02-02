import React, { useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    FaMapMarkerAlt,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaPhone,
    FaEnvelope,
    FaCalendar,
    FaHeart,
    FaShareAlt,
    FaStar,
    FaChevronLeft,
    FaChevronRight,
    FaCheckCircle,
    FaCar,
    FaSwimmingPool,
    FaWifi,
    FaTv,
    FaUtensils,
    FaSnowflake,
    FaDumbbell,
} from "react-icons/fa";

export default function PropertiesView({
    auth,
    property,
    relatedProperties = [],
}) {
    const { language } = useLanguage();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const translations = {
        en: {
            propertyDetails: "Property Details",
            backToProperties: "Back to Properties",
            description: "Description",
            propertyFeatures: "Property Features",
            amenities: "Amenities",
            contactAgent: "Contact Agent",
            scheduleTour: "Schedule a Tour",
            sendInquiry: "Send Inquiry",
            similarProperties: "Similar Properties",
            bedrooms: "Bedrooms",
            bathrooms: "Bathrooms",
            size: "Size",
            yearBuilt: "Year Built",
            parking: "Parking",
            sqm: "sqm",
            forSale: "For Sale",
            forRent: "For Rent",
            price: "Price",
            location: "Location",
            type: "Type",
            status: "Status",
            availableFrom: "Available From",
            yourName: "Your Name",
            emailAddress: "Email Address",
            phoneNumber: "Phone Number",
            message: "Message",
            tellUsMore: "Tell us more about your requirements...",
            saveToFavorites: "Save to Favorites",
            shareProperty: "Share Property",
            viewOnMap: "View on Map",
            virtualTour: "Virtual Tour",
            downloadBrochure: "Download Brochure",
            contactNow: "Contact Now",
            perMonth: "per month",
            airConditioning: "Air Conditioning",
            swimmingPool: "Swimming Pool",
            gym: "Gym",
            wifi: "WiFi",
            tv: "TV",
            kitchen: "Kitchen",
            furnished: "Furnished",
            security: "24/7 Security",
            garden: "Garden",
            balcony: "Balcony",
        },
        kh: {
            propertyDetails: "ព័ត៌មានលម្អិតអំពីទ្រព្យសម្បត្តិ",
            backToProperties: "ត្រឡប់ទៅរាយទ្រព្យសម្បត្តិ",
            description: "ការពិពណ៌នា",
            propertyFeatures: "លក្ខណៈពិសេស",
            amenities: "ភាពស្រស់ស្អាត",
            contactAgent: "ទាក់ទងអ្នកកាន់កាប់",
            scheduleTour: "កំណត់ពេលទស្សនា",
            sendInquiry: "ផ្ញើសំណួរ",
            similarProperties: "ទ្រព្យសម្បត្តិស្រដៀងគ្នា",
            bedrooms: "បន្ទប់គេង",
            bathrooms: "បន្ទប់ទឹក",
            size: "ទំហំ",
            yearBuilt: "ឆ្នាំសាងសង់",
            parking: "ការឈប់រថយន្ត",
            sqm: "ម៉ែត្រការ៉េ",
            forSale: "លក់",
            forRent: "ជួល",
            price: "តម្លៃ",
            location: "ទីតាំង",
            type: "ប្រភេទ",
            status: "ស្ថានភាព",
            availableFrom: "មានពី",
            yourName: "ឈ្មោះអ្នក",
            emailAddress: "អ៊ីមែល",
            phoneNumber: "លេខទូរស័ព្ទ",
            message: "សារ",
            tellUsMore: "ប្រាប់យើងបន្ថែមអំពីតម្រូវការរបស់អ្នក...",
            saveToFavorites: "រក្សាទុកក្នុងចំណូលចិត្ត",
            shareProperty: "ចែករំលែកទ្រព្យសម្បត្តិ",
            viewOnMap: "មើលលើផែនទី",
            virtualTour: "ទស្សនាជាក់ស្តែង",
            downloadBrochure: "ទាញយកសៀវភៅព័ត៌មាន",
            contactNow: "ទាក់ទងឥឡូវនេះ",
            perMonth: "ក្នុងមួយខែ",
            airConditioning: "ម៉ាស៊ីនត្រជាក់",
            swimmingPool: "អាងហែលទឹក",
            gym: "កាយសម្ព័ន្ធ",
            wifi: "អ៊ីនធឺណិត",
            tv: "ទូរទស្សន៍",
            kitchen: "ផ្ទះបាយ",
            furnished: "ម៉ូត",
            security: "សុវត្ថិភាព 24/7",
            garden: "សួន",
            balcony: "បង្អួចខាងក្រៅ",
        },
    };

    const t = translations[language];

    const getTranslatedType = (type) => {
        const typeMap = {
            House: language === "en" ? "House" : "ផ្ទះ",
            Apartment: language === "en" ? "Apartment" : "អាផាតមិន",
            Land: language === "en" ? "Land" : "ដី",
            Office: language === "en" ? "Office" : "ការិយាល័យ",
        };
        return typeMap[type] || type;
    };

    const getTranslatedStatus = (status) => {
        return status === "For Sale" ? t.forSale : t.forRent;
    };

    const propertyFeatures = [
        { label: t.bedrooms, value: property.bedrooms || 3, icon: FaBed },
        { label: t.bathrooms, value: property.bathrooms || 2, icon: FaBath },
        {
            label: t.size,
            value: `${property.formatted_size || property.size} ${t.sqm}`,
            icon: FaRulerCombined,
        },
        { label: t.yearBuilt, value: "2020", icon: FaCalendar },
        {
            label: t.parking,
            value: property.type === "House" ? "Garage" : "Available",
            icon: FaCar,
        },
    ];

    const amenities = [
        { label: t.airConditioning, icon: FaSnowflake, included: true },
        {
            label: t.swimmingPool,
            icon: FaSwimmingPool,
            included: property.type === "House",
        },
        {
            label: t.gym,
            icon: FaDumbbell,
            included:
                property.type === "Apartment" || property.type === "Office",
        },
        { label: t.wifi, icon: FaWifi, included: true },
        { label: t.tv, icon: FaTv, included: true },
        { label: t.kitchen, icon: FaUtensils, included: true },
    ];

    const images =
        property.images && property.images.length > 0
            ? property.images
            : [property.image_url || property.image];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(
            (prev) => (prev - 1 + images.length) % images.length
        );
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: property.title,
                text: `Check out this ${property.type} in ${property.location}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
        // You can add API call here to save to favorites
    };

    return (
        <UserLayout user={auth?.user}>
            <Head title={property.title} />

            {/* Breadcrumb */}
            <div className="bg-gray-50 py-4">
                <div className="container mx-auto px-4">
                    <div className="flex items-center text-sm">
                        <Link
                            href={route("home.properties.browse")}
                            className="text-primary hover:text-primary-dark transition-colors"
                        >
                            {language === "en"
                                ? "Properties"
                                : "ទ្រព្យសម្បត្តិ"}
                        </Link>
                        <span className="mx-2 text-gray-400">/</span>
                        <span className="text-gray-600">{property.title}</span>
                    </div>
                </div>
            </div>

            {/* Property Header */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">
                            {property.title}
                        </h1>
                        <div className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-primary" />
                            <span className="text-lg">{property.location}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleFavorite}
                            className={`p-3 rounded-full ${
                                isFavorite
                                    ? "bg-red-100 text-red-500"
                                    : "bg-gray-100 text-gray-500 hover:text-red-500"
                            }`}
                            title={t.saveToFavorites}
                        >
                            <FaHeart />
                        </button>
                        <button
                            onClick={handleShare}
                            className="p-3 rounded-full bg-gray-100 text-gray-500 hover:text-primary"
                            title={t.shareProperty}
                        >
                            <FaShareAlt />
                        </button>
                        <Link
                            href={route("home.properties.browse")}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <FaChevronLeft />
                            {t.backToProperties}
                        </Link>
                    </div>
                </div>

                {/* Property Gallery */}
                <div className="relative mb-8">
                    <div className="relative h-[500px] rounded-xl overflow-hidden">
                        <img
                            src={images[currentImageIndex]}
                            alt={`${property.title} - Image ${
                                currentImageIndex + 1
                            }`}
                            className="w-full h-full object-cover"
                        />
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-colors"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-colors"
                                >
                                    <FaChevronRight />
                                </button>
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setCurrentImageIndex(index)
                                            }
                                            className={`w-3 h-3 rounded-full ${
                                                index === currentImageIndex
                                                    ? "bg-white"
                                                    : "bg-white/50"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {images.slice(0, 4).map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`h-24 rounded-lg overflow-hidden ${
                                    currentImageIndex === index
                                        ? "ring-2 ring-primary"
                                        : ""
                                }`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Property Details */}
                    <div className="lg:col-span-2">
                        {/* Price and Status */}
                        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-xl mb-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div>
                                    <div className="text-4xl font-bold text-primary mb-2">
                                        {property.formatted_price ||
                                            `$${property.price}`}
                                        {property.status === "For Rent" && (
                                            <span className="text-lg font-normal text-gray-600 ml-2">
                                                / {t.perMonth}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span
                                            className={`px-4 py-1 rounded-full font-semibold ${
                                                property.status === "For Sale"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-blue-100 text-blue-800"
                                            }`}
                                        >
                                            {getTranslatedStatus(
                                                property.status
                                            )}
                                        </span>
                                        <span className="px-4 py-1 bg-dark/10 text-dark rounded-full">
                                            {getTranslatedType(property.type)}
                                        </span>
                                    </div>
                                </div>
                                <PrimaryButton className="mt-4 md:mt-0 px-8 py-3 text-lg">
                                    <FaPhone className="mr-2" />
                                    {t.contactNow}
                                </PrimaryButton>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-dark mb-4">
                                {t.description}
                            </h2>
                            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                {property.description || language === "en"
                                    ? "No description provided for this property."
                                    : "គ្មានការពិពណ៌នាសម្រាប់ទ្រព្យសម្បត្តិនេះទេ។"}
                            </p>
                        </div>

                        {/* Property Features */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-dark mb-4">
                                {t.propertyFeatures}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {propertyFeatures.map((feature, index) => {
                                    const Icon = feature.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="text-center p-4 bg-gray-50 rounded-lg"
                                        >
                                            <div className="flex justify-center mb-2">
                                                <Icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <p className="text-sm text-gray-500 mb-1">
                                                {feature.label}
                                            </p>
                                            <p className="text-lg font-semibold text-gray-800">
                                                {feature.value}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-dark mb-4">
                                {t.amenities}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {amenities.map((amenity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                                    >
                                        <amenity.icon
                                            className={`h-5 w-5 mr-3 ${
                                                amenity.included
                                                    ? "text-green-500"
                                                    : "text-gray-300"
                                            }`}
                                        />
                                        <span
                                            className={
                                                amenity.included
                                                    ? "text-gray-700"
                                                    : "text-gray-400 line-through"
                                            }
                                        >
                                            {amenity.label}
                                        </span>
                                        {amenity.included && (
                                            <FaCheckCircle className="ml-auto h-4 w-4 text-green-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form & Agent Info */}
                    <div className="space-y-8">
                        {/* Contact Agent Form */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-dark mb-4">
                                {t.contactAgent}
                            </h3>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t.yourName}
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t.emailAddress}
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t.phoneNumber}
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t.message}
                                    </label>
                                    <textarea
                                        rows="4"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder={t.tellUsMore}
                                    ></textarea>
                                </div>
                                <PrimaryButton className="w-full">
                                    {t.sendInquiry}
                                </PrimaryButton>
                            </form>
                        </div>

                        {/* Agent Information */}
                        {property.user && (
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-dark mb-4">
                                    {t.contactAgent}
                                </h3>
                                <div className="flex items-center mb-4">
                                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-primary">
                                            {property.user.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-bold text-lg">
                                            {property.user.name}
                                        </h4>
                                        <p className="text-gray-600">
                                            Professional Agent
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-600">
                                        <FaPhone className="h-4 w-4 mr-3" />
                                        <span>
                                            {property.user.phone ||
                                                "+855 12 345 678"}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FaEnvelope className="h-4 w-4 mr-3" />
                                        <span>{property.user.email}</span>
                                    </div>
                                </div>
                                <SecondaryButton className="w-full mt-4">
                                    {t.scheduleTour}
                                </SecondaryButton>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="space-y-3">
                            <button className="w-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                                <FaMapMarkerAlt />
                                {t.viewOnMap}
                            </button>
                            <button className="w-full border border-dark text-dark hover:bg-dark hover:text-white transition-colors py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                                <FaStar />
                                {t.virtualTour}
                            </button>
                            <button className="w-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                                <FaEnvelope />
                                {t.downloadBrochure}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Properties */}
                {relatedProperties.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-dark mb-6">
                            {t.similarProperties}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedProperties.map((related) => (
                                <Link
                                    key={related.id}
                                    href={route(
                                        "home.properties.show",
                                        related.id
                                    )}
                                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={
                                                related.image_url ||
                                                related.image
                                            }
                                            alt={related.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    related.status ===
                                                    "For Sale"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-blue-100 text-blue-800"
                                                }`}
                                            >
                                                {getTranslatedStatus(
                                                    related.status
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-dark mb-2">
                                            {related.title}
                                        </h3>
                                        <div className="flex items-center text-gray-600 mb-3">
                                            <FaMapMarkerAlt className="h-4 w-4 mr-2" />
                                            <span className="text-sm">
                                                {related.location}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-primary">
                                                {related.formatted_price ||
                                                    `$${related.price}`}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {getTranslatedType(
                                                    related.type
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
