import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ auth, property, relatedProperties }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Property Details
                    </h2>
                    <div className="flex space-x-4">
                        <Link href={route('properties.index')}>
                            <PrimaryButton variant="secondary">Back to Properties</PrimaryButton>
                        </Link>
                        
                    </div>
                </div>
            }
        >
            <Head title={property.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Property Header */}
                        <div className="relative">
                            <img
                                src={property.image_url}
                                alt={property.title}
                                className="w-full h-96 object-cover"
                            />
                            <div className="absolute top-6 right-6 space-y-2">
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                    property.status === 'For Sale' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {property.status}
                                </span>
                                <span className="block px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                                    {property.type}
                                </span>
                            </div>
                        </div>

                        {/* Property Details */}
                        <div className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Main Information */}
                                <div className="lg:col-span-2">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
                                    
                                    <div className="flex items-center mb-6">
                                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-lg text-gray-600">{property.location}</span>
                                    </div>

                                    <div className="mb-8">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
                                        <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
                                    </div>

                                    {/* Property Features */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-500 mb-2">Price</p>
                                            <p className="text-2xl font-bold text-gray-800">{property.formatted_price}</p>
                                        </div>
                                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-500 mb-2">Size</p>
                                            <p className="text-2xl font-bold text-gray-800">{property.formatted_size}</p>
                                        </div>
                                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-500 mb-2">Type</p>
                                            <p className="text-xl font-semibold text-gray-800">{property.type}</p>
                                        </div>
                                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-500 mb-2">Status</p>
                                            <p className={`text-xl font-semibold ${
                                                property.status === 'For Sale' ? 'text-green-600' : 'text-blue-600'
                                            }`}>
                                                {property.status}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Agent Information */}
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Agent Information</h3>
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <p className="font-semibold text-gray-800">{property.user.name}</p>
                                                <p className="text-gray-600">{property.user.email}</p>
                                                {property.user.phone && (
                                                    <p className="text-gray-600">Phone: {property.user.phone}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar - Inquiry Form & Related Properties */}
                                <div className="space-y-8">
                                    {/* Inquiry Form */}
                                    <div className="bg-indigo-50 p-6 rounded-lg">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Interested in this property?</h3>
                                        <form className="space-y-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    rows="4"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    placeholder="Tell us more about your interest..."
                                                ></textarea>
                                            </div>
                                            <PrimaryButton className="w-full">
                                                Send Inquiry
                                            </PrimaryButton>
                                        </form>
                                    </div>

                                    {/* Related Properties */}
                                    {relatedProperties.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Similar Properties</h3>
                                            <div className="space-y-4">
                                                {relatedProperties.map((related) => (
                                                    <Link
                                                        key={related.id}
                                                        href={route('properties.show', related.id)}
                                                        className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                                    >
                                                        <div className="flex">
                                                            <img
                                                                src={related.image_url}
                                                                alt={related.title}
                                                                className="h-20 w-24 object-cover rounded"
                                                            />
                                                            <div className="ml-4">
                                                                <h4 className="font-semibold text-gray-800">{related.title}</h4>
                                                                <p className="text-sm text-gray-600">{related.location}</p>
                                                                <p className="text-sm font-bold text-indigo-600">{related.formatted_price}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}