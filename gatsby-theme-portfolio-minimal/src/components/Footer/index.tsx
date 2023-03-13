import React from 'react';

import { Logo } from '../Logo';
import { Link } from '../Link';
import { Theme, useGlobalState } from '../../context';
import { useSiteConfiguration } from '../../hooks/useSiteConfiguration';
import * as classes from './style.module.css';

export function Footer(): React.ReactElement {
    const { globalState } = useGlobalState();
    const siteConfiguration = useSiteConfiguration();
    const darkModeEnabled = globalState.theme === Theme.Dark;

    return (
        <footer
            className={classes.Footer}
            style={{
                background: darkModeEnabled ? 'var(--background-color)' : 'var(--primary-color)',
                borderTop: darkModeEnabled ? '3px solid var(--box-shadow-hover-color)' : undefined,
            }}
        >
            <div className={classes.ContentWrapper}>
                <Link to="/" aria-label="home">
                    <Logo
                        fontSize="1.5rem"
                        color={darkModeEnabled ? 'var(--primary-color)' : 'var(--background-color)'}
                        theme={Theme.Dark}
                    />
                </Link>
                <div className={classes.Links}>
                    {siteConfiguration.navigation.footer.map((linkObject, key) => {
                        return (
                            <Link
                                key={key}
                                to={linkObject.url}
                                aria-label={linkObject.label}
                                style={{ color: darkModeEnabled ? 'var(--primary-color)' : 'var(--background-color)' }}
                            >
                                {linkObject.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
}
