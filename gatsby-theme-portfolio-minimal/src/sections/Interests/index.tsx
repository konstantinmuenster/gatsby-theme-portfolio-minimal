import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../../components/Section';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Slider } from '../../components/Slider';
import { Button, ButtonType } from '../../components/Button';
import { RevealSensor } from '../../components/RevealSensor';
import { PageSection } from '../../types';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useLocalDataSource } from './data';
import * as classes from './style.module.css';

export function InterestsSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const data = response.allInterestsJson.sections[0];
    const [shownInterests, setShownInterests] = React.useState<number>(5);

    const isDesktopBreakpoint = useMediaQuery('(min-width: 992px)');

    function loadMoreHandler() {
        setShownInterests(data.interests.length);
    }

    const AnimatedSection = motion(Section);
    const wrapperVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { when: 'beforeChildren', staggerChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, scaleY: 0 },
        visible: { opacity: 1, scaleY: 1 },
    };

    return (
        <RevealSensor once={true}>
            {(isVisible) => {
                return (
                    <AnimatedSection
                        anchor={props.sectionId}
                        heading={props.heading}
                        initial={isVisible ? wrapperVariants.visible : wrapperVariants.hidden}
                        animate={isVisible ? 'visible' : 'hidden'}
                        variants={wrapperVariants}
                    >
                        <Slider
                            additionalClasses={[classes.Interests]}
                            style={
                                isDesktopBreakpoint
                                    ? { gridTemplateColumns: `repeat(3, var(--interest-width))` }
                                    : {
                                          gridTemplateColumns: `repeat(${
                                              data.interests.length + 1
                                          }, var(--interest-width))`,
                                      }
                            }
                        >
                            {data.interests.slice(0, shownInterests).map((interest, key) => {
                                return (
                                    <motion.div
                                        key={key}
                                        className={classes.Interest}
                                        custom={key}
                                        initial={itemVariants.hidden}
                                        variants={itemVariants}
                                    >
                                        {interest.image.src && (
                                            <GatsbyImage
                                                image={interest.image.src.childImageSharp.gatsbyImageData}
                                                className={classes.Icon}
                                                alt={interest.image.alt || `Interest ${interest.label}`}
                                            />
                                        )}{' '}
                                        {interest.label}
                                    </motion.div>
                                );
                            })}
                            {shownInterests < data.interests.length && (
                                <motion.div
                                    custom={data.interests.length + 1}
                                    initial={itemVariants.hidden}
                                    variants={itemVariants}
                                >
                                    <Button
                                        type={ButtonType.BUTTON}
                                        onClickHandler={loadMoreHandler}
                                        label="+ Load more"
                                    />
                                </motion.div>
                            )}
                        </Slider>
                    </AnimatedSection>
                );
            }}
        </RevealSensor>
    );
}
