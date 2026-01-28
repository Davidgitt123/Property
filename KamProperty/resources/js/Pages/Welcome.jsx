import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Welcome() {
    return (
        <GuestLayout>
            <Head title="Welcome to KamProperty" />
            
            <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                                <div className="sm:text-center lg:text-left">
                                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                        <span className="block">Find Your</span>
                                        <span className="block text-indigo-600">Dream Property</span>
                                    </h1>
                                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                        KamProperty helps you find the perfect home, apartment, or office space. 
                                        Browse thousands of properties for sale or rent across the country.
                                    </p>
                                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                        <div className="rounded-md shadow">
                                            <Link
                                                href={route('register')}
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                                            >
                                                Get Started
                                            </Link>
                                        </div>
                                        <div className="mt-3 sm:mt-0 sm:ml-3">
                                            <Link
                                                href={route('login')}
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                                            >
                                                Sign In
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                    
                    {/* Hero Image */}
                    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full w-full flex items-center justify-center">
                                <div className="text-white p-8">
                                    <h2 className="text-3xl font-bold mb-4">Why Choose KamProperty?</h2>
                                    <ul className="space-y-3">
                                        <li className="flex items-center">
                                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Verified Properties
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Expert Agents
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Secure Transactions
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                Everything you need for your property journey
                            </h2>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                                From browsing to closing, we've got you covered.
                            </p>
                        </div>

                        <div className="mt-10">
                            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="text-center">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-6 text-lg font-medium text-gray-900">Wide Selection</h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        Thousands of properties across all categories
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-6 text-lg font-medium text-gray-900">Verified Listings</h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        All properties are thoroughly verified
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-6 text-lg font-medium text-gray-900">Expert Agents</h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        Professional guidance every step of the way
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-6 text-lg font-medium text-gray-900">Secure Payments</h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        Safe and secure transaction process
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-indigo-700">
                    <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            <span className="block">Ready to find your perfect property?</span>
                        </h2>
                        <p className="mt-4 text-lg leading-6 text-indigo-200">
                            Join thousands of satisfied customers who found their dream home through KamProperty.
                        </p>
                        <Link
                            href={route('register')}
                            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
                        >
                            Sign up for free
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}