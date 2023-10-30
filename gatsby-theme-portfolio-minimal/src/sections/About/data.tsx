import { graphql, useStaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

interface AboutSectionQueryResult {
    allFile: {
        aboutFiles: {
            name: string;
            relativePath: string;
            section: {
                frontmatter: {
                    imageAlt?: string;
                    imageSrc?: {
                        childImageSharp: {
                            gatsbyImageData: IGatsbyImageData;
                        };
                    };
                };
                html: string;
            }[];
        }[];
    };
}

export const useLocalDataSource = (): AboutSectionQueryResult => {
    return useStaticQuery(graphql`
        query AboutByFilename {
            allFile(
                filter: { childMarkdownRemark: { id: { ne: null } }, relativePath: { regex: "/sections/about/" } }
            ) {
                aboutFiles: nodes {
                    name
                    relativePath
                    section: children {
                        ... on MarkdownRemark {
                            frontmatter {
                                imageAlt
                                imageSrc {
                                    childImageSharp {
                                        gatsbyImageData(width: 400)
                                    }
                                }
                            }
                            html
                        }
                    }
                }
            }
        }
    `);
};
