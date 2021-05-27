import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { Section } from '../../components/Section';
import { motion, useAnimation } from 'framer-motion';
import { Slider } from '../../components/Slider';
import { Button, ButtonType } from '../../components/Button';
import { Project } from '../../components/Project';
import { PageSection } from '../../types';
import { useLocalDataSource } from './data';
import * as classes from './style.module.css';

export function ProjectsSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const data = response.allProjectsJson.sections[0];

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
                anchor={props.sectionId}
                heading={props.heading}
                initial={!sectionRevealed ? { opacity: 0, y: 20 } : undefined}
                animate={sectionControls}
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
        </VisibilitySensor>
    );
}
