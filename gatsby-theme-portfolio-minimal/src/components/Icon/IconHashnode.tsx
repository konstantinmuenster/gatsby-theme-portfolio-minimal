import React from 'react';

interface IconHashnodeProps {
    color?: string;
}

export function IconHashnode(props: IconHashnodeProps): React.ReactElement {
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
            <path d="m22.351 8.019-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z"></path>
        </svg>
    );
}
