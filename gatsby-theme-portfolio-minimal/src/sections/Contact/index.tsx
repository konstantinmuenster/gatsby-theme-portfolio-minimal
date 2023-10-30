import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Animation } from '../../components/Animation';
import { Section } from '../../components/Section';
import { SocialProfiles } from '../../components/SocialProfiles';
import { useLocalDataSource } from './data';
import { PageSection } from '../../types';
import * as classes from './style.module.css';

export function ContactSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const allFiles = response.allFile.contactFiles;
    const fileNameNeedle = props.fileName ? props.fileName : 'contact';
    const result = allFiles.find((file) => {
        return file.name == fileNameNeedle;
    });
    const section = result ? result.section[0] : allFiles[0].section[0];

    return (
        <Animation type="fadeUp">
            <Section anchor={props.sectionId} heading={props.heading} additionalClasses={[classes.Contact]}>
                {section.description && <p className={classes.Description}>{section.description}</p>}
                <div className={classes.Profile}>
                    {section.image.src && (
                        <GatsbyImage
                            className={classes.Avatar}
                            image={section.image.src.childImageSharp.gatsbyImageData}
                            alt={section.image.alt || `Profile ${section.name}`}
                        />
                    )}
                    <div className={classes.ContactDetails}>
                        <div className={classes.Name}>{section.name}</div>
                        <u>
                            <a href={`mailto:${section.email}`}>{section.email}</a>
                        </u>
                    </div>
                </div>
                {section.socialProfiles && (
                    <SocialProfiles from={section.socialProfiles.from} showIcon={section.socialProfiles.showIcons} />
                )}
            </Section>
        </Animation>
    );
}
