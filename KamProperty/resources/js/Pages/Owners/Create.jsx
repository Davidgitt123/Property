import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Create({ availableUsers, identificationTypes }) {
    const { language } = useLanguage();
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        alternate_phone: "",
        address: "",
        identification_type: "",
        identification_number: "",
        tax_id: "",
        notes: "",
        user_id: "",
    });

    const translations = {
        en: {
            title: "Add New Owner",
            createOwner: "Create Owner",
            back: "Back to Owners",
            basicInfo: "Basic Information",
            contactInfo: "Contact Information",
            identificationInfo: "Identification Information",
            additionalInfo: "Additional Information",
            name: "Full Name",
            email: "Email Address",
            phone: "Phone Number",
            alternatePhone: "Alternate Phone",
            address: "Address",
            identificationType: "Identification Type",
            selectType: "Select Type",
            identificationNumber: "Identification Number",
            taxId: "Tax ID",
            notes: "Notes",
            linkUserAccount: "Link User Account (Optional)",
            selectUser: "Select User",
            noUsersAvailable: "No users available for linking",
            optional: "Optional",
            required: "Required",
        },
        kh: {
            title: "បន្ថែមម្ចាស់ថ្មី",
            createOwner: "បង្កើតម្ចាស់",
            back: "ត្រឡប់ទៅម្ចាស់",
            basicInfo: "ព័ត៌មានមូលដ្ឋាន",
            contactInfo: "ព័ត៌មានទំនាក់ទំនង",
            identificationInfo: "ព័ត៌មានអត្តសញ្ញាណ",
            additionalInfo: "ព័ត៌មានបន្ថែម",
            name: "ឈ្មោះពេញ",
            email: "អាស័យដ្ឋានអ៊ីមែល",
            phone: "លេខទូរស័ព្ទ",
            alternatePhone: "ទូរស័ព្ទជំនួស",
            address: "អាស័យដ្ឋាន",
            identificationType: "ប្រភេទអត្តសញ្ញាណ",
            selectType: "ជ្រើសរើសប្រភេទ",
            identificationNumber: "លេខអត្តសញ្ញាណ",
            taxId: "លេខអត្តសញ្ញាណពន្ធ",
            notes: "កំណត់ចំណាំ",
            linkUserAccount: "ភ្ជាប់គណនីអ្នកប្រើប្រាស់ (ស្រេចចិត្ត)",
            selectUser: "ជ្រើសរើសអ្នកប្រើប្រាស់",
            noUsersAvailable: "គ្មានអ្នកប្រើប្រាស់ដែលអាចភ្ជាប់បាន",
            optional: "ស្រេចចិត្ត",
            required: "ទាមទារ",
        },
    };

    const t = translations[language];

    const submit = (e) => {
        e.preventDefault();
        post(route("owners.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            {t.title}
                        </h2>
                    </div>
                    <div>
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
                    </div>
                </div>
            }
        >
            <Head title={t.title} />

            <div className="max-w-4xl mx-auto">
                <form onSubmit={submit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                            {t.basicInfo}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="name"
                                    value={t.name}
                                    required
                                />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="email"
                                    value={t.email}
                                    required
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                            {t.contactInfo}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1">
                                <InputLabel htmlFor="phone" value={t.phone} />
                                <TextInput
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="alternate_phone"
                                    value={t.alternatePhone}
                                />
                                <TextInput
                                    id="alternate_phone"
                                    type="tel"
                                    value={data.alternate_phone}
                                    onChange={(e) =>
                                        setData(
                                            "alternate_phone",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.alternate_phone}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <InputLabel
                                    htmlFor="address"
                                    value={t.address}
                                />
                                <textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                    rows="3"
                                />
                                <InputError
                                    message={errors.address}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Identification Information */}
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                            {t.identificationInfo}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="identification_type"
                                    value={t.identificationType}
                                />
                                <select
                                    id="identification_type"
                                    value={data.identification_type}
                                    onChange={(e) =>
                                        setData(
                                            "identification_type",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                >
                                    <option value="">{t.selectType}</option>
                                    {Object.entries(identificationTypes).map(
                                        ([key, value]) => (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        )
                                    )}
                                </select>
                                <InputError
                                    message={errors.identification_type}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="identification_number"
                                    value={t.identificationNumber}
                                />
                                <TextInput
                                    id="identification_number"
                                    type="text"
                                    value={data.identification_number}
                                    onChange={(e) =>
                                        setData(
                                            "identification_number",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.identification_number}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-1">
                                <InputLabel htmlFor="tax_id" value={t.taxId} />
                                <TextInput
                                    id="tax_id"
                                    type="text"
                                    value={data.tax_id}
                                    onChange={(e) =>
                                        setData("tax_id", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    message={errors.tax_id}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Link User Account */}
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                            {t.linkUserAccount}
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <InputLabel
                                    htmlFor="user_id"
                                    value={t.selectUser}
                                />
                                <select
                                    id="user_id"
                                    value={data.user_id}
                                    onChange={(e) =>
                                        setData("user_id", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                >
                                    <option value="">{t.selectUser}</option>
                                    {availableUsers.length > 0 ? (
                                        availableUsers.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name} ({user.email})
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>
                                            {t.noUsersAvailable}
                                        </option>
                                    )}
                                </select>
                                <p className="mt-1 text-sm text-gray-500">
                                    {t.optional}:{" "}
                                    {t.linkUserAccount.toLowerCase()}
                                </p>
                                <InputError
                                    message={errors.user_id}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 pb-3 border-b border-gray-200">
                            {t.additionalInfo}
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <InputLabel htmlFor="notes" value={t.notes} />
                                <textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                                    rows="4"
                                />
                                <InputError
                                    message={errors.notes}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-4">
                        <Link href={route("owners.index")}>
                            <SecondaryButton type="button">
                                {t.back}
                            </SecondaryButton>
                        </Link>
                        <PrimaryButton type="submit" disabled={processing}>
                            {processing ? (
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                            ) : null}
                            {t.createOwner}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
