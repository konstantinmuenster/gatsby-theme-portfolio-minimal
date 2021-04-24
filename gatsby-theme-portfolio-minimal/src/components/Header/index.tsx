import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Logo } from '../Logo';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { AllSettingsQueryResultList } from '../../types/graphql';
import { Helmet } from 'react-helmet';
import { motion, useAnimation } from 'framer-motion';
import { useGlobalState } from '../../context';
import * as classes from './style.module.css';

interface HeaderNavigation {
    navigation: {
        header: {
            displayName: string;
            url: string;
        }[];
        ctaButton: {
            openNewTab: boolean;
            displayName: string;
            url: string;
        };
    };
}

export function Header(): React.ReactElement {
    const [open, setOpen] = React.useState<boolean>(false);
    const { globalState } = useGlobalState();
    const data: AllSettingsQueryResultList<HeaderNavigation> = useStaticQuery(query);

    const isDesktopBreakpoint = useMediaQuery('(min-width: 992px)');
    const navigationData = data.allSettings.nodes[0].navigation;

    const navigationItems = (
        <>
            {navigationData.header.map((linkObject, key) => {
                return (
                    <Link
                        key={key}
                        to={linkObject.url}
                        className={classes.NavLink}
                        onClick={open ? () => setOpen(!open) : undefined}
                    >
                        {linkObject.displayName}
                    </Link>
                );
            })}
            <a
                href={navigationData.ctaButton.url}
                target={navigationData.ctaButton.openNewTab ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={classes.CtaButton}
                onClick={open ? () => setOpen(!open) : undefined}
            >
                {navigationData.ctaButton.displayName}
            </a>
        </>
    );

    const sideNavigationBar = (
        <>
            <div className={classes.Burger} onClick={() => setOpen(!open)}>
                <div style={open ? { transform: 'rotate(45deg)' } : undefined} />
                <div style={open ? { transform: 'translateX(20px)', opacity: 0 } : undefined} />
                <div style={open ? { transform: 'rotate(-45deg)' } : undefined} />
            </div>
            <div
                className={classes.SideBarWrapper}
                style={open ? { transform: 'translateX(0)', visibility: 'visible' } : undefined}
                aria-hidden={!open}
                tabIndex={open ? 1 : -1}
            >
                <nav className={classes.SideNavigationBar}>{navigationItems}</nav>
            </div>
            <div className={classes.SideBarBackdrop} style={open ? { display: 'block' } : undefined} />
        </>
    );

    const topNavigationBar = <nav className={classes.TopNavigationBar}>{navigationItems}</nav>;

    const controls = useAnimation();
    if (globalState.splashScreenDone) {
        controls.start({ opacity: 1, y: 0, transition: { delay: 0.2 } });
    }

    return (
        <motion.header className={classes.Header} initial={{ opacity: 0, y: -10 }} animate={controls}>
            {/* Make background blurry when sidebar is opened */}
            <Helmet bodyAttributes={{ class: open ? classes.Blurred : undefined }} />
            <div className={classes.ContentWrapper}>
                <Link to="/" aria-label="home">
                    <Logo fontSize="2rem" color="var(--primary-color" />
                </Link>
                {isDesktopBreakpoint ? topNavigationBar : sideNavigationBar}
            </div>
        </motion.header>
    );
}

const query = graphql`
    query HeaderNavigation {
        allSettings {
            nodes {
                navigation {
                    header {
                        displayName
                        url
                    }
                    ctaButton {
                        openNewTab
                        displayName
                        url
                    }
                }
            }
        }
    }
`;
