import React from 'react';

const RoleSelect = ({ value, onChange, error }) => {
    return (
        <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Register as
            </label>
            <select
                id="role"
                name="role"
                value={value}
                onChange={onChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    error ? 'border-red-500' : ''
                }`}
                required
            >
                <option value="">Select Role</option>
                <option value="user">Property Buyer/Renter</option>
                <option value="agent">Property Agent</option>
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default RoleSelect;