import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface AllSettingsQueryResult<T> {
    allSettingsJson: {
        settings: T[];
    };
}

export interface ImageObject {
    alt: string;
    src: {
        childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
        };
    };
}

export interface PageSection {
    sectionId: string;
    heading?: string;
}
