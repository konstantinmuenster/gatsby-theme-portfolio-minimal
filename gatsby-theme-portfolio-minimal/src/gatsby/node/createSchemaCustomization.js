module.exports = ({ actions }) => {
    actions.createTypes(`
    type BannerImage {
        src: File @fileByRelativePath
        alt: String
        caption: String
    }
    type Image {
        src: File @fileByRelativePath
        alt: String
    }
    type SocialProfiles {
        from: [String!]!
        showIcons: Boolean
    }
    type HeroSubtitle {
        prefix: String
        highlight: String
        suffix: String
    }
    type Interest {
        label: String
        image: Image
    }
    type InterestsButton {
        visible: Boolean
        label: String
        initiallyShownInterests: Int
    }
    type ProjectLink {
        type: String
        url: String
    }
    type Project {
        visible: Boolean
        category: String
        title: String
        description: String
        tags: [String]
        image: Image
        links: [ProjectLink]
    }
    type ProjectButton {
        visible: Boolean
        label: String
        url: String
    }
    type Social {
        behance: String
        github: String
        medium: String
        linkedin: String
        mail: String
    }
    type Logo {
        text: String
    }
    type NavigationItem {
        label: String
        url: String
    }
    type CallToActionButton {
        label: String
        url: String
        openNewTab: Boolean
    }
    type Navigation {
        header: [NavigationItem]
        footer: [NavigationItem]
        ctaButton: CallToActionButton
    }
    type FeatureToggles {
        useDarkModeAsDefault: Boolean
        useDarkModeBasedOnUsersPreference: Boolean
        useCookieBar: Boolean
    }
    type SiteMetadata {
        language: String
        siteUrl: String
        title: String
        titleTemplate: String
        description: String
        author: String
        avatar: File @fileByRelativePath
        bio: String
        social: Social
    }
    type SiteConfiguration {
        logo: Logo
        navigation: Navigation
        featureToggles: FeatureToggles
    }
    type ReadingTimeStats {
        text: String
        minutes: Int
        time: Int
        words: Int
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
        readingTime: ReadingTimeStats
    }
    type ArticleMarkdown implements Node & Article @dontInfer @childOf(type: "MarkdownRemark") {
        id: ID!
        slug: String!
        title: String!
        description: String
        date: Date! @dateformat
        body: String!
        banner: BannerImage
        categories: [String!]!
        keywords: [String!]
        readingTime: ReadingTimeStats
    }
    type MarkdownRemarkFrontmatter {
        imageSrc: File @fileByRelativePath
        imageAlt: String
    }
    type MarkdownRemark implements Node {
        frontmatter: MarkdownRemarkFrontmatter
    }
    type ContactJson implements Node @dontInfer {
        name: String
        email: String
        description: String
        image: Image
        socialProfiles: SocialProfiles
    }
    type HeroJson implements Node @dontInfer {
        intro: String
        image: Image
        title: String
        subtitle: HeroSubtitle
        description: String
        socialProfiles: SocialProfiles
    }
    type InterestsJson implements Node @dontInfer {
        interests: [Interest]
        button: InterestsButton
    }
    type ProjectsJson implements Node @dontInfer {
        projects: [Project]
        button: ProjectButton
    }
    type ContentJson implements Node @dontInfer {
        siteMetadata: SiteMetadata
        siteConfiguration: SiteConfiguration
    }
  `);
};
