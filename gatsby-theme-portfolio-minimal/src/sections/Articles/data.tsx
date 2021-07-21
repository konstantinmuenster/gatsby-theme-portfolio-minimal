import { graphql, useStaticQuery } from 'gatsby';

interface MediumArticle {
    author: string;
    categories: string[];
    content: string;
    description: string;
    link: string;
    pubDate: string;
    thumbnail: string;
    title: string;
}

interface MediumFeedData {
    feed: Record<string, unknown>;
    items: MediumArticle[];
}

interface ArticlePreviewQueryResult {
    allArticle: {
        articles: {
            categories: string[];
            date: string;
            slug: string;
            title: string;
            readingTime: {
                text: string;
            };
        }[];
    };
}

export async function useMediumFeed(profileUrl: string): Promise<MediumArticle[]> {
    let mediumArticleList: MediumArticle[] = [];
    const feedUrl = constructMediumFeedUrl(profileUrl);

    try {
        const res = await fetch(feedUrl, { headers: { Accept: 'application/json' } });
        const data = (await res.json()) as MediumFeedData;
        // The Medium RSS feed provides not only articles but comments as well. Here, we filter
        // for items that have at least one category. This is our trivial approach to select
        // only articles (because comments can't have any categories) ¯\_(ツ)_/¯
        const dataWithArticlesOnly = data.items.filter((item) => item.categories.length !== 0);
        mediumArticleList = [...dataWithArticlesOnly];
    } catch (error) {
        console.warn('Fetching Medium Feed failed.', error);
    }

    return mediumArticleList;
}

function constructMediumFeedUrl(profileUrl: string): string {
    const RSS_2_JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';

    // Remove trailing slashes from mediumProfile, append /feed, and make it URL friendly
    return RSS_2_JSON_API + encodeURIComponent(profileUrl.replace(/\/+$/, '') + '/feed');
}

export const useLocalDataSource = (): ArticlePreviewQueryResult => {
    return useStaticQuery(graphql`
        query ArticlePreviewQuery {
            allArticle {
                articles: nodes {
                    categories
                    date(formatString: "YYYY-MM-DD HH:mm:ss")
                    slug
                    title
                    readingTime {
                        text
                    }
                }
            }
        }
    `);
};
