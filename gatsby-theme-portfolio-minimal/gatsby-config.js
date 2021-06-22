const path = require('path');

module.exports = (options) => ({
    siteMetadata: options.siteUrl ? { siteUrl: options.siteUrl } : null,
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaults: {
                    quality: 100,
                    placeholder: 'blurred',
                },
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `content`,
                path: options.contentDirectory || path.join('.', 'content'),
            },
        },
        `gatsby-transformer-remark`,
        `gatsby-transformer-sharp`,
        `gatsby-transformer-json`,
        options.siteUrl ? `gatsby-plugin-robots-txt` : null,
        options.siteUrl ? `gatsby-plugin-sitemap` : null,
        options.manifestSettings
            ? {
                  resolve: `gatsby-plugin-manifest`,
                  options: {
                      name: options.manifestSettings.siteName,
                      short_name: options.manifestSettings.shortName,
                      start_url: options.manifestSettings.startUrl,
                      background_color: options.manifestSettings.backgroundColor,
                      theme_color: options.manifestSettings.themeColor,
                      display: options.manifestSettings.display,
                      icon: options.manifestSettings.favicon,
                  },
              }
            : null,
        options.plausibleAnalytics
            ? {
                  resolve: `gatsby-plugin-plausible`,
                  options: {
                      domain: options.plausibleAnalytics.domain,
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
                      environments: options.googleAnalytics.environments || 'production',
                  },
              }
            : null,
        `gatsby-plugin-offline`,
    ].filter((plugin) => plugin !== null),
});
