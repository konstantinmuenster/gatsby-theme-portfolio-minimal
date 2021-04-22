import React from 'react';
import * as classes from './style.module.css';

interface SliderProps {
    additionalClasses?: string[];
    children: (React.ReactElement | null)[];
}

export function Slider(props: SliderProps): React.ReactElement {
    let classList;
    if (props.additionalClasses) {
        classList = props.additionalClasses.concat(classes.SlideContainer).join(' ');
    } else {
        classList = classes.SlideContainer;
    }
    return <div className={classList}>{props.children}</div>;
}
