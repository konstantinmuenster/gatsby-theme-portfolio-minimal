const path = require('path');

module.exports = (options) => ({
    siteMetadata: {
        siteUrl: options.siteUrl,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-robots-txt`,
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `json`,
                path: path.join('.', 'content'),
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: path.join('.', 'content', 'images'),
            },
        },
        {
            resolve: `gatsby-transformer-json`,
            options: {
                typeName: ({ node }) => node.name,
            },
        },
        options.siteUrl ? `gatsby-plugin-sitemap` : null,
        options.favicon
            ? {
                  resolve: `gatsby-plugin-manifest`,
                  options: {
                      name: options.manifestSettings.siteName,
                      short_name: options.manifestSettings.shortName,
                      start_url: options.manifestSettings.startUrl,
                      background_color: options.manifestSettings.backgroundColor,
                      theme_color: options.manifestSettings.themeColor,
                      display: options.manifestSettings.display,
                      icon: options.favicon,
                  },
              }
            : null,
        options.googleAnalytics
            ? {
                  resolve: `gatsby-plugin-gdpr-cookies`,
                  options: {
                      googleAnalytics: {
                          trackingId: options.googleAnalytics.trackingId,
                          cookieName: 'gatsby-gdpr-google-analytics',
                          anonymize: options.googleAnalytics.anonymize || true,
                      },
                      environments: options.googleAnalytics.environments || ['production'],
                  },
              }
            : null,
    ].filter((plugin) => plugin !== null),
});
