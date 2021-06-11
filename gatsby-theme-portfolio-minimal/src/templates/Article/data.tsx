import { IGatsbyImageData } from 'gatsby-plugin-image';

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
    body: string;
}

export interface ArticleTemplateQueryResult {
    allArticle: {
        articles: ArticleTemplateData[];
    };
}

export const ArticleTemplateQuery = `
    query ArticleTemplateQuery {
        allArticle(sort: {fields: date, order: DESC}) {
            articles: nodes {
                banner {
                    alt
                    caption
                    src {
                        childImageSharp {
                            gatsbyImageData(width: 660, height: 400, placeholder: TRACED_SVG)
                        }
                    }
                }
                body
                categories
                date(formatString: "MMMM DD, YYYY")
                description
                id
                keywords
                slug
                title
            }
        }
    }  
`;
