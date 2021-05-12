import React from 'react';
import { useStaticQuery } from 'gatsby';
import { motion, useAnimation } from 'framer-motion';
import { Section } from '../../components/Section';
import { Slider } from '../../components/Slider';
import { AllSocialProfilesQueryResult, query } from '../../components/SocialProfiles';
import { Article, ArticleSkeleton } from '../../components/Article';
import { useGlobalState } from '../../context';
import { fetchMediumFeed } from '../../utils/fetchMediumFeed';

enum ArticleSource {
    Medium = 'medium',
}

interface ArticleSourceConfiguration {
    [ArticleSource.Medium]?: {
        profileUrl: string;
    };
}

interface ArticlesSectionProps {
    anchor: string;
    heading?: string;
    sources: ArticleSource[];
    maxArticles?: number;
}

export function ArticlesSection(props: ArticlesSectionProps): React.ReactElement {
    const { globalState } = useGlobalState();

    const MAX_ARTICLES = props.maxArticles || 3;
    const [articles, setArticles] = React.useState<Article[]>([]);
    const [sectionRevealed, setSectionRevealed] = React.useState<boolean>(false);

    const configuration = validateAndConfigureSources(props.sources);

    async function collectArticlesFromSources(configuration: ArticleSourceConfiguration): Promise<Article[]> {
        const mediumConfig = configuration[ArticleSource.Medium];
        const articleList: Article[] = [];

        if (mediumConfig !== undefined) {
            const mediumArticles = await fetchMediumFeed(mediumConfig.profileUrl);
            if (mediumArticles.length > 0) {
                mediumArticles.forEach((article) => {
                    articleList.push({
                        category: article.categories[0],
                        title: article.title,
                        publishedAt: new Date(article.pubDate),
                        link: article.link,
                    });
                });
            }
        }

        return articleList;
    }

    const AnimatedSection = motion(Section);
    const sectionControls = useAnimation();
    async function animateSection(): Promise<void> {
        await sectionControls.start({ opacity: 1, y: 0, transition: { delay: 1 } });
        setSectionRevealed(true);
    }

    React.useEffect(() => {
        if (globalState.splashScreenDone) {
            (async function () {
                await animateSection();
                setArticles(await collectArticlesFromSources(configuration));
            })();
        }
    }, [globalState.splashScreenDone]);

    return (
        <AnimatedSection
            anchor={props.anchor}
            heading={props.heading}
            initial={!sectionRevealed ? { opacity: 0, y: 20 } : undefined}
            animate={sectionControls}
        >
            <Slider>
                {articles.length > 0
                    ? articles.slice(0, MAX_ARTICLES).map((article, key) => {
                          return <Article key={key} data={article} />;
                      })
                    : [...Array(MAX_ARTICLES)].map((skeleton, key) => {
                          return <ArticleSkeleton key={key} />;
                      })}
            </Slider>
        </AnimatedSection>
    );
}

// validateAndConfigureSources: Sources for articles can be defined as props (e.g. sources=["Medium"])
// Currently, only Medium can be used as a source but it is thinkable to extend this approach to other
// sources (e.g. an integrated Markdown blog). To collect all articles from the source, there is a
// specific configuration needed for each source type. For example, to collect articles from Medium,
// we need the profile URL. This function is responsible for validating that at least one source is
// defined. It than adds the needed configuration properties to each source and returns the config.

function validateAndConfigureSources(sources: ArticleSource[]): ArticleSourceConfiguration {
    const configuration: ArticleSourceConfiguration = {};

    if (sources.length > 0) {
        if (sources.map((i) => i.toLowerCase()).includes(ArticleSource.Medium)) {
            const data: AllSocialProfilesQueryResult = useStaticQuery(query);
            const mediumProfileList = data.allSocialProfiles.nodes.filter((item) => item.id === ArticleSource.Medium);
            if (mediumProfileList.length === 0) {
                throw new Error('No Medium Profile is defined in socialProfiles.json');
            } else {
                configuration[ArticleSource.Medium] = { profileUrl: mediumProfileList[0].url };
            }
        }
    } else {
        throw new Error('No Source for Articles defined.');
    }

    return configuration;
}
