import { TSConfigSetupOptions } from 'gatsby-plugin-ts-config/dist/types';
import * as path from 'path';

enum Environments {
    DEV = 'development',
    PROD = 'production',
}

export interface ThemeOptions extends TSConfigSetupOptions {
    contentDirectory?: string;
    manifestSettings?: {
        favicon?: string;
        siteName?: string;
        shortName?: string;
        startUrl?: string;
        backgroundColor?: string;
        themeColor?: string;
        display?: string;
    };
    siteUrl?: string;
    googleAnalytics?: {
        trackingId?: string;
        anonymize?: string;
        environments?: Environments[];
    };
}

interface GatsbyConfig {
    siteMetadata: { siteUrl: string } | null;
    plugins: (string | Record<string, unknown> | null)[];
}

export default function (TSConfig: TSConfigSetupOptions, options: ThemeOptions): GatsbyConfig {
    return {
        siteMetadata: options.siteUrl ? { siteUrl: options.siteUrl } : null,
        plugins: [
            `gatsby-plugin-typescript`,
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
            `gatsby-transformer-remark`,
            `gatsby-transformer-sharp`,
            `gatsby-transformer-json`,
            {
                resolve: `gatsby-source-filesystem`,
                options: {
                    name: `content`,
                    path: options.contentDirectory || path.join('.', 'content'),
                },
            },
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
            options.googleAnalytics
                ? {
                      resolve: `gatsby-plugin-gdpr-cookies`,
                      options: {
                          googleAnalytics: {
                              trackingId: options.googleAnalytics.trackingId,
                              cookieName: 'gatsby-gdpr-google-analytics',
                              anonymize: options.googleAnalytics.anonymize || true,
                          },
                          environments: options.googleAnalytics.environments || [Environments.PROD],
                      },
                  }
                : null,
        ].filter((plugin) => plugin !== null),
    };
}
