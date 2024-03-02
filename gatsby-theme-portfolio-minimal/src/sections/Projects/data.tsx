import { graphql, useStaticQuery } from 'gatsby';
import { Project } from '../../components/Project';

interface ProjectsSectionQueryResult {
    allFile: {
        projectFiles: {
            name: string;
            relativePath: string;
            section: {
                button: {
                    label: string;
                    url: string;
                    visible: boolean;
                };
                projects: Project[];
            }[];
        }[];
    };
}

export const useLocalDataSource = (): ProjectsSectionQueryResult => {
    return useStaticQuery(graphql`
        query ProjectsByFilename {
            allFile(filter: { childProjectsJson: { id: { ne: null } } }) {
                projectFiles: nodes {
                    name
                    relativePath
                    section: children {
                        ... on ProjectsJson {
                            button {
                                label
                                url
                                visible
                            }
                            projects {
                                category
                                description
                                image {
                                    alt
                                    linkTo
                                    src {
                                        childImageSharp {
                                            gatsbyImageData(width: 400)
                                        }
                                    }
                                    objectFit
                                }
                                links {
                                    type
                                    url
                                }
                                tags
                                title
                                visible
                            }
                        }
                    }
                }
            }
        }
    `);
};
