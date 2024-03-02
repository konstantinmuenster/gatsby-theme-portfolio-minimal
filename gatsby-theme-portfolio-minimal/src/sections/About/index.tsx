import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Animation } from '../../components/Animation';
import { Section } from '../../components/Section';
import { useLocalDataSource } from './data';
import { PageSection } from '../../types';
import * as classes from './style.module.css';

export function AboutSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const allFiles = response.allFile.aboutFiles;
    const fileNameNeedle = props.fileName ? props.fileName : 'about';
    const result = allFiles.find((file) => {
        return file.name == fileNameNeedle;
    });
    const section = result ? result.section[0] : allFiles[0].section[0];

    return (
        <Animation type="fadeUp">
            <Section anchor={props.sectionId} heading={props.heading}>
                <div className={classes.About}>
                    <div className={classes.Description} dangerouslySetInnerHTML={{ __html: section.html }} />
                    {section.frontmatter.imageSrc && (
                        <Animation type="fadeLeft" delay={200}>
                            <div className={classes.ImageWrapper}>
                                <GatsbyImage
                                    image={section.frontmatter.imageSrc.childImageSharp.gatsbyImageData}
                                    className={classes.Image}
                                    alt={section.frontmatter.imageAlt || `About Image`}
                                />
                            </div>
                        </Animation>
                    )}
                </div>
            </Section>
        </Animation>
    );
}
