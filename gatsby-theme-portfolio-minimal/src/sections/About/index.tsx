import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { GatsbyImageQueryResultList } from '../../types/graphql';
import { Section } from '../../components/Section';
import { getGatsbyImageByFileName } from '../../utils/getGatsbyImageByFileName';
import { motion, useAnimation } from 'framer-motion';
import * as classes from './style.module.css';

interface AboutSectionProps {
    anchor: string;
    heading?: string;
    htmlDescription: string;
    imageFileName: string;
}

export function AboutSection(props: AboutSectionProps): React.ReactElement {
    const images: GatsbyImageQueryResultList = useStaticQuery(query); // Returns all images from the image directory

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
                <div className={classes.About}>
                    <div className={classes.Description} dangerouslySetInnerHTML={{ __html: props.htmlDescription }} />
                    <div className={classes.ImageWrapper}>
                        <GatsbyImage
                            className={classes.Image}
                            image={getGatsbyImageByFileName(images, props.imageFileName)}
                            alt={`About Image ${props.imageFileName}`}
                        />
                    </div>
                </div>
            </AnimatedSection>
        </VisibilitySensor>
    );
}

const query = graphql`
    query ImagesAboutSectionFormat {
        allFile(filter: { absolutePath: { regex: "/images/" } }) {
            images: nodes {
                name
                ext
                childImageSharp {
                    gatsbyImageData(width: 400, placeholder: BLURRED, quality: 80)
                }
            }
        }
    }
`;
