import { graphql, useStaticQuery } from 'gatsby';
import { ImageObject } from '../../types';

interface InterestsSectionQueryResult {
    allFile: {
        interestsFiles: {
            name: string;
            relativePath: string;
            section: {
                button: {
                    initiallyShownInterests: number;
                    label: string;
                    visible: boolean;
                };
                interests: {
                    image: ImageObject;
                    label: string;
                }[];
            }[];
        }[];
    };
}

export const useLocalDataSource = (): InterestsSectionQueryResult => {
    return useStaticQuery(graphql`
        query InterestsByFilename {
            allFile(filter: { childInterestsJson: { id: { ne: null } } }) {
                interestsFiles: nodes {
                    name
                    relativePath
                    section: children {
                        ... on InterestsJson {
                            button {
                                initiallyShownInterests
                                label
                                visible
                            }
                            interests {
                                image {
                                    alt
                                    src {
                                        childImageSharp {
                                            gatsbyImageData(width: 20, height: 20)
                                        }
                                    }
                                    objectFit
                                }
                                label
                            }
                        }
                    }
                }
            }
        }
    `);
};
