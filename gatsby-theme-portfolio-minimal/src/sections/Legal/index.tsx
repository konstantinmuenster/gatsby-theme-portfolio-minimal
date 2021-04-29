import React from 'react';
import { Section } from '../../components/Section';
import * as classes from './style.module.css';

interface LegalSectionProps {
    anchor: string;
    heading?: string;
    htmlContent: string;
}

export function LegalSection(props: LegalSectionProps): React.ReactElement {
    return (
        <Section anchor={props.anchor} heading={props.heading}>
            <div className={classes.Legal} dangerouslySetInnerHTML={{ __html: props.htmlContent }} />
        </Section>
    );
}
