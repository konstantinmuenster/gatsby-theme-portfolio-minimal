import React from 'react';
import { IconBehance } from './IconBehance';
import { IconExternal } from './IconExternal';
import { IconGithub } from './IconGithub';
import { IconLinkedIn } from './IconLinkedIn';
import { IconMail } from './IconMail';
import { IconMedium } from './IconMedium';

interface IconProps {
    name: string;
    color?: string;
}

export function Icon(props: IconProps): React.ReactElement | null {
    switch (props.name.toLowerCase()) {
        case 'external':
            return <IconExternal color={props.color} />;
        case 'behance':
            return <IconBehance color={props.color} />;
        case 'github':
            return <IconGithub color={props.color} />;
        case 'linkedin':
            return <IconLinkedIn color={props.color} />;
        case 'mail':
            return <IconMail color={props.color} />;
        case 'medium':
            return <IconMedium color={props.color} />;
        default:
            return null;
    }
}
