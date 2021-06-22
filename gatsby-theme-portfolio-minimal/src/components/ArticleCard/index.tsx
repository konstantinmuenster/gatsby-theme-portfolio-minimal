import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import { ImageObject } from '../../types';
import { Theme, useGlobalState } from '../../context';
import * as classes from './style.module.css';

export interface ArticleCard {
    image?: ImageObject;
    category: string;
    title: string;
    publishedAt: Date;
    readingTime?: string;
    link: string;
}

interface ArticleCardProps {
    data: ArticleCard;
    showBanner?: boolean;
}

export function ArticleCard(props: ArticleCardProps): React.ReactElement {
    const { globalState } = useGlobalState();
    const darkModeEnabled = globalState.theme === Theme.Dark;

    // Needed to differentiate between external and internal links (whether or not we use Gatsby Link)
    const absoluteUrl = props.data.link.indexOf('://') > 0 || props.data.link.indexOf('//') === 0;

    const articleCard = (
        <article
            className={classes.Card}
            style={darkModeEnabled ? { border: '0.125rem solid var(--primary-color)' } : undefined}
        >
            {props.showBanner && (
                <div className={classes.Banner}>
                    {props.data.image && props.data.image.src && (
                        <GatsbyImage
                            className={classes.ImageWrapper}
                            imgClassName={classes.Image}
                            image={props.data.image.src.childImageSharp.gatsbyImageData}
                            alt={props.data.image.alt || props.data.title}
                        />
                    )}
                </div>
            )}
            <div className={classes.DescriptionWrapper}>
                <span className={classes.Category}>
                    <u>{props.data.category}</u>
                </span>
                <h4 className={classes.Title}>{props.data.title}</h4>
                <div className={classes.Details}>
                    {formatDate(props.data.publishedAt)}
                    {props.data.readingTime && <span className={classes.ReadingTime}>{props.data.readingTime}</span>}
                </div>
            </div>
        </article>
    );

    return absoluteUrl ? (
        <a href={props.data.link} target="_blank" rel="nofollow noopener noreferrer" title={props.data.title}>
            {articleCard}
        </a>
    ) : (
        <Link to={props.data.link} title={props.data.title}>
            {articleCard}
        </Link>
    );
}

export function ArticleCardSkeleton(): React.ReactElement {
    const { globalState } = useGlobalState();
    const darkModeEnabled = globalState.theme === Theme.Dark;
    return (
        <div
            className={classes.Card}
            style={darkModeEnabled ? { border: '0.125rem solid var(--primary-color)' } : undefined}
        >
            <div className={classes.DescriptionWrapper}>
                <SkeletonLoader
                    style={{
                        height: '1.5rem',
                        marginBottom: '.5rem',
                        background: 'var(--tertiary-color)',
                    }}
                />
                <SkeletonLoader style={{ height: '4rem', background: 'var(--tertiary-color)' }} />
                <SkeletonLoader
                    style={{
                        height: '.75rem',
                        width: '50%',
                        marginTop: '.5rem',
                        background: 'var(--tertiary-color)',
                    }}
                />
            </div>
        </div>
    );
}

function formatDate(date: Date): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
