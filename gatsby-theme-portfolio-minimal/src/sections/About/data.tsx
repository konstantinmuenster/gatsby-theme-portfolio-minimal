import { graphql, useStaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

interface AboutSectionQueryResult {
    allAboutMarkdown: {
        sections: {
            frontmatter: {
                imageAlt: string;
                imageSrc: {
                    childImageSharp: {
                        gatsbyImageData: IGatsbyImageData;
                    };
                };
            };
            html: string;
        }[];
    };
}

export const useLocalDataSource = (): AboutSectionQueryResult => {
    return useStaticQuery(graphql`
        query AboutSectionQuery {
            allAboutMarkdown: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/sections/about/" } }) {
                sections: nodes {
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
    `);
};
