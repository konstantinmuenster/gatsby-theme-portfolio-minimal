import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Section } from '../../components/Section';
import { SocialProfiles } from '../../components/SocialProfiles';
import { motion, useAnimation } from 'framer-motion';
import { useLocalDataSource } from './data';
import { PageSection } from '../../types';
import * as classes from './style.module.css';

export function ContactSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const data = response.allContactJson.sections[0];

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
                additionalClasses={[classes.Contact]}
            >
                {data.description && <p className={classes.Description}>{data.description}</p>}
                <div className={classes.Profile}>
                    <GatsbyImage
                        className={classes.Avatar}
                        image={data.image.src.childImageSharp.gatsbyImageData}
                        alt={data.image.alt || `Profile ${data.name}`}
                    />
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
        </VisibilitySensor>
    );
}
