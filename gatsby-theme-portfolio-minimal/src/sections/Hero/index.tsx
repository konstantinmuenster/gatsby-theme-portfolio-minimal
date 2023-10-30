import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Animation } from '../../components/Animation';
import { useCalendlyWidget } from '../../hooks/useCalendlyWidget';
import { Section } from '../../components/Section';
import { SocialProfiles } from '../../components/SocialProfiles';
import { useLocalDataSource } from './data';
import { PageSection } from '../../types';
import * as classes from './style.module.css';

export function HeroSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const allFiles = response.allFile.heroFiles;
    const fileNameNeedle = props.fileName ? props.fileName : 'projects';
    const result = allFiles.find((file) => {
        return file.name == fileNameNeedle;
    });
    const section = result ? result.section[0] : allFiles[0].section[0];

    const CalendlyWidget = useCalendlyWidget(section.calendly);

    return (
        <Animation type="fadeUp" delay={400}>
            {CalendlyWidget}
            <Section anchor={props.sectionId} additionalClasses={[classes.HeroContainer]}>
                {section.heroPhoto?.src && (
                    <div className={classes.heroImageCont}>
                        <GatsbyImage
                            className={classes.heroImage}
                            image={section.heroPhoto.src.childImageSharp.gatsbyImageData}
                            alt={section.heroPhoto.alt || `Profile Image`}
                            loading="eager"
                        />
                    </div>
                )}
                <div className={classes.Hero}>
                    <div className={classes.Intro}>
                        {section.intro && <span className={classes.ImagePrefix}>{section.intro}</span>}
                        {section.image?.src && (
                            <Animation className={classes.Image} type="waving-hand" duration={2500} iterationCount={3}>
                                <GatsbyImage
                                    image={section.image.src.childImageSharp.gatsbyImageData}
                                    alt={section.image.alt || `Intro Image`}
                                    loading="eager"
                                />
                            </Animation>
                        )}
                    </div>
                    <h1 className={classes.Title}>{section.title}</h1>
                    <h2 className={classes.Subtitle}>
                        {section.subtitle.prefix}
                        <u>{section.subtitle.highlight}</u>
                        {section.subtitle.suffix}
                    </h2>
                    <p>{section.description}</p>
                    <Animation type="fadeLeft" delay={600}>
                        {section.socialProfiles && (
                            <SocialProfiles
                                from={section.socialProfiles.from}
                                showIcon={section.socialProfiles.showIcons}
                            />
                        )}
                    </Animation>
                </div>
            </Section>
        </Animation>
    );
}
