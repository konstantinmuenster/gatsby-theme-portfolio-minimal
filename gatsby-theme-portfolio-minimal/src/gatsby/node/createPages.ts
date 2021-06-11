import path from 'path';
import { CreatePagesArgs } from 'gatsby';
import { ArticleTemplateQueryResult, ArticleTemplateQuery } from '../../templates/Article/data';
import { ThemeOptions } from '../gatsby-config';

export async function createPages(
    { graphql, actions, reporter }: CreatePagesArgs,
    options: ThemeOptions,
): Promise<void> {
    const templateDir = path.join(__dirname, '../', '../', '../', 'src', 'templates');

    const response = await graphql(ArticleTemplateQuery);
    const data = response.data;

    if (!data && response.errors) {
        throw new Error(`Error while fetching article data, ${response.errors}`);
    } else if (!options.blogSettings || !options.blogSettings.path) {
        throw new Error(`No path for ArticleListing page in gatsby-config specified`);
    }

    const articlesQueryResult = data as ArticleTemplateQueryResult;

    // Create ArticleListing page
    const articleListingPageSlug = options.blogSettings.path.replace(/\/\/+/g, '/'); // remove duplicate slashes
    reporter.info(`Creating ArticleListing page under ${articleListingPageSlug}`);
    actions.createPage({
        path: articleListingPageSlug,
        component: path.resolve(templateDir, 'ArticleListing', 'index.tsx'),
        context: {
            articles: articlesQueryResult.allArticle.articles,
        },
    });

    // Create pages for each individual Article
    articlesQueryResult.allArticle.articles.forEach((article) => {
        reporter.info(`Creating Article page under ${article.slug}`);
        actions.createPage({
            path: article.slug,
            component: path.resolve(templateDir, 'Article', 'index.tsx'),
            context: {
                article: article,
            },
        });
    });
}
