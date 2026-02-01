import React, { useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useLanguage } from "@/contexts/LanguageContext";

// Import all icons from react-icons
import {
    FaSearch,
    FaHome,
    FaCheckCircle,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaStar,
    FaBuilding,
    FaShieldAlt,
    FaChartLine,
    FaFilter,
    FaBed,
    FaBath,
    FaRulerCombined,
} from "react-icons/fa";

import { MdApartment, MdLandscape, MdCorporateFare } from "react-icons/md";

export default function HomePage({
    auth,
    featuredProperties = [],
    stats = {},
}) {
    const { language } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");

    const translations = {
        en: {
            welcome: "Find Your Dream Property",
            tagline: "Discover perfect homes, apartments, lands, and offices",
            searchPlaceholder: "Search by location, type, or keyword...",
            featuredProperties: "Featured Properties",
            viewAllProperties: "View All Properties",
            propertyTypes: "Property Types",
            whyChooseUs: "Why Choose KamProperty",
            testimonials: "What Our Clients Say",
            contactUs: "Contact Us",
            getStarted: "Get Started",
            learnMore: "Learn More",
            heroSubtitle:
                "Trusted by thousands for finding their perfect property",
            stats: {
                totalProperties: "Properties Listed",
                happyClients: "Happy Clients",
                citiesCovered: "Cities Covered",
                yearsExperience: "Years Experience",
            },
            features: [
                {
                    title: "Verified Listings",
                    description:
                        "Every property is thoroughly verified before listing",
                    icon: FaShieldAlt,
                },
                {
                    title: "Expert Agents",
                    description:
                        "Professional agents with local market knowledge",
                    icon: FaChartLine,
                },
                {
                    title: "24/7 Support",
                    description: "Round-the-clock customer service",
                    icon: FaPhoneAlt,
                },
                {
                    title: "Best Price Guarantee",
                    description: "We ensure you get the best market value",
                    icon: FaCheckCircle,
                },
            ],
            propertyTypesList: [
                { name: "Houses", icon: FaHome, count: stats?.houses || 125 },
                {
                    name: "Apartments",
                    icon: MdApartment,
                    count: stats?.apartments || 89,
                },
                { name: "Lands", icon: MdLandscape, count: stats?.lands || 42 },
                {
                    name: "Offices",
                    icon: MdCorporateFare,
                    count: stats?.offices || 67,
                },
            ],
            testimonialsList: [
                {
                    name: "Sophal Chen",
                    role: "Property Investor",
                    text: "Found my perfect office space through KamProperty. The team was professional and helpful throughout the process.",
                    rating: 5,
                },
                {
                    name: "Mey Srey",
                    role: "First-time Home Buyer",
                    text: "As a first-time buyer, I was nervous, but the agents made everything simple. Highly recommended!",
                    rating: 5,
                },
                {
                    name: "Rithy Sok",
                    role: "Real Estate Developer",
                    text: "Great platform for listing properties. The exposure we get is fantastic and the support team is responsive.",
                    rating: 4,
                },
            ],
        },
        kh: {
            welcome: "ស្វែងរកទ្រព្យសម្បត្តិសុបិន្តរបស់អ្នក",
            tagline: "រកឃើញផ្ទះ អាផាតមិន ដី និងការិយាល័យដ៏ល្អឥតខ្ចោះ",
            searchPlaceholder: "ស្វែងរកតាមទីតាំង ប្រភេទ ឬពាក្យគន្លឹះ...",
            featuredProperties: "ទ្រព្យសម្បត្តិពិសេស",
            viewAllProperties: "មើលទ្រព្យសម្បត្តិទាំងអស់",
            propertyTypes: "ប្រភេទទ្រព្យសម្បត្តិ",
            whyChooseUs: "ហេតុអ្វីត្រូវជ្រើសរើស KamProperty",
            testimonials: "អ្វីដែលអតិថិជនរបស់យើងនិយាយ",
            contactUs: "ទាក់ទងយើងខ្ញុំ",
            getStarted: "ចាប់ផ្តើម",
            learnMore: "ស្វែងយល់បន្ថែម",
            heroSubtitle:
                "ទុកចិត្តដោយអ្នករាប់ពាន់នាក់សម្រាប់ការស្វែងរកទ្រព្យសម្បត្តិដ៏ល្អឥតខ្ចោះ",
            stats: {
                totalProperties: "ទ្រព្យសម្បត្តិដែលបានចុះបញ្ជី",
                happyClients: "អតិថិជនរីករាយ",
                citiesCovered: "ទីក្រុងដែលគ្របដណ្តប់",
                yearsExperience: "ឆ្នាំបទពិសោធន៍",
            },
            features: [
                {
                    title: "បញ្ជីដែលបានផ្ទៀងផ្ទាត់",
                    description:
                        "ទ្រព្យសម្បត្តិគ្រប់យ៉ាងត្រូវបានផ្ទៀងផ្ទាត់យ៉ាងហ្មត់ចត់មុនពេលចុះបញ្ជី",
                    icon: FaShieldAlt,
                },
                {
                    title: "ភ្នាក់ងារជំនាញ",
                    description:
                        "ភ្នាក់ងារមានជំនាញជាមួយចំណេះដឹងទីផ្សារក្នុងស្រុក",
                    icon: FaChartLine,
                },
                {
                    title: "គាំទ្រ 24/7",
                    description: "សេវាអតិថិជនមួយជុំវិញម៉ោង",
                    icon: FaPhoneAlt,
                },
                {
                    title: "ធានាតម្លៃល្អបំផុត",
                    description: "យើងធានាថាអ្នកទទួលបានតម្លៃទីផ្សារល្អបំផុត",
                    icon: FaCheckCircle,
                },
            ],
            propertyTypesList: [
                { name: "ផ្ទះ", icon: FaHome, count: stats?.houses || 125 },
                {
                    name: "អាផាតមិន",
                    icon: MdApartment,
                    count: stats?.apartments || 89,
                },
                { name: "ដី", icon: MdLandscape, count: stats?.lands || 42 },
                {
                    name: "ការិយាល័យ",
                    icon: MdCorporateFare,
                    count: stats?.offices || 67,
                },
            ],
            testimonialsList: [
                {
                    name: "ឈិន សុផល",
                    role: "វិនិយោគិនទ្រព្យសម្បត្តិ",
                    text: "បានរកឃើញការិយាល័យដ៏ល្អឥតខ្ចោះតាមរយៈ KamProperty ។ ក្រុមការងារមានវិជ្ជាជីវៈ និងជួយពេញមួយដំណើរការ។",
                    rating: 5,
                },
                {
                    name: "ម៉ី ស្រី",
                    role: "អ្នកទិញផ្ទះដំបូង",
                    text: "ក្នុងនាមជាអ្នកទិញដំបូង ខ្ញុំមានការភ័យខ្លាច ប៉ុន្តែភ្នាក់ងារធ្វើអោយអ្វីៗងាយស្រួល។ ផ្តល់អនុសាសន៍ខ្លាំង!",
                    rating: 5,
                },
                {
                    name: "សុខ រិទ្ធ",
                    role: "អ្នកអភិវឌ្ឍទ្រព្យសម្បត្តិ",
                    text: "វេទិកាដ៏អស្ចារ្យសម្រាប់ការចុះបញ្ជីទ្រព្យសម្បត្តិ។ ការលើកតម្កើងដែលយើងទទួលបានគឺអស្ចារ្យ ហើយក្រុមគាំទ្រឆ្លើយតបយ៉ាងរហ័ស។",
                    rating: 4,
                },
            ],
        },
    };

    const t = translations[language];

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/properties?search=${encodeURIComponent(
                searchQuery
            )}`;
        }
    };

    const teamMembers = [
        {
            name: "David Yon",
            role: "CEO & Founder",
            image: "/images/yondavid.png",
        },
        {
            name: "Hantith Thearith",
            role: "Head of Sales",
            image: "/images/hantiththearith.png",
        },
        {
            name: "Butseav Thong",
            role: "Property Manager",
            image: "/images/butseavthong.png",
        },
        {
            name: "Leng Chhang Leang",
            role: "Marketing Director",
            image: "/images/lengchhangleang.png",
        },
        {
            name: "Sok Sothea",
            role: "Customer Relations",
            image: "/images/soksothea.png",
        },
        {
            name: "Pal Satya",
            role: "Legal Advisor",
            image: "/images/palsatya.png",
        },
    ];

    return (
        <UserLayout user={auth?.user}>
            <Head title={t.welcome} />

            {/* Hero Section with Background Image */}
            <section
                className="relative bg-gradient-to-r from-dark/90 to-primary-dark/90 text-white py-20 min-h-[70vh] flex items-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "overlay",
                }}
            >
                <div className="absolute inset-0 bg-dark/70"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            {t.welcome}
                        </h1>
                        <p className="text-xl mb-8 text-gray-200">
                            {t.heroSubtitle}
                        </p>

                        {/* Search Bar */}
                        <form
                            onSubmit={handleSearch}
                            className="max-w-2xl mx-auto mb-12"
                        >
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        placeholder={t.searchPlaceholder}
                                        className="w-full px-6 py-4 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
                                    />
                                    <FaSearch className="absolute right-4 top-4 text-gray-400" />
                                </div>
                                <PrimaryButton
                                    type="submit"
                                    className="px-8 py-4 bg-primary hover:bg-primary-dark shadow-lg"
                                >
                                    <FaSearch className="inline mr-2" />
                                    {language === "en" ? "Search" : "ស្វែងរក"}
                                </PrimaryButton>
                            </div>
                        </form>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="text-3xl font-bold mb-2">
                                    {stats?.total || 450}+
                                </div>
                                <div className="text-gray-300">
                                    {t.stats.totalProperties}
                                </div>
                            </div>
                            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="text-3xl font-bold mb-2">
                                    {stats?.clients || 1200}+
                                </div>
                                <div className="text-gray-300">
                                    {t.stats.happyClients}
                                </div>
                            </div>
                            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="text-3xl font-bold mb-2">
                                    15+
                                </div>
                                <div className="text-gray-300">
                                    {t.stats.citiesCovered}
                                </div>
                            </div>
                            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="text-3xl font-bold mb-2">
                                    10+
                                </div>
                                <div className="text-gray-300">
                                    {t.stats.yearsExperience}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Property Types */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        {t.propertyTypes}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {t.propertyTypesList.map((type, index) => {
                            const Icon = type.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mb-4">
                                        <Icon className="text-2xl text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {type.name}
                                    </h3>
                                    <p className="text-2xl font-bold text-primary">
                                        {type.count}+
                                    </p>
                                    <p className="text-gray-600 mt-2">
                                        {language === "en"
                                            ? "Available Properties"
                                            : "ទ្រព្យសម្បត្តិដែលមាន"}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        {t.whyChooseUs}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {t.features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="text-center p-6 hover:bg-gray-50 rounded-lg transition-colors duration-300"
                                >
                                    <div className="inline-flex items-center justify-center w-14 h-14 bg-accent-light rounded-full mb-4">
                                        <Icon className="text-2xl text-accent" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Properties Preview */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">
                            {t.featuredProperties}
                        </h2>
                        <Link
                            href={route("properties.index")}
                            className="text-primary hover:text-primary-dark font-semibold flex items-center"
                        >
                            {t.viewAllProperties}
                            <svg
                                className="w-4 h-4 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </div>

                    {featuredProperties && featuredProperties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredProperties.slice(0, 6).map((property) => (
                                <div
                                    key={property.id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={
                                                property.image_url ||
                                                property.image
                                            }
                                            alt={property.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                                            {property.status}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold mb-2">
                                            {property.title}
                                        </h3>
                                        <div className="flex items-center text-gray-600 mb-3">
                                            <FaMapMarkerAlt className="mr-2 text-primary" />
                                            <span>{property.location}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-2xl font-bold text-primary">
                                                {property.formatted_price ||
                                                    `$${property.price}`}
                                            </span>
                                            <span className="text-gray-600">
                                                {property.formatted_size ||
                                                    `${property.size} sqm`}
                                            </span>
                                        </div>
                                        <Link
                                            href={route(
                                                "properties.show",
                                                property.id
                                            )}
                                            className="block w-full text-center bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
                                        >
                                            {language === "en"
                                                ? "View Details"
                                                : "មើលព័ត៌មានលម្អិត"}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg mb-4">
                                {language === "en"
                                    ? "No featured properties available"
                                    : "មិនមានទ្រព្យសម្បត្តិពិសេសទេ"}
                            </p>
                            <PrimaryButton href={route("properties.index")}>
                                {language === "en"
                                    ? "Browse All Properties"
                                    : "មើលទ្រព្យសម្បត្តិទាំងអស់"}
                            </PrimaryButton>
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        {t.testimonials}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {t.testimonialsList.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < testimonial.rating
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 italic">
                                    "{testimonial.text}"
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center text-primary font-bold mr-4">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        {language === "en"
                            ? "Meet Our Team"
                            : "ស្គាល់ក្រុមការងាររបស់យើង"}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="font-semibold text-lg">
                                    {member.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-dark to-primary-dark text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        {language === "en"
                            ? "Ready to Find Your Perfect Property?"
                            : "ត្រៀមខ្លួនរកឃើញទ្រព្យសម្បត្តិដ៏ល្អឥតខ្ចោះរបស់អ្នកទេ?"}
                    </h2>
                    <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
                        {language === "en"
                            ? "Join thousands of satisfied clients who found their dream property with us"
                            : "ចូលរួមជាមួយអតិថិជនរាប់ពាន់នាក់ដែលបានរកឃើញទ្រព្យសម្បត្តិសុបិន្តរបស់ពួកគេជាមួយយើង"}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <PrimaryButton
                            href={
                                auth?.user
                                    ? route("properties.index")
                                    : route("register")
                            }
                            className="px-8 py-3 text-lg bg-primary text-dark hover:bg-primary-dark hover:text-white"
                        >
                            {auth?.user
                                ? language === "en"
                                    ? "Browse Properties"
                                    : "មើលទ្រព្យសម្បត្តិ"
                                : language === "en"
                                ? "Get Started Free"
                                : "ចាប់ផ្តើមដោយឥតគិតថ្លៃ"}
                        </PrimaryButton>
                        <SecondaryButton
                            href={route("properties.index")}
                            className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-dark"
                        >
                            <FaPhoneAlt className="inline mr-2" />
                            {t.contactUs}
                        </SecondaryButton>
                    </div>
                </div>
            </section>

            {/* Footer Contact Info */}
            <footer className="bg-dark text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">
                                KamProperty
                            </h3>
                            <p className="text-gray-400 mb-4">
                                {language === "en"
                                    ? "Your trusted partner in real estate. Finding your perfect property is our mission."
                                    : "ដៃគូដែលទុកចិត្តរបស់អ្នកក្នុងវិស័យអចលនទ្រព្យ។ ការស្វែងរកទ្រព្យសម្បត្តិដ៏ល្អឥតខ្ចោះរបស់អ្នកគឺជាបេសកកម្មរបស់យើង។"}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-4">
                                {language === "en"
                                    ? "Contact Info"
                                    : "ព័ត៌មានទាក់ទង"}
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <FaPhoneAlt className="mr-3 text-primary" />
                                    <span>+855 23 123 4567</span>
                                </div>
                                <div className="flex items-center">
                                    <FaEnvelope className="mr-3 text-primary" />
                                    <span>info@kamproperty.com</span>
                                </div>
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="mr-3 text-primary" />
                                    <span>Phnom Penh, Cambodia</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-4">
                                {language === "en"
                                    ? "Business Hours"
                                    : "ម៉ោងធ្វើការ"}
                            </h4>
                            <div className="space-y-2 text-gray-400">
                                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                                <p>Saturday: 9:00 AM - 4:00 PM</p>
                                <p>Sunday: 10:00 AM - 3:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </UserLayout>
    );
}
