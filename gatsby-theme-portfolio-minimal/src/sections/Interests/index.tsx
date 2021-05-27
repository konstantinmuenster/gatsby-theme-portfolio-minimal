import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { motion, useAnimation } from 'framer-motion';
import { Section } from '../../components/Section';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Slider } from '../../components/Slider';
import { Button, ButtonType } from '../../components/Button';
import { PageSection } from '../../types';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useLocalDataSource } from './data';
import * as classes from './style.module.css';

export function InterestsSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const data = response.allInterestsJson.sections[0];
    const [shownInterests, setShownInterests] = React.useState<number>(5);

    const isDesktopBreakpoint = useMediaQuery('(min-width: 992px)');

    const [sectionRevealed, setSectionRevealed] = React.useState<boolean>(false);

    // Reveal section when at least 100px of the section is in viewport
    // Then, reveal interests sequentially
    const AnimatedSection = motion(Section);
    const sectionControls = useAnimation();
    const interestControls = useAnimation();
    const buttonControls = useAnimation();
    async function animateSection(isVisible: boolean): Promise<void> {
        if (isVisible) {
            await sectionControls.start({ opacity: 1, y: 0 });
            await interestControls.start((index: number) => {
                // We use the index of the interest to stagger
                // the animation of each interest
                return {
                    opacity: 1,
                    scaleY: 1,
                    transition: { delay: index * 0.1 },
                };
            });
            await buttonControls.start({ opacity: 1, scaleY: 1 });
            setSectionRevealed(true);
        }
    }

    function loadMoreHandler() {
        setShownInterests(data.interests.length);
    }

    return (
        <VisibilitySensor onChange={animateSection} partialVisibility={true} minTopValue={100}>
            <AnimatedSection
                anchor={props.sectionId}
                heading={props.heading}
                initial={!sectionRevealed ? { opacity: 0, y: 20 } : undefined}
                animate={sectionControls}
            >
                <Slider
                    additionalClasses={[classes.Interests]}
                    style={
                        isDesktopBreakpoint
                            ? { gridTemplateColumns: `repeat(3, var(--interest-width))` }
                            : { gridTemplateColumns: `repeat(${data.interests.length + 1}, var(--interest-width))` }
                    }
                >
                    {data.interests.slice(0, shownInterests).map((interest, key) => {
                        return (
                            <motion.div
                                key={key}
                                className={classes.Interest}
                                custom={key}
                                initial={!sectionRevealed ? { opacity: 0, scaleY: 0 } : undefined}
                                animate={interestControls}
                            >
                                <GatsbyImage
                                    image={interest.image.src.childImageSharp.gatsbyImageData}
                                    className={classes.Icon}
                                    alt={interest.image.alt || `Interest ${interest.label}`}
                                />{' '}
                                {interest.label}
                            </motion.div>
                        );
                    })}
                    {shownInterests < data.interests.length && (
                        <motion.div
                            initial={!sectionRevealed ? { opacity: 0, scaleY: 0 } : undefined}
                            animate={buttonControls}
                        >
                            <Button type={ButtonType.BUTTON} onClickHandler={loadMoreHandler} label="+ Load more" />
                        </motion.div>
                    )}
                </Slider>
            </AnimatedSection>
        </VisibilitySensor>
    );
}
