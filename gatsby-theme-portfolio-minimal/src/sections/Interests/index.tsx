import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { motion, useAnimation } from 'framer-motion';
import { Section } from '../../components/Section';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImageQueryResultList } from '../../types/graphql';
import { GatsbyImage } from 'gatsby-plugin-image';
import { getGatsbyImageByFileName } from '../../utils/getGatsbyImageByFileName';
import { Slider } from '../../components/Slider';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Button, ButtonType } from '../../components/Button';
import * as classes from './style.module.css';

interface Interest {
    label: string;
    iconFileName: string;
}

interface AllInterestsQueryResultList {
    allInterests: {
        interests: Interest[];
    };
}

type AllInterestsWithIconsQueryResultList = AllInterestsQueryResultList & GatsbyImageQueryResultList;

interface InterestsSectionProps {
    anchor: string;
    heading?: string;
    initiallyShown?: number;
}

export function InterestsSection(props: InterestsSectionProps): React.ReactElement {
    const isDesktopBreakpoint = useMediaQuery('(min-width: 992px)');
    const data: AllInterestsWithIconsQueryResultList = useStaticQuery(query);
    const interests = data.allInterests.interests;
    const initiallyShown = !isDesktopBreakpoint ? interests.length : props.initiallyShown || 5;

    const [sectionRevealed, setSectionRevealed] = React.useState<boolean>(false);
    const [shownInterests, setShownInterests] = React.useState<number>(initiallyShown);

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
        setShownInterests(interests.length);
    }

    return (
        <VisibilitySensor onChange={animateSection} partialVisibility={true} minTopValue={100}>
            <AnimatedSection
                anchor={props.anchor}
                heading={props.heading}
                initial={!sectionRevealed ? { opacity: 0, y: 20 } : undefined}
                animate={sectionControls}
            >
                <Slider
                    additionalClasses={[classes.Interests]}
                    style={
                        isDesktopBreakpoint
                            ? { gridTemplateColumns: `repeat(3, var(--interest-width))` }
                            : { gridTemplateColumns: `repeat(${interests.length + 1}, var(--interest-width))` }
                    }
                >
                    {interests.slice(0, shownInterests).map((interest, key) => {
                        return (
                            <motion.div
                                key={key}
                                className={classes.Interest}
                                custom={key}
                                initial={!sectionRevealed ? { opacity: 0, scaleY: 0 } : undefined}
                                animate={interestControls}
                            >
                                <GatsbyImage
                                    image={getGatsbyImageByFileName(data, interest.iconFileName)}
                                    className={classes.Icon}
                                    alt={`Interest ${interest.label}`}
                                />{' '}
                                {interest.label}
                            </motion.div>
                        );
                    })}
                    {shownInterests < interests.length && (
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

const query = graphql`
    query allInterestsWithIcons {
        allInterests {
            interests: nodes {
                iconFileName
                label
            }
        }
        allFile(filter: { absolutePath: { regex: "/images/" } }) {
            images: nodes {
                name
                ext
                childImageSharp {
                    gatsbyImageData(width: 20, height: 20, quality: 90, placeholder: BLURRED)
                }
            }
        }
    }
`;
