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
    const data = response.allInterestsJson.sections[0];
    const [shownInterests, setShownInterests] = React.useState<number>(5);

    function loadMoreHandler() {
        setShownInterests(data.interests.length);
    }

    return (
        <Animation type="fadeUp">
            <Section anchor={props.sectionId} heading={props.heading}>
                <div className={classes.Interests}>
                    {data.interests.slice(0, shownInterests).map((interest, key) => {
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
                    {shownInterests < data.interests.length && (
                        <Animation type="scaleIn" delay={(shownInterests + 1) * 100}>
                            <Button type={ButtonType.BUTTON} onClickHandler={loadMoreHandler} label="+ Load more" />
                        </Animation>
                    )}
                </div>
            </Section>
        </Animation>
    );
}
