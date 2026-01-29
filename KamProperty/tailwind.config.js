import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
         extend: {
            fontFamily: {
                'sans': ['Inter', 'Kantumruy Pro', 'sans-serif'],
                'khmer': ['Moul', 'Kantumruy Pro', 'sans-serif'],
            },
            colors: {
                // Your custom color palette
                'dark': '#132d4c',
                'light': '#ffffff',
                'primary': '#00d9ff',
                'accent': '#fd8a8a',
                // Extend with variations
                'primary-dark': '#00d9ff',
                'primary-light': '#00d9ff',
                'accent-dark': '#fd7272',
                'accent-light': '#fea1a1',
            },
        },
        
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
    ],
};