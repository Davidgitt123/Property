import React from 'react';
import Form from './Form';

export default function Edit({ auth, property, property_types, status_types }) {
    return (
        <Form 
            auth={auth} 
            property={property} 
            property_types={property_types} 
            status_types={status_types} 
        />
    );
}