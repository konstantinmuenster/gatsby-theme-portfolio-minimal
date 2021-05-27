import { graphql, useStaticQuery } from 'gatsby';
import { SocialProfile } from '../../components/SocialProfiles';
import { ImageObject } from '../../types';

interface HeroSectionQueryResult {
    allHeroJson: {
        sections: {
            description: string;
            email: string;
            image: ImageObject;
            intro: string;
            socialProfiles: {
                from: SocialProfile[];
                showIcons: boolean;
            };
            subtitle: {
                highlight: string;
                prefix: string;
                suffix: string;
            };
            title: string;
        }[];
    };
}

export const useLocalDataSource = (): HeroSectionQueryResult => {
    return useStaticQuery(graphql`
        query HeroSectionQuery {
            allHeroJson {
                sections: nodes {
                    description
                    image {
                        alt
                        src {
                            childImageSharp {
                                gatsbyImageData(width: 48, aspectRatio: 1)
                            }
                        }
                    }
                    intro
                    socialProfiles {
                        from
                        showIcons
                    }
                    subtitle {
                        highlight
                        prefix
                        suffix
                    }
                    title
                }
            }
        }
    `);
};
