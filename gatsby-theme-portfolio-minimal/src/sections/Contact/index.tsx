import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Section } from '../../components/Section';
import { GatsbyImageQueryResultList } from '../../types/graphql';
import { getGatsbyImageByFileName } from '../../utils/getGatsbyImageByFileName';
import { SocialProfile, SocialProfiles } from '../../components/SocialProfiles';
import * as classes from './style.module.css';
import { motion, useAnimation } from 'framer-motion';

interface ContactSectionProps {
    anchor: string;
    heading?: string;
    description?: string;
    imageFileName: string;
    name: string;
    email: string;
    socialProfiles?: SocialProfile[];
}

export function ContactSection(props: ContactSectionProps): React.ReactElement {
    const images: GatsbyImageQueryResultList = useStaticQuery(query);

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
                additionalClasses={[classes.Contact]}
            >
                {props.description && <p className={classes.Description}>{props.description}</p>}
                <div className={classes.Profile}>
                    <GatsbyImage
                        className={classes.Avatar}
                        image={getGatsbyImageByFileName(images, props.imageFileName)}
                        alt={`Profile ${props.name}`}
                    />
                    <div className={classes.ContactDetails}>
                        <div className={classes.Name}>{props.name}</div>
                        <u>
                            <a href={`mailto:${props.email}`}>{props.email}</a>
                        </u>
                    </div>
                </div>
                {props.socialProfiles && <SocialProfiles shownProfiles={props.socialProfiles} withIcon={true} />}
            </AnimatedSection>
        </VisibilitySensor>
    );
}

const query = graphql`
    query ImagesContactSectionFormat {
        allFile(filter: { absolutePath: { regex: "/images/" } }) {
            images: nodes {
                name
                ext
                childImageSharp {
                    gatsbyImageData(width: 140, quality: 80, placeholder: BLURRED)
                }
            }
        }
    }
`;
