import { IGatsbyImageData } from 'gatsby-plugin-image';
import * as query from './query';

export interface ArticleTemplateData {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    date: string;
    banner: {
        alt: string | null;
        src: {
            childImageSharp: {
                gatsbyImageData: IGatsbyImageData;
            };
        } | null;
        caption: string | null;
    };
    categories: string[];
    keywords: string[] | null;
    readingTime: {
        text: string;
    };
    body: string;
}

// Since we use the query in gatsby-node files we have to store it
// in a separate JavaScript file - otherwise we run into errors
// due to missing transpilation
export const ArticleTemplateQuery = query.ArticleTemplateQuery;
