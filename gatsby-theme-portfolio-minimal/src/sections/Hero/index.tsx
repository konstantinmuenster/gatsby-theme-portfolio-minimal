import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';
import { Section } from '../../components/Section';
import { useGlobalState } from '../../context';
import { motion, useAnimation } from 'framer-motion';
import { GatsbyImageQueryResultList } from '../../types/graphql';
import { SocialProfiles, SocialProfile } from '../../components/SocialProfiles';
import * as classes from './style.module.css';
import { getGatsbyImageByFileName } from '../../utils/getGatsbyImageByFileName';

interface HeroSectionProps {
    anchor: string;
    content: {
        iconPrefixText?: string;
        iconFileName?: string;
        title: string;
        subtitlePrefix: string;
        subtitleHighlight: string;
        subtitleSuffix: string;
        description?: string;
        socialProfiles?: SocialProfile[];
    };
}

export function HeroSection(props: HeroSectionProps): React.ReactElement {
    const { globalState } = useGlobalState();
    const images: GatsbyImageQueryResultList = useStaticQuery(query); // Returns all images from the image directory

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
        <Section anchor={props.anchor}>
            <motion.div className={classes.Hero} initial={{ opacity: 0, y: 20 }} animate={textControls}>
                <div>
                    {props.content.iconPrefixText && (
                        <span className={classes.IconPrefix}>{props.content.iconPrefixText}</span>
                    )}
                    {props.content.iconFileName && (
                        <motion.div
                            className={classes.Icon}
                            animate={iconControls}
                            style={{ originX: 0.7, originY: 0.7 }}
                        >
                            <GatsbyImage
                                image={getGatsbyImageByFileName(images, props.content.iconFileName)}
                                alt={`Icon ${props.content.iconFileName}`}
                                loading="eager"
                            />
                        </motion.div>
                    )}
                </div>
                <h1>{props.content.title}</h1>
                <h2>
                    {props.content.subtitlePrefix}
                    <u>{props.content.subtitleHighlight}</u>
                    {props.content.subtitleSuffix}
                </h2>
                <p>{props.content.description}</p>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={socialProfileControls}>
                    {props.content.socialProfiles && <SocialProfiles shownProfiles={props.content.socialProfiles} />}
                </motion.div>
            </motion.div>
        </Section>
    );
}

const query = graphql`
    query ImagesInIconFormat {
        allFile(filter: { absolutePath: { regex: "/images/" } }) {
            images: nodes {
                name
                ext
                childImageSharp {
                    gatsbyImageData(width: 48, aspectRatio: 1, placeholder: BLURRED)
                }
            }
        }
    }
`;
