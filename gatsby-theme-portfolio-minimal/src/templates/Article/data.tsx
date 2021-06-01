import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface ArticleTemplateData {
    slug: string;
    title: string;
    description: string | null;
    author: string;
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
        allArticle {
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
                keywords
                slug
                title
            }
        }
    }  
`;
