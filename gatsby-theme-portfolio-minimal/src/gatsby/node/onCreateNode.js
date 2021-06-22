const path = require('path');
const slugify = require('slugify');
const readingTime = require('reading-time');
const { createFilePath } = require('gatsby-source-filesystem');

module.exports = ({ node, getNode, actions, createNodeId, reporter }, options) => {
    // Check if the processed node is a Markdown file
    if (node.internal.type === 'MarkdownRemark' && node.parent) {
        // Check if the processed Markdown file is stored in the articles directory
        if (/^articles[\/\\]/.test(getNode(node.parent).relativeDirectory)) {
            const articleNode = node;

            if (!options.blogSettings || !options.blogSettings.path) {
                reporter.error(
                    `blogSettings are not correctly specified in gatsby-config.js. 
                    If articles should be generated based on the articles directory,
                    make sure that settings are correctly set up.`,
                );
                return;
            }

            const nodeFields = {
                slug: createSlugForFolder({ node: articleNode, getNode }, options),
                title: articleNode.frontmatter.title,
                description: articleNode.frontmatter.description,
                date: articleNode.frontmatter.date,
                categories: articleNode.frontmatter.categories,
                keywords: articleNode.frontmatter.keywords,
                readingTime: readingTime(articleNode.rawMarkdownBody),
                banner:
                    articleNode.frontmatter.banner !== undefined
                        ? {
                              src: articleNode.frontmatter.banner.src,
                              alt: articleNode.frontmatter.banner.alt,
                              caption: articleNode.frontmatter.banner.caption,
                          }
                        : null,
            };

            actions.createNode({
                ...nodeFields,
                id: createNodeId(`${node.id} >>> ArticleMarkdown`),
                parent: node.id,
                internal: {
                    type: 'ArticleMarkdown',
                    // We can use the contentDigest hash from the parent
                    // since all content changes in the child are directly
                    // reflected in the parent.
                    contentDigest: node.internal.contentDigest,
                },
            });
        }
    }
};

function createSlugForFolder({ node, getNode }, options) {
    // By default, we use the path prefix option so that we get paths like ../blog/first-article
    const shouldNotUsePathPrefix = options.blogSettings && options.blogSettings.usePathPrefixForArticles === false;
    // Only if the user opts out or the blogSettings are not correctly specified, we switch to no path prefix
    const pathPrefix = shouldNotUsePathPrefix ? '' : options.blogSettings ? options.blogSettings.path : '';
    const contentDirectory = options.contentDirectory || path.join('.', 'content');
    // slug will be calculated based on the directory name where the md file is stored
    const filePath = createFilePath({ node, getNode, basePath: contentDirectory });
    // Since filePath is something like /articles/first-article, we have to remove the /articles/ part first
    const dirName = filePath.replace(/^\/articles/g, '');
    // Then, we can slugify the remaining folder name and can concatenate the pathPrefix
    return pathPrefix + slugify(dirName, { remove: /[*+~.()'"!:@]/g });
}
