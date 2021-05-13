import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { getGatsbyImageByFileName } from '../../utils/getGatsbyImageByFileName';
import { Icon } from '../Icon';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImageQueryResultList } from '../../types/graphql';
import * as classes from './style.module.css';

export interface Project {
    category?: string;
    title: string;
    description: string;
    imageFileName: string;
    tags?: string[];
    links?: {
        type: string;
        url: string;
    }[];
}

interface ProjectProps {
    data: Project;
    index: number;
}

export function Project(props: ProjectProps): React.ReactElement {
    const images: GatsbyImageQueryResultList = useStaticQuery(query);
    const isDesktopBreakpoint = useMediaQuery('(min-width: 992px)');

    return (
        <div
            className={classes.Project}
            style={{
                flexDirection: isDesktopBreakpoint && props.index % 2 === 0 ? 'row-reverse' : undefined,
            }}
        >
            <div className={classes.Details}>
                <span className={classes.Category}>{props.data.category}</span>
                <h4 className={classes.Title}>{props.data.title}</h4>
                <p>{props.data.description}</p>
                <div className={classes.Tags}>
                    {props.data.tags &&
                        props.data.tags.length !== 0 &&
                        props.data.tags.map((tag, key) => {
                            return (
                                <span key={key}>
                                    <u>{tag}</u>
                                </span>
                            );
                        })}
                </div>
                <div className={classes.Links}>
                    {props.data.links &&
                        props.data.links.length !== 0 &&
                        props.data.links.map((link, key) => {
                            return (
                                <a
                                    key={key}
                                    href={link.url}
                                    target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    aria-label="External Link"
                                >
                                    <Icon name={link.type} color="var(--subtext-color)" />
                                </a>
                            );
                        })}
                </div>
            </div>
            <GatsbyImage
                className={classes.ProjectImageWrapper}
                imgClassName={classes.ProjectImage}
                image={getGatsbyImageByFileName(images, props.data.imageFileName)}
                alt={`Project ${props.data.title}`}
            />
        </div>
    );
}

const query = graphql`
    query ImagesProjectFormat {
        allFile(filter: { absolutePath: { regex: "/images/" } }) {
            images: nodes {
                name
                ext
                childImageSharp {
                    gatsbyImageData(width: 400, quality: 80, placeholder: BLURRED)
                }
            }
        }
    }
`;
