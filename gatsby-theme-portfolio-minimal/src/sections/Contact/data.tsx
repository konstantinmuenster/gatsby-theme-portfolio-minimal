import { graphql, useStaticQuery } from 'gatsby';
import { SocialProfile } from '../../components/SocialProfiles';
import { ImageObject } from '../../types';

interface ContactSectionQueryResult {
    allFile: {
        contactFiles: {
            name: string;
            relativePath: string;
            section: {
                description: string;
                email: string;
                image: ImageObject;
                name: string;
                socialProfiles: {
                    from: SocialProfile[];
                    showIcons: boolean;
                };
            }[];
        }[];
    };
}

export const useLocalDataSource = (): ContactSectionQueryResult => {
    return useStaticQuery(graphql`
        query ContactsByFilename {
            allFile(filter: { childContactJson: { id: { ne: null } } }) {
                contactFiles: nodes {
                    name
                    relativePath
                    section: children {
                        ... on ContactJson {
                            description
                            email
                            image {
                                alt
                                src {
                                    childImageSharp {
                                        gatsbyImageData(width: 140)
                                    }
                                }
                                objectFit
                            }
                            name
                            socialProfiles {
                                from
                                showIcons
                            }
                        }
                    }
                }
            }
        }
    `);
};
