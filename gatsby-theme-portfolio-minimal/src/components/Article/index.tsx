import React from 'react';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import { formatDate } from '../../utils/formatDate';
import * as classes from './style.module.css';

export interface Article {
    category: string;
    title: string;
    publishedAt: Date;
    link: string;
}

interface ArticleProps {
    data: Article;
}

export function Article(props: ArticleProps): React.ReactElement {
    return (
        <a
            href={props.data.link}
            target="_blank"
            rel="nofollow noopener noreferrer"
            title={props.data.title}
            aria-label={props.data.title}
        >
            <article className={classes.Card}>
                <span className={classes.Category}>
                    <u>{props.data.category}</u>
                </span>
                <h4 className={classes.Title}>{props.data.title}</h4>
                <span className={classes.Date}>{formatDate(props.data.publishedAt)}</span>
            </article>
        </a>
    );
}

export function ArticleSkeleton(): React.ReactElement {
    return (
        <div className={classes.Card}>
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
    );
}
