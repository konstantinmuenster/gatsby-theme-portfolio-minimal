module.exports = ({ actions }) => {
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
        body: String!
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
        body: String!
        banner: BannerImage
        categories: [String!]!
        keywords: [String!]
    }
  `);
};
