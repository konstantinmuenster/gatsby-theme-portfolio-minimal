import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Section } from '../../components/Section';
import { useGlobalState } from '../../context';
import { motion, useAnimation } from 'framer-motion';
import { SocialProfiles } from '../../components/SocialProfiles';
import { useLocalDataSource } from './data';
import { PageSection } from '../../types';
import * as classes from './style.module.css';

export function HeroSection(props: PageSection): React.ReactElement {
    const { globalState } = useGlobalState();
    const response = useLocalDataSource();
    const data = response.allHeroJson.sections[0];

    const textControls = useAnimation();
    const iconControls = useAnimation();
    const socialProfileControls = useAnimation();
    async function animationSequence() {
        await textControls.start({ opacity: 1, y: 0, transition: { delay: 0.4 } });
        await socialProfileControls.start({ opacity: 1, x: 0 });
        await iconControls.start({
            rotate: [0, -10, 12, -10, 9, 0, 0, 0, 0, 0, 0],
            transition: { duration: 2.5, loop: 3, repeatDelay: 1 },
        });
    }

    React.useEffect(() => {
        if (globalState.splashScreenDone) {
            (async function () {
                await animationSequence();
            })();
        }
    }, [globalState.splashScreenDone]);

    return (
        <Section anchor={props.sectionId}>
            <motion.div className={classes.Hero} initial={{ opacity: 0, y: 20 }} animate={textControls}>
                <div className={classes.Intro}>
                    {data.intro && <span className={classes.ImagePrefix}>{data.intro}</span>}
                    {data.image.src && (
                        <motion.div
                            className={classes.Image}
                            animate={iconControls}
                            style={{ originX: 0.7, originY: 0.7 }}
                        >
                            <GatsbyImage
                                image={data.image.src.childImageSharp.gatsbyImageData}
                                alt={data.image.alt || `Intro Image`}
                                loading="eager"
                            />
                        </motion.div>
                    )}
                </div>
                <h1 className={classes.Title}>{data.title}</h1>
                <h2 className={classes.Subtitle}>
                    {data.subtitle.prefix}
                    <u>{data.subtitle.highlight}</u>
                    {data.subtitle.suffix}
                </h2>
                <p>{data.description}</p>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={socialProfileControls}>
                    {data.socialProfiles && (
                        <SocialProfiles from={data.socialProfiles.from} showIcon={data.socialProfiles.showIcons} />
                    )}
                </motion.div>
            </motion.div>
        </Section>
    );
}
