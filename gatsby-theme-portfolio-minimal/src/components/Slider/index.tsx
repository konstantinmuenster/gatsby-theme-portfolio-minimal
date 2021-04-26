import React from 'react';
import * as classes from './style.module.css';

interface SliderProps {
    additionalClasses?: string[];
    style?: React.CSSProperties;
    children: (React.ReactNode | null)[];
}

export function Slider(props: SliderProps): React.ReactElement {
    let classList;
    if (props.additionalClasses) {
        classList = props.additionalClasses.concat(classes.SlideContainer).join(' ');
    } else {
        classList = classes.SlideContainer;
    }
    return (
        <div className={classList} style={props.style}>
            {props.children}
        </div>
    );
}
