import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
import { useLocation } from '@reach/router';
import { AllSettingsQueryResult } from '../../types/graphql';

interface SiteMetadata {
    siteMetadata: {
        title: string;
        titleTemplate: string;
        description: string;
        author: string;
        siteUrl: string;
        language: string;
    };
}

interface SeoProps {
    title: string;
    useTitleTemplate?: boolean;
    noIndex?: boolean;
    description?: string;
}

export function Seo(props: SeoProps): React.ReactElement {
    const location = useLocation();
    const data: AllSettingsQueryResult<SiteMetadata> = useStaticQuery(query);
    const siteMetadata = {
        ...data.allSettings.edges[0].node.siteMetadata,
        ...props,
    };

    return (
        <Helmet
            title={siteMetadata.title}
            titleTemplate={props.useTitleTemplate === true ? siteMetadata.titleTemplate : undefined}
            htmlAttributes={{ lang: siteMetadata.language }}
        >
            {props.noIndex && <meta name="robots" content="noindex" />}
            <meta name="description" content={siteMetadata.description} />
            <meta property="og:title" content={siteMetadata.title} />
            <meta property="og:site_name" content={siteMetadata.title} />
            <meta property="og:url" content={siteMetadata.siteUrl + location.pathname} />
            <meta property="og:description" content={siteMetadata.description} />
            <meta property="og:type" content="website" />
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:creator" content={siteMetadata.author} />
            <meta property="twitter:title" content={siteMetadata.title} />
            <meta property="twitter:description" content={siteMetadata.description} />
        </Helmet>
    );
}

const query = graphql`
    query SiteMetadata {
        allSettings {
            edges {
                node {
                    siteMetadata {
                        title
                        description
                        titleTemplate
                        author
                        siteUrl
                        language
                    }
                }
            }
        }
    }
`;
