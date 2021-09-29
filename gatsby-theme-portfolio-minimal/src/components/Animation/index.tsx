import React from 'react';
import { useCastedRef } from '../../hooks/useCastedRef';
import { useOnScreen } from '../../hooks/useOnScreen';
import './style.css';

type AnimationType = 'fadeIn' | 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'scaleIn' | 'waving-hand';
type AnimationTiming = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
type AnimationFillMode = 'forwards' | 'backwards' | 'both' | 'none';

interface AnimationProps {
    children: React.ReactNode;
    type?: AnimationType;
    timing?: AnimationTiming;
    fillMode?: AnimationFillMode;
    delay?: number;
    duration?: number;
    iterationCount?: number;
    className?: string;
    style?: React.CSSProperties;
}

export function Animation(props: AnimationProps): React.ReactElement {
    const ref = useCastedRef<HTMLDivElement>();
    const onScreen = useOnScreen<HTMLDivElement>(ref);

    // Set defaults
    const type = props.type ?? 'fadeIn';
    const timing = props.timing ?? 'ease-out';
    const duration = props.duration ?? 200;
    const delay = props.delay ?? 0;
    const count = props.iterationCount ?? 1;
    const fillMode = props.fillMode ?? 'backwards';

    return (
        <div
            ref={ref}
            className={props.className}
            style={
                onScreen
                    ? {
                          ...props.style,
                          animationName: `${type}`,
                          animationTimingFunction: `${timing}`,
                          animationDuration: `${duration}ms`,
                          animationDelay: `${delay}ms`,
                          animationIterationCount: `${count}`,
                          animationFillMode: `${fillMode}`,
                      }
                    : { ...props.style, opacity: 0 }
            }
        >
            {props.children}
        </div>
    );
}
