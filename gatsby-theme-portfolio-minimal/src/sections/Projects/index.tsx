import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { graphql, useStaticQuery } from 'gatsby';
import { Section } from '../../components/Section';
import { motion, useAnimation } from 'framer-motion';
import { Slider } from '../../components/Slider';
import { Button, ButtonType } from '../../components/Button';
import { Project } from '../../components/Project';
import * as classes from './style.module.css';

interface AllProjectsQueryResultList {
    allProjects: {
        projects: Project[];
    };
}

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
    const projectCount = props.maxProjects || 4;
    const data: AllProjectsQueryResultList = useStaticQuery(query);

    const [sectionRevealed, setSectionRevealed] = React.useState<boolean>(false);

    // Reveal section when at least 100px of the section is in viewport
    const AnimatedSection = motion(Section);
    const sectionControls = useAnimation();
    async function animateSection(isVisible: boolean): Promise<void> {
        if (isVisible) {
            await sectionControls.start({ opacity: 1, y: 0 });
            setSectionRevealed(true);
        }
    }

    return (
        <VisibilitySensor onChange={animateSection} partialVisibility={true} minTopValue={100}>
            <AnimatedSection
                anchor={props.anchor}
                heading={props.heading}
                initial={!sectionRevealed ? { opacity: 0, y: 20 } : undefined}
                animate={sectionControls}
            >
                <Slider additionalClasses={[classes.Projects]}>
                    {data.allProjects.projects.slice(0, projectCount).map((project, key) => {
                        return <Project key={key} index={key} data={project} />;
                    })}
                </Slider>
                {props.button !== undefined && (
                    <div className={classes.MoreProjects}>
                        <Button
                            type={ButtonType.LINK}
                            externalLink={true}
                            url={props.button.url}
                            label={props.button.label}
                        />
                    </div>
                )}
            </AnimatedSection>
        </VisibilitySensor>
    );
}

const query = graphql`
    query AllVisibleProjects {
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
    }
`;
