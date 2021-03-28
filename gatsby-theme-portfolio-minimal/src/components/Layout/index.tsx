import React from 'react';
import { Helmet } from 'react-helmet';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '../../globalStyles/global.css';
import '../../globalStyles/theme.css';
import * as classes from './style.module.css';
import { Theme, useGlobalState } from '../../context';
import { SplashScreen } from '../SplashScreen';
import { Logo } from '../Logo';

interface LayoutProps {
    children: React.ReactElement;
    useSplashScreenAnimation: boolean;
}

export function Layout(props: LayoutProps): React.ReactElement {
    const { globalState } = useGlobalState();
    const showSplashScreen = props.useSplashScreenAnimation && !globalState.splashScreenDone;

    const splashScreenView = (
        <>
            <Helmet bodyAttributes={{ 'data-theme': Theme.Light }} />
            <SplashScreen />
        </>
    );

    const layoutView = (
        <>
            <Helmet
                bodyAttributes={{
                    'data-theme': globalState.theme === Theme.Light ? Theme.Light : Theme.Dark,
                }}
            />
            <div className={classes.Layout}>
                <header>
                    <Logo />
                </header>
                <main>{props.children}</main>
                <footer>I am the footer</footer>
            </div>
        </>
    );

    return showSplashScreen ? splashScreenView : layoutView;
}
