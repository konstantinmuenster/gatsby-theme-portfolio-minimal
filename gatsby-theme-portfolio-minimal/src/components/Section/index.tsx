import React from 'react';
import * as classes from './style.module.css';

interface SectionProps {
    anchor: string;
    heading?: string;
    children: React.ReactElement[] | React.ReactElement;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>((props: SectionProps, ref) => {
    return (
        <section id={`#${props.anchor}`} className={classes.Section} ref={ref}>
            <div className={classes.ContentWrapper}>
                {props.heading && <h3>{props.heading}</h3>}
                {props.children}
            </div>
        </section>
    );
});

Section.displayName = 'Section';
