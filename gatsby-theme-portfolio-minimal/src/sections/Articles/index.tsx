import React from 'react';
import { useStaticQuery } from 'gatsby';
import { Section } from '../../components/Section';
import { Slider } from '../../components/Slider';
import { AllSocialProfilesQueryResult, query } from '../../components/SocialProfiles';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import * as classes from './style.module.css';

enum ArticleSource {
    Medium = 'medium',
}

interface Article {
    category: string;
    title: string;
    publishedAt: Date;
    link: string;
}

interface MediumFeedData {
    feed: Record<string, unknown>;
    items: {
        author: string;
        categories: string[];
        content: string;
        description: string;
        link: string;
        pubDate: string;
        thumbnail: string;
        title: string;
    }[];
}

interface ArticlesSectionProps {
    anchor: string;
    heading?: string;
    sources: ArticleSource[];
    maxArticles?: number;
}

export function ArticlesSection(props: ArticlesSectionProps): React.ReactElement {
    const MAX_ARTICLES = props.maxArticles || 3;
    const [articles, setArticles] = React.useState<Article[]>([]);

    // MEDIUM FEED INTEGRATION
    // If "Medium" is set as source in the list of sources, we do the following:
    // 1. Construct a Medium RSS feed link with the given Medium profile from socialProfiles.json
    // 2. Fetch all articles, comments, etc. from the RSS feed
    // 3. Filter for all feed items that have at least 1 category, i.e. is an actual article, not a comment
    // 4. Map all articles to the Article data structure
    // 5. Take the x latest articles based on MAX_ARTICLES setting
    // 6. Display them :)
    if (props.sources.map((i) => i.toLowerCase()).includes(ArticleSource.Medium)) {
        const data: AllSocialProfilesQueryResult = useStaticQuery(query);
        const encodedMediumFeedUrl = constructMediumFeedUrl(data);
        React.useEffect(() => {
            (async function fetchMediumArticles() {
                try {
                    const res = await fetch(encodedMediumFeedUrl, { headers: { Accept: 'application/json' } });
                    const data = (await res.json()) as MediumFeedData;
                    const articleList = data.items
                        .filter((item) => item.categories.length !== 0)
                        .map((item) => {
                            return {
                                category: item.categories[0],
                                title: item.title,
                                publishedAt: new Date(item.pubDate),
                                link: item.link,
                            } as Article;
                        })
                        .slice(0, MAX_ARTICLES);
                    setArticles(articleList);
                } catch (error) {
                    console.warn('Fetching Medium RSS Feed failed', error);
                }
            })();
        }, [encodedMediumFeedUrl, data]);
    }

    const ArticleSkeletonList = [...Array(MAX_ARTICLES)].map((card, key) => {
        return (
            <div key={key} className={classes.Card}>
                <SkeletonLoader
                    style={{
                        height: '1.5rem',
                        marginBottom: '.5rem',
                        background: 'var(--tertiary-color)',
                    }}
                />
                <SkeletonLoader style={{ height: '4rem', background: 'var(--tertiary-color)' }} />
                <SkeletonLoader
                    style={{
                        height: '.75rem',
                        width: '50%',
                        marginTop: '.5rem',
                        background: 'var(--tertiary-color)',
                    }}
                />
            </div>
        );
    });

    return (
        <Section anchor={props.anchor} heading={props.heading}>
            <Slider>
                {articles.length === 0
                    ? ArticleSkeletonList
                    : articles.map((article, key) => {
                          return (
                              <a
                                  key={key}
                                  href={article.link}
                                  target="_blank"
                                  rel="nofollow noopener noreferrer"
                                  title={article.title}
                                  aria-label={article.title}
                              >
                                  <article className={classes.Card}>
                                      <span className={classes.Category}>
                                          <u>{article.category}</u>
                                      </span>
                                      <h4 className={classes.Title}>{article.title}</h4>
                                      <span className={classes.Date}>{formatDate(article.publishedAt)}</span>
                                  </article>
                              </a>
                          );
                      })}
            </Slider>
        </Section>
    );
}

function constructMediumFeedUrl(queryData: AllSocialProfilesQueryResult): string {
    const RSS_2_JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';

    // Extract Medium Profiles from socialProfiles.json
    const mediumProfileList = queryData.allSocialProfiles.nodes.filter((item) => item.id === ArticleSource.Medium);
    if (mediumProfileList.length > 1) {
        console.warn('Multiple Medium Profiles defined in socialProfiles.json. Please check if correct one is used.');
    } else if (mediumProfileList.length === 0) {
        throw new Error('No Medium Profile is defined in socialProfiles.json');
    }

    // Remove trailing slashes from mediumProfile, append /feed, and make it URL friendly
    return RSS_2_JSON_API + encodeURIComponent(mediumProfileList[0].url.replace(/\/+$/, '') + '/feed');
}

function formatDate(date: Date): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
