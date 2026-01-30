// In resources/js/Components/NavLink.jsx
import React from "react";
import { Link } from "@inertiajs/react";

export default function NavLink({
    href,
    active,
    className = "",
    activeClassName = "",
    inactiveClassName = "",
    children,
    ...props
}) {
    const baseClasses =
        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none";

    const classes = active
        ? `${baseClasses} ${
              activeClassName ||
              "border-primary text-gray-900 focus:border-primary-dark"
          }`
        : `${baseClasses} ${
              inactiveClassName ||
              "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300"
          }`;

    return (
        <Link href={href} className={`${classes} ${className}`} {...props}>
            {children}
        </Link>
    );
}
