import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard({ auth, stats }) {
    const user = auth.user;

    const getDashboardContent = () => {
        if (user.is_admin) {  // Changed from isAdmin to is_admin
            return (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Properties</h3>
                            <p className="text-gray-600">Manage all properties in the system</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Users</h3>
                            <p className="text-gray-600">Manage users and agents</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Inquiries</h3>
                            <p className="text-gray-600">View and manage inquiries</p>
                        </div>
                    </div>
                </div>
            );
        }

        if (user.is_agent) {  // Changed from isAgent to is_agent
            return (
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Agent Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">My Properties</h3>
                            <p className="text-gray-600">Manage your listed properties</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Inquiries</h3>
                            <p className="text-gray-600">View property inquiries</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to KamProperty!</h2>
                <p className="text-gray-600 mb-4">Find your dream property from our extensive listings.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Browse Properties</h3>
                        <p className="text-gray-600">Explore available properties for sale or rent</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Inquiries</h3>
                        <p className="text-gray-600">Track your property inquiries</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
                    {(user.is_admin || user.is_agent) && (  // Fixed this check
                        <Link href={route('properties.create')}>
                            <PrimaryButton>+ Add New Property</PrimaryButton>
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Dashboard" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {getDashboardContent()}
                    
                    {/* Quick Stats */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">Properties Listed</p>
                                        <p className="text-lg font-semibold text-gray-700">{stats?.total_properties || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">Active Users</p>
                                        <p className="text-lg font-semibold text-gray-700">{stats?.total_users || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900">Inquiries</p>
                                        <p className="text-lg font-semibold text-gray-700">0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}