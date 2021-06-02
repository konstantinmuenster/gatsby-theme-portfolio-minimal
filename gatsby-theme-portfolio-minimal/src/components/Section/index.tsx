import React from 'react';
import * as classes from './style.module.css';

interface SectionProps {
    anchor: string;
    heading?: string;
    additionalClasses?: string[];
    children: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>((props: SectionProps, ref) => {
    let classList;
    if (props.additionalClasses) {
        classList = props.additionalClasses.concat(classes.ContentWrapper).join(' ');
    } else {
        classList = classes.ContentWrapper;
    }
    return (
        <section id={props.anchor} className={classes.Section} ref={ref}>
            <div className={classList}>
                {props.heading && <h3 className={classes.Heading}>{props.heading}</h3>}
                {props.children}
            </div>
        </section>
    );
});

Section.displayName = 'Section';
