import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { graphql, useStaticQuery } from 'gatsby';
import { Section } from '../../components/Section';
import { motion, useAnimation } from 'framer-motion';
import { GatsbyImageQueryResultList } from '../../types/graphql';
import { GatsbyImage } from 'gatsby-plugin-image';
import { getGatsbyImageByFileName } from '../../utils/getGatsbyImageByFileName';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Icon } from '../../components/Icon';
import { Slider } from '../../components/Slider';
import * as classes from './style.module.css';

interface Project {
    category: string;
    title: string;
    description: string;
    tags: string[];
    imageFileName: string;
    links: {
        type: string;
        url: string;
    }[];
}

interface AllProjectsQueryResultList {
    allProjects: {
        projects: Project[];
    };
}

type AllProjectsWithImagesQueryResultList = AllProjectsQueryResultList & GatsbyImageQueryResultList;

interface ProjectsSectionProps {
    anchor: string;
    heading?: string;
    maxProjects?: number;
    button?: {
        label: string;
        url: string;
    };
}

export function ProjectsSection(props: ProjectsSectionProps): React.ReactElement {
    const MAX_PROJECTS = props.maxProjects || 4;
    const data: AllProjectsWithImagesQueryResultList = useStaticQuery(query);

    const isDesktopBreakpoint = useMediaQuery('(min-width: 992px)');

    // Reveal section when at least 100px of the section is in viewport
    const AnimatedSection = motion(Section);
    const sectionControls = useAnimation();
    async function animateSection(isVisible: boolean): Promise<void> {
        if (isVisible) {
            await sectionControls.start({ opacity: 1, y: 0 });
        }
    }

    return (
        <VisibilitySensor onChange={animateSection} partialVisibility={true} minTopValue={100}>
            <AnimatedSection
                anchor={props.anchor}
                heading={props.heading}
                initial={{ opacity: 0, y: 20 }}
                animate={sectionControls}
            >
                <Slider additionalClasses={[classes.Projects]}>
                    {data.allProjects.projects.slice(0, MAX_PROJECTS).map((project, key) => {
                        return (
                            <div
                                key={key}
                                className={classes.Project}
                                style={{
                                    flexDirection: isDesktopBreakpoint && key % 2 === 0 ? 'row-reverse' : undefined,
                                }}
                            >
                                <div className={classes.Details}>
                                    <span className={classes.Category}>{project.category}</span>
                                    <h4 className={classes.Title}>{project.title}</h4>
                                    <p>{project.description}</p>
                                    <div className={classes.Tags}>
                                        {project.tags.length !== 0 &&
                                            project.tags.map((tag, key) => {
                                                return (
                                                    <span key={key}>
                                                        <u>{tag}</u>
                                                    </span>
                                                );
                                            })}
                                    </div>
                                    <div className={classes.Links}>
                                        {project.links.length !== 0 &&
                                            project.links.map((link, key) => {
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
                                    className={classes.ProjectImage}
                                    image={getGatsbyImageByFileName(data, project.imageFileName)}
                                    alt={`Project ${project.title}`}
                                />
                            </div>
                        );
                    })}
                </Slider>
                {props.button !== undefined && (
                    <div className={classes.MoreProjects}>
                        <a
                            href={props.button.url}
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            aria-label="External Link"
                        >
                            {props.button.label}
                        </a>
                    </div>
                )}
            </AnimatedSection>
        </VisibilitySensor>
    );
}

const query = graphql`
    query AllVisibleProjectsWithImages {
        allProjects(filter: { visible: { eq: true } }) {
            projects: nodes {
                category
                description
                imageFileName
                tags
                title
                links {
                    type
                    url
                }
            }
        }
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
