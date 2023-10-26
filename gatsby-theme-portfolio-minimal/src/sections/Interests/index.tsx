import React from 'react';
import { Animation } from '../../components/Animation';
import { Section } from '../../components/Section';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Button, ButtonType } from '../../components/Button';
import { PageSection } from '../../types';
import { useLocalDataSource } from './data';
import * as classes from './style.module.css';

export function InterestsSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const allFiles = response.allFile.interestsFiles;
    const fileNameNeedle = props.fileName ? props.fileName : 'interests';
    const result = allFiles.find((file) => {
        return file.name == fileNameNeedle;
    });
    const section = result ? result.section[0] : allFiles[0].section[0];
    const shouldShowButton = section.button.visible !== false;
    const initiallyShownInterests = section.button.initiallyShownInterests ?? 5;
    const [shownInterests, setShownInterests] = React.useState<number>(
        shouldShowButton ? initiallyShownInterests : section.interests.length,
    );

    function loadMoreHandler() {
        setShownInterests(section.interests.length);
    }

    return (
        <Animation type="fadeUp">
            <Section anchor={props.sectionId} heading={props.heading}>
                <div className={classes.Interests}>
                    {section.interests.slice(0, shownInterests).map((interest, key) => {
                        return (
                            <Animation key={key} className={classes.Interest} type="scaleIn" delay={key * 100}>
                                {interest.image.src && (
                                    <GatsbyImage
                                        image={interest.image.src.childImageSharp.gatsbyImageData}
                                        className={classes.Icon}
                                        alt={interest.image.alt || `Interest ${interest.label}`}
                                    />
                                )}{' '}
                                {interest.label}
                            </Animation>
                        );
                    })}
                    {shouldShowButton && shownInterests < section.interests.length && (
                        <Animation type="scaleIn" delay={(shownInterests + 1) * 100}>
                            <Button
                                type={ButtonType.BUTTON}
                                onClickHandler={loadMoreHandler}
                                label={section.button.label}
                            />
                        </Animation>
                    )}
                </div>
            </Section>
        </Animation>
    );
}
