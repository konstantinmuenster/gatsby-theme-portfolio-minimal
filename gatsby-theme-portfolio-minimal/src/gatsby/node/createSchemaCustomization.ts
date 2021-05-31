import { GatsbyNodeHelpers } from '../../types';

export function createSchemaCustomization({ actions }: GatsbyNodeHelpers): void {
    actions.createTypes(`
    type BannerImage {
        src: File @fileByRelativePath
        alt: String
        caption: String
    }
    interface Article implements Node {
        id: ID!
        slug: String!
        title: String!
        description: String
        date: Date! @dateformat
        author: String!
        body: String!
        excerpt: String
        banner: BannerImage
        categories: [String!]!
        keywords: [String!]
    }
    type ArticleMarkdown implements Node & Article @childOf(type: "MarkdownRemark") {
        id: ID!
        slug: String!
        title: String!
        description: String
        date: Date! @dateformat
        author: String!
        body: String!
        excerpt: String
        banner: BannerImage
        categories: [String!]!
        keywords: [String!]
    }
  `);
}
