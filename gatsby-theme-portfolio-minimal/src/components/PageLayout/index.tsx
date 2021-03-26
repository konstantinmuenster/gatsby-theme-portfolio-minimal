import React from 'react';
import '../../globalStyles/global.css';
import '../../globalStyles/theme.css';
import * as classes from './style.module.css';

interface PageLayoutProps {
    children: React.ReactElement;
}

export function PageLayout(props: PageLayoutProps): React.ReactElement {
    return (
        <>
            <div className="lightTheme">
                <h1 className={classes.Layout}>{props.children}</h1>
            </div>
        </>
    );
}
