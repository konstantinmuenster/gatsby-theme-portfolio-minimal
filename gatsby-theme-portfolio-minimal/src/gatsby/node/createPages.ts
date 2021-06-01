import path from 'path';
import { CreatePagesArgs } from 'gatsby';
import { ArticleTemplateQueryResult, ArticleTemplateQuery } from '../../templates/Article/data';

export async function createPages({ graphql, actions }: CreatePagesArgs): Promise<void> {
    const templateDir = path.join(__dirname, '../', '../', '../', 'src', 'templates');
    const response = await graphql(ArticleTemplateQuery);
    const data = response.data;

    if (!data && response.errors) {
        throw new Error(`Something went wrong while fetching the articles. ${response.errors}`);
    }

    (data as ArticleTemplateQueryResult).allArticle.articles.forEach((article) => {
        actions.createPage({
            path: article.slug,
            component: path.resolve(templateDir, 'Article', 'index.tsx'),
            context: {
                data: article,
            },
        });
    });
}
