import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Section } from '../../components/Section';
import { RevealSensor } from '../../components/RevealSensor';
import { motion } from 'framer-motion';
import { useLocalDataSource } from './data';
import { PageSection } from '../../types';
import * as classes from './style.module.css';

export function AboutSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const data = response.allAboutMarkdown.sections[0];

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
                        initial={variants.hidden}
                        animate={isVisible ? 'visible' : 'hidden'}
                        variants={variants}
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
                );
            }}
        </RevealSensor>
    );
}
