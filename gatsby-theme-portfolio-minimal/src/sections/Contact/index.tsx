import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Section } from '../../components/Section';
import { SocialProfiles } from '../../components/SocialProfiles';
import { RevealSensor } from '../../components/RevealSensor';
import { motion } from 'framer-motion';
import { useLocalDataSource } from './data';
import { PageSection } from '../../types';
import * as classes from './style.module.css';

export function ContactSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const data = response.allContactJson.sections[0];

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
                        additionalClasses={[classes.Contact]}
                    >
                        {data.description && <p className={classes.Description}>{data.description}</p>}
                        <div className={classes.Profile}>
                            {data.image.src && (
                                <GatsbyImage
                                    className={classes.Avatar}
                                    image={data.image.src.childImageSharp.gatsbyImageData}
                                    alt={data.image.alt || `Profile ${data.name}`}
                                />
                            )}
                            <div className={classes.ContactDetails}>
                                <div className={classes.Name}>{data.name}</div>
                                <u>
                                    <a href={`mailto:${data.email}`}>{data.email}</a>
                                </u>
                            </div>
                        </div>
                        {data.socialProfiles && (
                            <SocialProfiles from={data.socialProfiles.from} showIcon={data.socialProfiles.showIcons} />
                        )}
                    </AnimatedSection>
                );
            }}
        </RevealSensor>
    );
}
