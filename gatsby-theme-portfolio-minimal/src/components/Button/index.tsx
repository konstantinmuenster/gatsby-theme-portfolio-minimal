import React from 'react';
import { Link } from 'gatsby';
import * as classes from './style.module.css';

export enum ButtonType {
    BUTTON = 'button',
    SUBMIT = 'submit',
    LINK = 'link',
}

interface ButtonProps {
    type: ButtonType;
    label: string;
    id?: string;
    url?: string;
    externalLink?: boolean;
    onClickHandler?: () => void;
}

export function Button(props: ButtonProps): React.ReactElement {
    if (props.type === ButtonType.LINK) {
        if (!props.url) {
            throw new Error(`Button should be a ${props.type} but no URL is given!`);
        } else {
            if (props.externalLink) {
                return (
                    <a
                        id={props.id}
                        className={classes.Button}
                        href={props.url}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label="External Link"
                    >
                        {props.label}
                    </a>
                );
            } else {
                return (
                    <Link id={props.id} to={props.url} className={classes.Button}>
                        {props.label}
                    </Link>
                );
            }
        }
    } else if (props.type === ButtonType.BUTTON || props.type === ButtonType.SUBMIT) {
        if (!props.onClickHandler) {
            throw new Error(`Button should be a ${props.type} but no onClickHandler is given!`);
        }
        return (
            <button id={props.id} className={classes.Button} type={props.type} onClick={props.onClickHandler}>
                {props.label}
            </button>
        );
    } else {
        throw new Error(`Unknown button type specified.`);
    }
}
