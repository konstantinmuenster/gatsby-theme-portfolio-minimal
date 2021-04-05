import { Layout } from 'gatsby-plugin-image';

export interface AllSettingsQueryResult<T> {
    allSettings: {
        edges: { node: T }[];
    };
}

export interface AllSettingsQueryResultList<T> {
    allSettings: {
        nodes: T[];
    };
}

export interface ImagesInIconFormatQueryResult {
    allFile: {
        images: {
            name: string;
            ext: string;
            childImageSharp: {
                gatsbyImageData: {
                    layout: Layout;
                    placeholder: {
                        fallback: string;
                    };
                    images: {
                        fallback: {
                            src: string;
                            srcSet: string;
                            sizes: string;
                        };
                        sources: {
                            type: string;
                            srcSet: string;
                            sizes: string;
                        }[];
                    };
                    width: number;
                    height: number;
                };
            };
        }[];
    };
}
