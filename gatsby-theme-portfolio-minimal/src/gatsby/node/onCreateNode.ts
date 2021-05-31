import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import { GatsbyNodeHelpers } from '../../types';
import { ThemeOptions } from '../gatsby-config';
import { Node } from 'gatsby';

interface ArticleNode extends Node {
    frontmatter: {
        title: string;
        description: string;
        date: string;
        author: string;
        banner: {
            src: string;
            alt: string;
            caption: string;
        };
        categories: string[];
        keywords: string[];
    };
}

export function onCreateNode({ node, getNode, actions, createNodeId }: GatsbyNodeHelpers, options: ThemeOptions): void {
    // Check if the processed node is a Markdown file
    if (node.internal.type === 'MarkdownRemark' && node.parent) {
        // Check if the processed Markdown file is stored in the articles directory
        if (/^articles[\/\\]/.test(getNode(node.parent).relativeDirectory as string)) {
            const articleNode = node as ArticleNode;
            // Construct a slug based on the articles folder name
            const pathPrefix = options.blogSettings?.usePathPrefixForArticles ? options.blogSettings.path : '';
            const contentDirectory = options.contentDirectory || path.join('.', 'content');
            const filePath = createFilePath({ node, getNode, basePath: contentDirectory });
            // Since filePath contains sth like "/articles/first-article", we replace the
            // first part (/articles/) through the actual wanted prefix
            const slug = filePath.replace(/^\/articles/g, pathPrefix);

            const nodeFields = {
                slug: slug,
                title: articleNode.frontmatter.title,
                description: articleNode.frontmatter.description,
                date: articleNode.frontmatter.date,
                author: articleNode.frontmatter.author,
                banner: {
                    src: articleNode.frontmatter.banner.src,
                    alt: articleNode.frontmatter.banner.alt,
                    caption: articleNode.frontmatter.banner.caption,
                },
                categories: articleNode.frontmatter.categories,
                keywords: articleNode.frontmatter.keywords,
            };

            actions.createNode({
                ...nodeFields,
                id: createNodeId(`${node.id} >>> ArticleMarkdown`),
                parent: node.id,
                internal: {
                    type: 'ArticleMarkdown',
                    contentDigest: node.internal.contentDigest,
                },
            });
        }
    }
}
