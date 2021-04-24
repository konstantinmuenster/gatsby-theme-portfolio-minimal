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

    // Filter for the referenced image by using the file name prop
    const image = getGatsbyImageByFileName(images, props.imageFileName);

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
                <div className={classes.About}>
                    <div className={classes.Description} dangerouslySetInnerHTML={{ __html: props.htmlDescription }} />
                    <div className={classes.ImageWrapper}>
                        <GatsbyImage
                            className={classes.Image}
                            image={image.childImageSharp.gatsbyImageData}
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
