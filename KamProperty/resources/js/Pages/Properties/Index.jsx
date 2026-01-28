import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index({ auth, properties, filters = {}, stats = {} }) { // Added default values
    const { flash } = usePage().props || {}; // Added safety check
    const [searchParams, setSearchParams] = useState({
        type: filters.type || 'all',
        status: filters.status || 'all',
        location: filters.location || '',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('properties.index'), searchParams);
    };

    const handleReset = () => {
        setSearchParams({
            type: 'all',
            status: 'all',
            location: '',
            min_price: '',
            max_price: '',
        });
        router.get(route('properties.index'));
    };

    const deleteProperty = (id) => {
        if (confirm('Are you sure you want to delete this property?')) {
            router.delete(route('properties.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Properties ({stats.total || 0})
                    </h2>
                    {(auth.user.is_admin || auth.user.is_agent) && (
                        <Link href={route('properties.create')}>
                            <PrimaryButton>+ Add New Property</PrimaryButton>
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Properties" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Flash Messages - Fixed with optional chaining */}
                    {flash?.success && (
                        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}

                    {/* Stats - Fixed with optional chaining */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">Total Properties</p>
                                    <p className="text-2xl font-semibold text-gray-700">{stats.total || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">For Sale</p>
                                    <p className="text-2xl font-semibold text-gray-700">{stats.for_sale || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">For Rent</p>
                                    <p className="text-2xl font-semibold text-gray-700">{stats.for_rent || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rest of the component remains the same... */}
                    {/* Search Filters */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6">
                            <form onSubmit={handleSearch} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                                        <select
                                            value={searchParams.type}
                                            onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        >
                                            <option value="all">All Types</option>
                                            <option value="House">House</option>
                                            <option value="Apartment">Apartment</option>
                                            <option value="Land">Land</option>
                                            <option value="Office">Office</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                        <select
                                            value={searchParams.status}
                                            onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="For Sale">For Sale</option>
                                            <option value="For Rent">For Rent</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                        <input
                                            type="text"
                                            value={searchParams.location}
                                            onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                                            placeholder="Enter location"
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                                            <input
                                                type="number"
                                                value={searchParams.min_price}
                                                onChange={(e) => setSearchParams({ ...searchParams, min_price: e.target.value })}
                                                placeholder="Min"
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                                            <input
                                                type="number"
                                                value={searchParams.max_price}
                                                onChange={(e) => setSearchParams({ ...searchParams, max_price: e.target.value })}
                                                placeholder="Max"
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <PrimaryButton type="submit">Search</PrimaryButton>
                                    <SecondaryButton type="button" onClick={handleReset}>
                                        Reset Filters
                                    </SecondaryButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Properties Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.data.map((property) => (
                            <div key={property.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="relative">
                                    <img
                                        src={property.image_url}
                                        alt={property.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            property.status === 'For Sale' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {property.status}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                                            {property.type}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
                                    <p className="text-gray-600 mb-4">{property.location}</p>
                                    
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-500">Price</p>
                                            <p className="text-lg font-bold text-gray-800">{property.formatted_price}</p>
                                        </div>
                                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-500">Size</p>
                                            <p className="text-lg font-bold text-gray-800">{property.formatted_size}</p>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-600 mb-6 overflow-hidden" style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical'
                                    }}>{property.description}</p>
                                    
                                    <div className="flex justify-between items-center">
                                        <Link
                                            href={route('properties.show', property.id)}
                                            className="text-indigo-600 hover:text-indigo-900 font-medium"
                                        >
                                            View Details →
                                        </Link>
                                        
                                        {(auth.user.is_admin || (auth.user.is_agent && property.user_id === auth.user.id)) && (
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={route('properties.edit', property.id)}
                                                    className="text-sm text-blue-600 hover:text-blue-900"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => deleteProperty(property.id)}
                                                    className="text-sm text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {properties.links && properties.links.length > 3 && (
                        <div className="mt-8">
                            <nav className="flex items-center justify-between">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    {properties.prev_page_url && (
                                        <Link
                                            href={properties.prev_page_url}
                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    {properties.next_page_url && (
                                        <Link
                                            href={properties.next_page_url}
                                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{properties.from}</span> to{' '}
                                            <span className="font-medium">{properties.to}</span> of{' '}
                                            <span className="font-medium">{properties.total}</span> results
                                        </p>
                                    </div>
                                    <div className="ml-6">
                                        {properties.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    link.active
                                                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                    index === properties.links.length - 1 ? 'rounded-r-md' : ''
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </nav>
                        </div>
                    )}

                    {/* Empty State */}
                    {properties.data.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {Object.values(filters).some(v => v) 
                                    ? 'Try adjusting your search filters.' 
                                    : 'Get started by creating a new property.'}
                            </p>
                            {(auth.user.is_admin || auth.user.is_agent) && (
                                <div className="mt-6">
                                    <Link href={route('properties.create')}>
                                        <PrimaryButton>
                                            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add Property
                                        </PrimaryButton>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}