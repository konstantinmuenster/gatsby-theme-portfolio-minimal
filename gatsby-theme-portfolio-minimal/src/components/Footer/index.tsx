import React from 'react';
import { graphql, Link } from 'gatsby';
import { Logo } from '../Logo';
import { Theme, useGlobalState } from '../../context';
import * as classes from './style.module.css';
import { useStaticQuery } from 'gatsby';
import { AllSettingsQueryResultList } from '../../types/graphql';

interface FooterNavigation {
    navigation: {
        footer: {
            displayName: string;
            url: string;
        }[];
    };
}

export function Footer(): React.ReactElement {
    const data: AllSettingsQueryResultList<FooterNavigation> = useStaticQuery(query);
    const { globalState } = useGlobalState();
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
                    />
                </Link>
                <div className={classes.Links}>
                    {data.allSettings.nodes[0].navigation.footer.map((linkObject, key) => {
                        return (
                            <Link
                                key={key}
                                to={linkObject.url}
                                aria-label={linkObject.displayName}
                                style={{ color: darkModeEnabled ? 'var(--primary-color)' : 'var(--background-color)' }}
                            >
                                {linkObject.displayName}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
}

const query = graphql`
    query FooterNavigation {
        allSettings {
            nodes {
                navigation {
                    footer {
                        displayName
                        url
                    }
                }
            }
        }
    }
`;
