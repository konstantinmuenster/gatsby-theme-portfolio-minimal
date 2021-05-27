import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';

interface SeoProps {
    title: string;
    useTitleTemplate?: boolean;
    noIndex?: boolean;
    description?: string;
}

export function Seo(props: SeoProps): React.ReactElement {
    const location = useLocation();
    const siteMetadata = { ...useSiteMetadata(), ...props };

    return (
        <Helmet
            title={siteMetadata.title}
            titleTemplate={props.useTitleTemplate ? siteMetadata.titleTemplate : undefined}
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
