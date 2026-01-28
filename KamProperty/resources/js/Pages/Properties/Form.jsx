import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function Form({ auth, property = null, property_types, status_types }) {
    const isEditing = !!property;
    
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: property?.title || '',
        type: property?.type || 'House',
        price: property?.price || '',
        location: property?.location || '',
        size: property?.size || '',
        description: property?.description || '',
        status: property?.status || 'For Sale',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(property?.image_url || null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            put(route('properties.update', property.id));
        } else {
            post(route('properties.store'));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {isEditing ? 'Edit Property' : 'Add New Property'}
                </h2>
            }
        >
            <Head title={isEditing ? 'Edit Property' : 'Add Property'} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-8">
                                {/* Image Upload */}
                                <div>
                                    <InputLabel htmlFor="image" value="Property Image" />
                                    <div className="mt-2 flex items-center space-x-6">
                                        <div className="shrink-0">
                                            {imagePreview ? (
                                                <img
                                                    className="h-32 w-48 object-cover rounded-lg"
                                                    src={imagePreview}
                                                    alt="Property preview"
                                                />
                                            ) : (
                                                <div className="h-32 w-48 bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <label className="block">
                                            <span className="sr-only">Choose property image</span>
                                            <input
                                                type="file"
                                                id="image"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-full file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-indigo-50 file:text-indigo-700
                                                    hover:file:bg-indigo-100"
                                            />
                                        </label>
                                    </div>
                                    <InputError message={errors.image} className="mt-2" />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Upload a high-quality image of the property (Max: 2MB)
                                    </p>
                                </div>

                                {/* Basic Information */}
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
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="type" value="Property Type" />
                                        <select
                                            id="type"
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            required
                                        >
                                            {property_types.map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
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
                                        />
                                        <InputError message={errors.size} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="status" value="Status" />
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            required
                                        >
                                            {status_types.map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <InputLabel htmlFor="description" value="Description" />
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows="6"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* Form Actions */}
                                <div className="flex items-center justify-end space-x-4">
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => router.visit(route('properties.index'))}
                                    >
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton disabled={processing}>
                                        {isEditing ? 'Update Property' : 'Create Property'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}