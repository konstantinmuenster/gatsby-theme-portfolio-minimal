import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Icon } from '../Icon';
import { Slider } from '../Slider';
import * as classes from './style.module.css';

export enum SocialProfile {
    Behance = 'behance',
    Github = 'github',
    Medium = 'medium',
    Mail = 'mail',
    LinkedIn = 'linkedin',
}

export interface AllSocialProfilesQueryResult {
    allSocialProfiles: {
        nodes: {
            id: string;
            displayName: string;
            url: string;
        }[];
    };
}

interface SocialProfilesProps {
    shownProfiles: SocialProfile[];
    withIcon?: boolean;
}

export function SocialProfiles(props: SocialProfilesProps): React.ReactElement {
    const data: AllSocialProfilesQueryResult = useStaticQuery(query);
    const allProfiles = data.allSocialProfiles.nodes;

    // Enrich shownProfiles with the data that we get from socialProfiles.json
    const shownProfiles = props.shownProfiles.map((profile) => {
        const profileData = allProfiles.find((p) => p.id === profile.toLowerCase());
        return { id: profile, displayName: profileData?.displayName, url: profileData?.url };
    });

    return (
        <Slider>
            {shownProfiles.map((profile, key) => {
                const completeProfileData = profile.displayName && profile.url;
                return !completeProfileData ? null : (
                    <a
                        key={key}
                        className={classes.Profile}
                        href={profile.url}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label={profile.displayName}
                        style={props.withIcon ? { padding: '0.5rem 1.25rem' } : undefined}
                    >
                        {props.withIcon ? <Icon name={profile.id} /> : undefined} {profile.displayName}
                    </a>
                );
            })}
        </Slider>
    );
}

export const query = graphql`
    query SocialProfiles {
        allSocialProfiles {
            nodes {
                id
                displayName
                url
            }
        }
    }
`;
