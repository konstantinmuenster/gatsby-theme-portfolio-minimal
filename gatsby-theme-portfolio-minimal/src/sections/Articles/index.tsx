import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Section } from '../../components/Section';
import { Slider } from '../../components/Slider';
import { Article, ArticleSkeleton } from '../../components/Article';
import { useGlobalState } from '../../context';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { useMediumFeed } from './data';
import { PageSection } from '../../types';
import * as classes from './style.module.css';

enum ArticleSource {
    Medium = 'medium',
}

interface ArticleSourceConfiguration {
    [ArticleSource.Medium]?: {
        profileUrl: string;
    };
}

interface ArticlesSectionProps extends PageSection {
    sources: ArticleSource[];
}

export function ArticlesSection(props: ArticlesSectionProps): React.ReactElement {
    const { globalState } = useGlobalState();
    const [articles, setArticles] = React.useState<Article[]>([]);
    const [sectionRevealed, setSectionRevealed] = React.useState<boolean>(false);

    const configuration = validateAndConfigureSources(props.sources);

    async function collectArticlesFromSources(configuration: ArticleSourceConfiguration): Promise<Article[]> {
        const mediumConfig = configuration[ArticleSource.Medium];
        const articleList: Article[] = [];

        if (mediumConfig !== undefined) {
            const mediumArticles = await useMediumFeed(mediumConfig.profileUrl);
            if (mediumArticles.length > 0) {
                mediumArticles.forEach((article) => {
                    articleList.push({
                        category: article.categories[0],
                        title: article.title,
                        publishedAt: new Date(article.pubDate.replace(/-/g, '/')), // https://stackoverflow.com/a/5646753
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
            anchor={props.sectionId}
            heading={props.heading}
            initial={!sectionRevealed ? { opacity: 0, y: 20 } : undefined}
            animate={sectionControls}
        >
            <Slider additionalClasses={[classes.Articles]}>
                {articles.length > 0
                    ? articles.slice(0, 3).map((article, key) => {
                          return <Article key={key} data={article} />;
                      })
                    : [...Array(3)].map((skeleton, key) => {
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
            const siteMetadata = useSiteMetadata();
            configuration[ArticleSource.Medium] = { profileUrl: siteMetadata.social.medium };
        } else {
            throw new Error('No Source for Articles defined.');
        }
    }

    return configuration;
}
