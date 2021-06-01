import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import * as classes from './style.module.css';

export function AuthorSnippet(): React.ReactElement {
    const { author, avatar, bio } = useSiteMetadata();
    return (
        <div className={classes.AuthorSnippet}>
            <GatsbyImage image={avatar.childImageSharp.gatsbyImageData} alt={author} className={classes.Avatar} />
            <div className={classes.Description}>
                <span className={classes.WrittenBy}>
                    Written By <u>{author}</u>
                </span>
                <p className={classes.Bio}>{bio}</p>
            </div>
        </div>
    );
}
