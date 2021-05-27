import React from 'react';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { Icon } from '../Icon';
import { Slider } from '../Slider';
import { socialProfileLabels } from './configuration';
import * as classes from './style.module.css';

export enum SocialProfile {
    Behance = 'behance',
    Github = 'github',
    Medium = 'medium',
    Mail = 'mail',
    LinkedIn = 'linkedin',
}

interface SocialProfilesProps {
    from: SocialProfile[];
    showIcon?: boolean;
}

export function SocialProfiles(props: SocialProfilesProps): React.ReactElement {
    const siteMetadata = useSiteMetadata();

    // Enrich the social profile with data from the display name configuration file
    // as well as the site metadata from settings.json
    const shownProfiles = props.from.map((profile) => {
        const normalizedProfileId = profile.toLowerCase() as SocialProfile;
        if (Object.values(SocialProfile).includes(normalizedProfileId)) {
            return {
                id: normalizedProfileId,
                label: socialProfileLabels[normalizedProfileId],
                url: siteMetadata.social[normalizedProfileId],
            };
        } else {
            throw new Error(`Unknown social profile ${profile}.`);
        }
    });

    return (
        <Slider>
            {shownProfiles.map((profile, key) => {
                const completeProfileData = profile.label && profile.url;
                return !completeProfileData ? null : (
                    <a
                        key={key}
                        className={classes.Profile}
                        href={profile.url}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label={profile.label}
                        style={props.showIcon ? { padding: '0.5rem 1.25rem' } : undefined}
                    >
                        {props.showIcon ? <Icon name={profile.id} /> : undefined} {profile.label}
                    </a>
                );
            })}
        </Slider>
    );
}
