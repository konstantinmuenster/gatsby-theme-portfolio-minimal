import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '../../globalStyles/global.css';
import '../../globalStyles/theme.css';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Theme, useGlobalState } from '../../context';
import { SplashScreen } from '../SplashScreen';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { CookieBar } from '../CookieBar';
import * as classes from './style.module.css';

interface LayoutProps {
    children: React.ReactElement;
    useSplashScreenAnimation: boolean;
    useCookieBar: boolean;
}

export function Layout(props: LayoutProps): React.ReactElement {
    const { globalState } = useGlobalState();
    const showSplashScreen = props.useSplashScreenAnimation && !globalState.splashScreenDone;
    const darkModeEnabled = globalState.theme === Theme.Dark;

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
                    'data-theme': darkModeEnabled ? Theme.Dark : Theme.Light,
                }}
            />
            <div className={classes.Layout}>
                <Header />
                <main>{props.children}</main>
                <Footer />
                {props.useCookieBar && <CookieBar />}
            </div>
        </>
    );

    return showSplashScreen ? splashScreenView : layoutView;
}
