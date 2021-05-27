import { graphql, useStaticQuery } from 'gatsby';
import { SocialProfile } from '../../components/SocialProfiles';
import { ImageObject } from '../../types';

interface ContactSectionQueryResult {
    allContactJson: {
        sections: {
            description: string;
            email: string;
            image: ImageObject;
            name: string;
            socialProfiles: {
                from: SocialProfile[];
                showIcons: boolean;
            };
        }[];
    };
}

export const useLocalDataSource = (): ContactSectionQueryResult => {
    return useStaticQuery(graphql`
        query ContactSectionQuery {
            allContactJson {
                sections: nodes {
                    description
                    email
                    image {
                        alt
                        src {
                            childImageSharp {
                                gatsbyImageData(width: 140)
                            }
                        }
                    }
                    name
                    socialProfiles {
                        from
                        showIcons
                    }
                }
            }
        }
    `);
};
