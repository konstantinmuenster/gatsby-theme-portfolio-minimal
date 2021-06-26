import React from 'react';
import { Section } from '../../components/Section';
import { motion } from 'framer-motion';
import { Slider } from '../../components/Slider';
import { Button, ButtonType } from '../../components/Button';
import { Project } from '../../components/Project';
import { RevealSensor } from '../../components/RevealSensor';
import { PageSection } from '../../types';
import { useLocalDataSource } from './data';
import * as classes from './style.module.css';

export function ProjectsSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const data = response.allProjectsJson.sections[0];

    const AnimatedSection = motion(Section);
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <RevealSensor once={true}>
            {(isVisible) => {
                return (
                    <AnimatedSection
                        anchor={props.sectionId}
                        heading={props.heading}
                        initial={isVisible ? variants.visible : variants.hidden}
                        animate={isVisible ? variants.visible : variants.hidden}
                        variants={variants}
                    >
                        <Slider additionalClasses={[classes.Projects]}>
                            {data.projects.map((project, key) => {
                                return project.visible ? <Project key={key} index={key} data={project} /> : null;
                            })}
                        </Slider>
                        {data.button !== undefined && data.button.visible !== false && (
                            <div className={classes.MoreProjects}>
                                <Button
                                    type={ButtonType.LINK}
                                    externalLink={true}
                                    url={data.button.url}
                                    label={data.button.label}
                                />
                            </div>
                        )}
                    </AnimatedSection>
                );
            }}
        </RevealSensor>
    );
}
