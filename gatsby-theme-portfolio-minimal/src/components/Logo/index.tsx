import React from 'react';

import { GatsbyImage } from 'gatsby-plugin-image';
import { Theme, useGlobalState } from '../../context';
import { SiteConfiguration, useSiteConfiguration } from '../../hooks/useSiteConfiguration';
import * as classes from './style.module.css';

interface LogoProps {
    fontSize?: string;
    color?: string;
    theme?: Theme;
}

export function Logo(props: LogoProps): React.ReactElement {
    const { globalState } = useGlobalState();
    const { logo } = useSiteConfiguration();
    const fontSize = props.fontSize || '2rem';
    const color = props.color || 'var(--primary-color)';

    const Logo = getLogoContent(logo.image, logo.text);
    const LogoDark = getLogoContent(logo.imageDark, logo.text);

    const theme = props.theme ?? globalState.theme;
    const ThemeSpecificLogo = theme === Theme.Dark ? LogoDark || Logo : Logo;

    return (
        <div className={classes.Logo} aria-roledescription="logo" style={{ fontSize, color }}>
            {ThemeSpecificLogo || logo.text}
        </div>
    );
}

const getLogoContent = (image: SiteConfiguration['logo']['image'], fallback: string) => {
    const hasImage = !!image?.childImageSharp || !!image?.publicURL || !!image?.svg?.originalContent;

    const isSvg = image?.extension === 'svg';

    if (hasImage && isSvg && image?.svg?.originalContent) {
        return <div className="logo-svg-wrapper" dangerouslySetInnerHTML={{ __html: image?.svg.originalContent }} />;
    }

    if (hasImage && isSvg && image?.publicURL) {
        return <img src={image?.publicURL} alt={fallback} />;
    }

    if (hasImage && !isSvg && image?.childImageSharp?.gatsbyImageData) {
        return <GatsbyImage image={image?.childImageSharp?.gatsbyImageData} alt={fallback} objectFit="contain" />;
    }

    return undefined;
};
