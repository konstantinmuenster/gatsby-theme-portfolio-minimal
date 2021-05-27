import React from 'react';
import { Section } from '../../components/Section';
import { PageSection } from '../../types';
import { getSectionBySectionId, useLocalDataSource } from './data';
import * as classes from './style.module.css';

export function LegalSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const data = getSectionBySectionId(response, props.sectionId);

    return (
        <Section anchor={props.sectionId} heading={props.heading}>
            <div className={classes.Legal} dangerouslySetInnerHTML={{ __html: data.html }} />
        </Section>
    );
}
