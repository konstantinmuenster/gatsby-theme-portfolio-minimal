import React from 'react';
import { Link } from 'gatsby';
import { Logo } from '../Logo';
import { Helmet } from 'react-helmet';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useSiteConfiguration } from '../../hooks/useSiteConfiguration';
import { Animation } from '../Animation';
import * as classes from './style.module.css';

export function Header(): React.ReactElement {
    const [open, setOpen] = React.useState<boolean>(false);
    const siteConfiguration = useSiteConfiguration();
    const isDesktopBreakpoint = useMediaQuery('(min-width: 992px)');

    const navigationItems = (
        <>
            {siteConfiguration.navigation.header.map((linkObject, key) => {
                return (
                    <Link
                        key={key}
                        to={linkObject.url}
                        className={classes.NavLink}
                        onClick={!isDesktopBreakpoint ? () => setOpen(!open) : undefined}
                    >
                        {linkObject.label}
                    </Link>
                );
            })}
            <a
                href={siteConfiguration.navigation.ctaButton.url}
                target={siteConfiguration.navigation.ctaButton.openNewTab ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={classes.CtaButton}
                onClick={!isDesktopBreakpoint ? () => setOpen(!open) : undefined}
            >
                {siteConfiguration.navigation.ctaButton.label}
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

    return (
        <header className={classes.Header}>
            {/* Make background blurry when sidebar is opened */}
            <Helmet bodyAttributes={{ class: open ? classes.Blurred : undefined }} />
            <Animation className={classes.ContentWrapper} type="fadeDown">
                <Link to="/" aria-label="home">
                    <Logo fontSize="2rem" color="var(--primary-color" />
                </Link>
                {isDesktopBreakpoint ? topNavigationBar : sideNavigationBar}
            </Animation>
        </header>
    );
}
