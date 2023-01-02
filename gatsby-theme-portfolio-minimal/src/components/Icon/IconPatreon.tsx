import React from 'react';

interface IconPatreonProps {
    color?: string;
}

export function IconPatreon(props: IconPatreonProps): React.ReactElement {
    return (
        <svg
            viewBox="0 0 24 24"
            height="48"
            width="48"
            focusable="false"
            role="img"
            fill={props.color || 'var(--primary-color)'}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="14.508" cy="9.831" r="6.496"></circle>
            <path d="M2.996 3.335H6.17v17.33H2.996z"></path>
        </svg>
    );
}
