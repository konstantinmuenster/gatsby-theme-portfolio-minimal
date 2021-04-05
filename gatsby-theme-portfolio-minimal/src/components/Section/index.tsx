import React from 'react';
import * as classes from './style.module.css';

interface SectionProps {
    anchor: string;
    children: React.ReactElement[] | React.ReactElement;
}

export function Section(props: SectionProps): React.ReactElement {
    return (
        <section id={`#${props.anchor}`} className={classes.Section}>
            <div className={classes.ContentWrapper}>{props.children}</div>
        </section>
    );
}
