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
            heroPhoto: ImageObject;
            socialProfiles: {
                from: SocialProfile[];
                showIcons: boolean;
            };
            calendly: {
                label: string;
                username: string;
                colorText: string;
                colorButton: string;
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
                    heroPhoto {
                        src {
                            childImageSharp {
                                gatsbyImageData(aspectRatio: 1)
                            }
                        }
                        alt
                    }
                    image {
                        alt
                        src {
                            childImageSharp {
                                gatsbyImageData(width: 48, aspectRatio: 1)
                            }
                        }
                        objectFit
                    }
                    intro
                    socialProfiles {
                        from
                        showIcons
                    }
                    calendly {
                        label
                        username
                        colorText
                        colorButton
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
