import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Index({ auth, properties, filters = {}, stats = {}, owners = [] }) {
    const { flash } = usePage().props || {};
    const [searchParams, setSearchParams] = useState({
        type: filters.type || 'all',
        status: filters.status || 'all',
        location: filters.location || '',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
        wide_images: filters.wide_images || false,
    });

    // Modal states
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);
    const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop');
    const [imageSuggestions, setImageSuggestions] = useState([]);
    const [showImageSuggestions, setShowImageSuggestions] = useState(false);

    // Form for create/edit
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        type: 'House',
        price: '',
        location: '',
        size: '',
        description: '',
        status: 'For Sale',
        image: '',
        owner_id: '',
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
            wide_images: false,
        });
        router.get(route('properties.index'));
    };

    const deleteProperty = (id) => {
        if (confirm('Are you sure you want to delete this property?')) {
            router.delete(route('properties.destroy', id));
        }
    };

    // Helper function to check if user can edit/delete property
    const canEditProperty = (property) => {
        return auth.user.is_admin || 
               (auth.user.is_agent && property.user_id === auth.user.id);
    };

    // Check if user can add property
    const canAddProperty = auth.user.is_admin || auth.user.is_agent;

    // Open create modal
    const openCreateModal = () => {
        reset();
        setImagePreview('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop');
        setShowCreateModal(true);
        fetchImageSuggestions('House');
    };

    // Open edit modal
    const openEditModal = (property) => {
        setEditingProperty(property);
        setData({
            title: property.title,
            type: property.type,
            price: property.price,
            location: property.location,
            size: property.size,
            description: property.description || '',
            status: property.status,
            image: property.image,
            owner_id: property.owner_id || '',
        });
        setImagePreview(property.image_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop');
        setShowEditModal(true);
        fetchImageSuggestions(property.type);
    };

    // Close modals
    const closeModals = () => {
        setShowCreateModal(false);
        setShowEditModal(false);
        setEditingProperty(null);
        reset();
    };

    // Fetch image suggestions
    const fetchImageSuggestions = async (type) => {
        try {
            const response = await fetch(`/image-suggestions?type=${type}`);
            const result = await response.json();
            setImageSuggestions(result.suggestions || []);
        } catch (error) {
            console.error('Failed to fetch image suggestions:', error);
        }
    };

    // Handle image URL change
    const handleImageChange = (e) => {
        const url = e.target.value;
        setData('image', url);
        
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            setImagePreview(url);
        }
    };

    // Select image suggestion
    const selectImageSuggestion = (url) => {
        setData('image', url);
        setImagePreview(url);
        setShowImageSuggestions(false);
    };

    // Handle type change
    const handleTypeChange = (type) => {
        setData('type', type);
        fetchImageSuggestions(type);
    };

    // Submit form
    const submitForm = (e) => {
        e.preventDefault();
        
        if (showEditModal && editingProperty) {
            put(route('properties.update', editingProperty.id), {
                onSuccess: () => {
                    closeModals();
                }
            });
        } else {
            post(route('properties.store'), {
                onSuccess: () => {
                    closeModals();
                }
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h2 className="font-semibold text-xl text-dark leading-tight">
                            Properties ({stats.total || 0})
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Browse through our collection of premium properties
                        </p>
                    </div>
                    {canAddProperty && (
                        <PrimaryButton 
                            className="flex items-center"
                            onClick={openCreateModal}
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add New Property
                        </PrimaryButton>
                    )}
                </div>
            }
        >
            <Head title="Properties" />

            {/* Flash Messages */}
            {flash?.success && (
                <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {flash.success}
                    </div>
                </div>
            )}

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-xl p-4 shadow-soft border border-gray-100">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-primary/10 rounded-lg p-2">
                                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-500">Total Properties</p>
                                    <p className="text-xl font-bold text-dark">{stats.total || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-soft border border-gray-100">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-green-100 rounded-lg p-2">
                                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-500">For Sale</p>
                                    <p className="text-xl font-bold text-dark">{stats.for_sale || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-soft border border-gray-100">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-2">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-500">For Rent</p>
                                    <p className="text-xl font-bold text-dark">{stats.for_rent || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-soft border border-gray-100">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-accent/10 rounded-lg p-2">
                                    <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-500">Wide Images</p>
                                    <p className="text-xl font-bold text-dark">{stats.wide_images || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search Filters */}
                    <div className="bg-white rounded-xl shadow-soft mb-8 border border-gray-100">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-dark">Search & Filter</h3>
                                <button
                                    onClick={handleReset}
                                    className="text-sm text-gray-600 hover:text-dark"
                                >
                                    Clear all
                                </button>
                            </div>
                            
                            <form onSubmit={handleSearch} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                                        <select
                                            value={searchParams.type}
                                            onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
                                            className="w-full border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
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
                                            className="w-full border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
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
                                            className="w-full border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
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
                                                className="w-full border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                                            <input
                                                type="number"
                                                value={searchParams.max_price}
                                                onChange={(e) => setSearchParams({ ...searchParams, max_price: e.target.value })}
                                                placeholder="Max"
                                                className="w-full border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Advanced Filters */}
                                <div className="border-t border-gray-200 pt-6">
                                    <div className="flex flex-wrap gap-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={searchParams.wide_images || false}
                                                onChange={(e) => setSearchParams({ ...searchParams, wide_images: e.target.checked })}
                                                className="rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Show only wide images (2:1)</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex space-x-4 pt-4">
                                    <PrimaryButton type="submit">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Search Properties
                                    </PrimaryButton>
                                    <SecondaryButton type="button" onClick={handleReset}>
                                        Reset Filters
                                    </SecondaryButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Properties Grid */}
                    {properties.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {properties.data.map((property) => (
                                    <div 
                                        key={property.id} 
                                        className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-dark transition-all duration-300 border border-gray-100"
                                    >
                                        {/* Image Container - 2:1 Aspect Ratio */}
                                        <div className="relative aspect-[2/1] overflow-hidden bg-gray-100">
                                            <img
                                                src={property.thumbnail_url}
                                                alt={property.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop';
                                                }}
                                            />
                                            
                                            {/* Image Badge */}
                                            {property.is_wide_image && (
                                                <div className="absolute top-3 left-3">
                                                    <span className="px-2 py-1 bg-primary/90 text-white text-xs font-semibold rounded">
                                                        Wide
                                                    </span>
                                                </div>
                                            )}
                                            
                                            {/* Status Badge */}
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    property.status === 'For Sale' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {property.status}
                                                </span>
                                            </div>
                                            
                                            {/* Type Badge */}
                                            <div className="absolute bottom-3 left-3">
                                                <span className="px-3 py-1 bg-dark/80 text-white text-xs font-semibold rounded">
                                                    {property.type}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Property Details */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-dark mb-2 line-clamp-1">
                                                {property.title}
                                            </h3>
                                            
                                            <div className="flex items-center text-gray-600 mb-3">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="text-sm">{property.location}</span>
                                            </div>
                                            
                                            {/* Property Stats */}
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div className="bg-gray-50 rounded-lg p-3">
                                                    <p className="text-xs text-gray-500 mb-1">Price</p>
                                                    <p className="text-lg font-bold text-dark">{property.formatted_price}</p>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-3">
                                                    <p className="text-xs text-gray-500 mb-1">Size</p>
                                                    <p className="text-lg font-bold text-dark">{property.formatted_size}</p>
                                                </div>
                                            </div>
                                            
                                            {/* Description */}
                                            <p className="text-gray-600 mb-6 line-clamp-2">
                                                {property.description || 'No description available'}
                                            </p>
                                            
                                            {/* Action Buttons */}
                                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                                <Link
                                                    href={route('properties.show', property.id)}
                                                    className="text-primary hover:text-primary-dark font-medium flex items-center"
                                                >
                                                    View Details
                                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </Link>
                                                
                                                {canEditProperty(property) && (
                                                    <div className="flex space-x-3">
                                                        <button
                                                            onClick={() => openEditModal(property)}
                                                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                                        >
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => deleteProperty(property.id)}
                                                            className="text-sm text-red-600 hover:text-red-800 flex items-center"
                                                        >
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
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
                                <div className="mt-12">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="text-sm text-gray-700">
                                            Showing <span className="font-semibold">{properties.from}</span> to{' '}
                                            <span className="font-semibold">{properties.to}</span> of{' '}
                                            <span className="font-semibold">{properties.total}</span> results
                                        </div>
                                        
                                        <nav className="flex">
                                            {properties.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`px-3 py-2 text-sm font-medium border ${
                                                        link.active
                                                            ? 'z-10 bg-primary border-primary text-white'
                                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                    } ${index === 0 ? 'rounded-l-lg' : ''} ${
                                                        index === properties.links.length - 1 ? 'rounded-r-lg' : 'border-l-0'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-16 bg-white rounded-xl shadow-soft border border-gray-100">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
                            <p className="text-gray-600 max-w-md mx-auto mb-6">
                                {Object.values(filters).some(v => v && v !== 'all') 
                                    ? 'Try adjusting your search filters to find what you\'re looking for.' 
                                    : 'Get started by adding your first property.'}
                            </p>
                            {canAddProperty && (
                                <PrimaryButton onClick={openCreateModal}>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Your First Property
                                </PrimaryButton>
                            )}
                        </div>
                    )}

                    {/* Image Guidelines */}
                    <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Image Guidelines
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-8 h-4 bg-blue-200 rounded"></div>
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium text-blue-800">Wide Format</p>
                                    <p className="text-sm text-blue-700">Use 2:1 ratio images (width = height × 2)</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium text-blue-800">High Quality</p>
                                    <p className="text-sm text-blue-700">Minimum 800×400 pixels recommended</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium text-blue-800">Direct URLs</p>
                                    <p className="text-sm text-blue-700">Use direct image links ending in .jpg, .png</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Property Modal */}
            {(showCreateModal || showEditModal) && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-soft max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-dark">
                                    {showEditModal ? 'Edit Property' : 'Add New Property'}
                                </h2>
                                <button
                                    onClick={closeModals}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={submitForm} className="space-y-8">
                                {/* Image Section */}
                                <div className="border-b border-gray-200 pb-8">
                                    <h3 className="text-lg font-semibold text-dark mb-6">Property Image</h3>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Image Preview */}
                                        <div>
                                            <InputLabel value="Image Preview" className="text-dark font-medium mb-4" />
                                            <div className="relative">
                                                <div className="aspect-[2/1] w-full max-w-md mx-auto overflow-hidden rounded-lg border-2 border-gray-200">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Property preview"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop';
                                                        }}
                                                    />
                                                </div>
                                                <p className="text-sm text-gray-500 mt-2 text-center">
                                                    Wide format (2:1 ratio) recommended for best display
                                                </p>
                                            </div>
                                        </div>

                                        {/* Image Input & Suggestions */}
                                        <div className="space-y-6">
                                            <div>
                                                <InputLabel htmlFor="image" value="Image URL" className="text-dark font-medium mb-2" />
                                                <TextInput
                                                    id="image"
                                                    type="url"
                                                    value={data.image}
                                                    onChange={handleImageChange}
                                                    className="block w-full border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
                                                    placeholder="https://example.com/image.jpg"
                                                    required
                                                />
                                                <InputError message={errors.image} className="mt-2" />
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Enter a direct image URL. Wide format (2:1 ratio) recommended.
                                                </p>
                                            </div>

                                            {/* Image Suggestions */}
                                            <div>
                                                <div className="flex justify-between items-center mb-3">
                                                    <InputLabel value="Suggested Images" className="text-dark font-medium" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowImageSuggestions(!showImageSuggestions)}
                                                        className="text-sm text-primary hover:text-primary-dark"
                                                    >
                                                        {showImageSuggestions ? 'Hide' : 'Show'} suggestions
                                                    </button>
                                                </div>
                                                
                                                {showImageSuggestions && (
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {imageSuggestions.map((url, index) => (
                                                            <button
                                                                key={index}
                                                                type="button"
                                                                onClick={() => selectImageSuggestion(url)}
                                                                className="aspect-[2/1] overflow-hidden rounded border border-gray-200 hover:border-primary transition-colors"
                                                            >
                                                                <img
                                                                    src={url}
                                                                    alt={`Suggestion ${index + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                                <p className="mt-2 text-xs text-gray-500">
                                                    These are wide format images suitable for {data.type.toLowerCase()} properties
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Basic Information */}
                                <div className="border-b border-gray-200 pb-8">
                                    <h3 className="text-lg font-semibold text-dark mb-6">Basic Information</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="title" value="Property Title" />
                                            <TextInput
                                                id="title"
                                                type="text"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                className="mt-1 block w-full"
                                                required
                                                placeholder="e.g., Modern Villa with Pool"
                                            />
                                            <InputError message={errors.title} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="type" value="Property Type" />
                                            <select
                                                id="type"
                                                value={data.type}
                                                onChange={(e) => handleTypeChange(e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-lg focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                                required
                                            >
                                                <option value="House">House</option>
                                                <option value="Apartment">Apartment</option>
                                                <option value="Land">Land</option>
                                                <option value="Office">Office</option>
                                            </select>
                                            <InputError message={errors.type} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="price" value="Price (KSh)" />
                                            <TextInput
                                                id="price"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={data.price}
                                                onChange={(e) => setData('price', e.target.value)}
                                                className="mt-1 block w-full"
                                                required
                                                placeholder="e.g., 25000000"
                                            />
                                            <InputError message={errors.price} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="location" value="Location" />
                                            <TextInput
                                                id="location"
                                                type="text"
                                                value={data.location}
                                                onChange={(e) => setData('location', e.target.value)}
                                                className="mt-1 block w-full"
                                                required
                                                placeholder="e.g., Westlands, Nairobi"
                                            />
                                            <InputError message={errors.location} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="size" value="Size (sqm)" />
                                            <TextInput
                                                id="size"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={data.size}
                                                onChange={(e) => setData('size', e.target.value)}
                                                className="mt-1 block w-full"
                                                required
                                                placeholder="e.g., 120"
                                            />
                                            <InputError message={errors.size} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="status" value="Status" />
                                            <select
                                                id="status"
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 rounded-lg focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                                required
                                            >
                                                <option value="For Sale">For Sale</option>
                                                <option value="For Rent">For Rent</option>
                                            </select>
                                            <InputError message={errors.status} className="mt-2" />
                                        </div>

                                        {owners && owners.length > 0 && (
                                            <div className="md:col-span-2">
                                                <InputLabel htmlFor="owner_id" value="Property Owner (Optional)" />
                                                <select
                                                    id="owner_id"
                                                    value={data.owner_id}
                                                    onChange={(e) => setData('owner_id', e.target.value)}
                                                    className="mt-1 block w-full border-gray-300 rounded-lg focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                                >
                                                    <option value="">Select Owner</option>
                                                    {owners.map((owner) => (
                                                        <option key={owner.id} value={owner.id}>
                                                            {owner.name} - {owner.email}
                                                        </option>
                                                    ))}
                                                </select>
                                                <InputError message={errors.owner_id} className="mt-2" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-lg font-semibold text-dark mb-4">Description</h3>
                                    <div>
                                        <InputLabel htmlFor="description" value="Property Description" />
                                        <textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows="6"
                                            className="mt-1 block w-full border-gray-300 rounded-lg focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                            placeholder="Describe the property features, amenities, location advantages, etc."
                                            maxLength="2000"
                                        />
                                        <div className="mt-1 flex justify-between text-sm text-gray-500">
                                            <span>Max 2000 characters</span>
                                            <span>{data.description.length}/2000</span>
                                        </div>
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                                    <SecondaryButton
                                        type="button"
                                        onClick={closeModals}
                                    >
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                {showEditModal ? 'Updating...' : 'Creating...'}
                                            </>
                                        ) : (
                                            showEditModal ? 'Update Property' : 'Create Property'
                                        )}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}