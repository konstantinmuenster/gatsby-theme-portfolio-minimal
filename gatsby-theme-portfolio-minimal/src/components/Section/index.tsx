import React from 'react';
import * as classes from './style.module.css';

interface SectionProps {
    anchor: string;
    heading?: string;
    children: React.ReactElement[] | React.ReactElement;
}

export function Section(props: SectionProps): React.ReactElement {
    return (
        <section id={`#${props.anchor}`} className={classes.Section}>
            <div className={classes.ContentWrapper}>
                {props.heading && <h3>{props.heading}</h3>}
                {props.children}
            </div>
        </section>
    );
}
