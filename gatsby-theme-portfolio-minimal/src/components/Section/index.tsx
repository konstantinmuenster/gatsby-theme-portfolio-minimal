import React from 'react';
import * as classes from './style.module.css';

interface SectionProps {
    anchor: string;
    heading?: string;
    additionalClasses?: string[];
    children: React.ReactNode;
}

export function Section(props: SectionProps): React.ReactElement {
    let classList;
    if (props.additionalClasses) {
        classList = props.additionalClasses.concat(classes.ContentWrapper).join(' ');
    } else {
        classList = classes.ContentWrapper;
    }
    return (
        <section id={props.anchor} className={classes.Section}>
            <div className={classList}>
                {props.heading && <h3 className={classes.Heading}>{props.heading}</h3>}
                {props.children}
            </div>
        </section>
    );
}
