import { graphql, useStaticQuery } from 'gatsby';
import { SocialProfile } from '../components/SocialProfiles';
import { AllSettingsQueryResult } from '../types';

export interface SiteMetadata {
    language: string;
    siteUrl: string;
    title: string;
    titleTemplate: string;
    description: string;
    author: string;
    social: {
        [profile in SocialProfile]: string;
    };
}

export function useSiteMetadata(): SiteMetadata {
    const data: AllSettingsQueryResult<{ siteMetadata: SiteMetadata }> = useStaticQuery(query);
    return data.allSettingsJson.settings[0].siteMetadata;
}

export const query = graphql`
    query SiteMetadata {
        allSettingsJson: allContentJson {
            settings: nodes {
                siteMetadata {
                    author
                    description
                    language
                    siteUrl
                    title
                    social {
                        behance
                        github
                        linkedin
                        mail
                        medium
                    }
                    titleTemplate
                }
            }
        }
    }
`;
