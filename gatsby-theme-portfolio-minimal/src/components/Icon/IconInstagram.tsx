import React from 'react';

interface IconInstagramProps {
    color?: string;
}

export function IconInstagram(props: IconInstagramProps): React.ReactElement {
    return (
        <svg
            viewBox="0 0 256 256"
            height="48"
            width="48"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            fill={props.color || 'var(--primary-color)'}
        >
            <path d="M160 128a32 32 0 1 1-32-32 32.037 32.037 0 0 1 32 32Zm68-44v88a56.064 56.064 0 0 1-56 56H84a56.064 56.064 0 0 1-56-56V84a56.064 56.064 0 0 1 56-56h88a56.064 56.064 0 0 1 56 56Zm-52 44a48 48 0 1 0-48 48 48.054 48.054 0 0 0 48-48Zm16-52a12 12 0 1 0-12 12 12 12 0 0 0 12-12Z" />
        </svg>
    );
}
