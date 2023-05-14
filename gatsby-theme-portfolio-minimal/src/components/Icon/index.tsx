import React from 'react';
import { IconBehance } from './IconBehance';
import { IconExternal } from './IconExternal';
import { IconGithub } from './IconGithub';
import { IconHashnode } from './IconHashnode';
import { IconLinkedIn } from './IconLinkedIn';
import { IconMail } from './IconMail';
import { IconMedium } from './IconMedium';
import { IconTwitter } from './IconTwitter';
import { IconMastodon } from './IconMastodon';
import { IconBuyMeACoffee } from './IconBuyMeACoffee';
import { IconDevTo } from './IconDevTo';
import { IconDiscord } from './IconDiscord';
import { IconDribble } from './IconDribble';
import { IconGitlab } from './IconGitlab';
import { IconGoodreads } from './IconGoodreads';
import { IconInstagram } from './IconInstagram';
import { IconPatreon } from './IconPatreon';
import { IconReddit } from './IconReddit';
import { IconStackOverflow } from './IconStackOverflow';
import { IconTwitch } from './IconTwitch';
import { IconYouTube } from './IconYouTube';
import { IconUntappd } from './IconUntappd';
import { IconFacebook } from './IconFacebook';

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
        case 'twitter':
            return <IconTwitter color={props.color} />;
        case 'mastodon':
            return <IconMastodon color={props.color} />;
        case 'hashnode':
            return <IconHashnode color={props.color} />;
        case 'buymeacoffee':
            return <IconBuyMeACoffee color={props.color} />;
        case 'devto':
            return <IconDevTo color={props.color} />;
        case 'discord':
            return <IconDiscord color={props.color} />;
        case 'dribble':
            return <IconDribble color={props.color} />;
        case 'gitlab':
            return <IconGitlab color={props.color} />;
        case 'goodreads':
            return <IconGoodreads color={props.color} />;
        case 'instagram':
            return <IconInstagram color={props.color} />;
        case 'patreon':
            return <IconPatreon color={props.color} />;
        case 'reddit':
            return <IconReddit color={props.color} />;
        case 'stackoverflow':
            return <IconStackOverflow color={props.color} />;
        case 'twitch':
            return <IconTwitch color={props.color} />;
        case 'youtube':
            return <IconYouTube color={props.color} />;
        case 'untappd':
            return <IconUntappd color={props.color} />;
        case 'facebook':
            return <IconFacebook color={props.color} />;
        default:
            return null;
    }
}
