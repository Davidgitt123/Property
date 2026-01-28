import React from 'react';
import Form from './Form';

export default function Create({ auth, property_types, status_types }) {
    return (
        <Form 
            auth={auth} 
            property_types={property_types} 
            status_types={status_types} 
        />
    );
}