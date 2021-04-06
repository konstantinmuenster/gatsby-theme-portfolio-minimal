import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Icon } from '../Icon';
import * as classes from './style.module.css';

export enum SocialProfile {
    Behance = 'behance',
    Github = 'github',
    Medium = 'medium',
    Mail = 'mail',
    LinkedIn = 'linkedin',
}

interface AllSocialProfilesQueryResult {
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
        <div className={classes.SlideContainer}>
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
                    >
                        {(props.withIcon || false) && <Icon name={profile.id} />} {profile.displayName}
                    </a>
                );
            })}
        </div>
    );
}

const query = graphql`
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
