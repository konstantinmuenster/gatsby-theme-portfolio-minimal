import { Reporter, Actions, Node } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface AllSettingsQueryResult<T> {
    allSettingsJson: {
        settings: T[];
    };
}

export interface ImageObject {
    alt: string | null;
    src: {
        childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
        };
    } | null;
}

export interface PageSection {
    sectionId: string;
    heading?: string;
}

export interface GatsbyNodeHelpers {
    actions: Actions;
    createContentDigest: (input: unknown) => string;
    createNodeId: (input: string) => string;
    createResolvers: (resolvers: unknown) => void;
    getNode: (id: string) => Node;
    node: Node;
    reporter: Reporter;
}
