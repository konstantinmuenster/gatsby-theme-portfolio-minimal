import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Section } from '../../components/Section';
import { motion, useAnimation } from 'framer-motion';
import { useLocalDataSource } from './data';
import { PageSection } from '../../types';
import * as classes from './style.module.css';

export function AboutSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const data = response.allAboutMarkdown.sections[0];

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
                <div className={classes.About}>
                    <div className={classes.Description} dangerouslySetInnerHTML={{ __html: data.html }} />
                    <div className={classes.ImageWrapper}>
                        <GatsbyImage
                            className={classes.Image}
                            image={data.frontmatter.imageSrc.childImageSharp.gatsbyImageData}
                            alt={data.frontmatter.imageAlt || `About Image`}
                        />
                    </div>
                </div>
            </AnimatedSection>
        </VisibilitySensor>
    );
}
