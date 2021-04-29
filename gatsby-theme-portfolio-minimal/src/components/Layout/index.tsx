import React from 'react';
import { Helmet } from 'react-helmet';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import '../../globalStyles/global.css';
import '../../globalStyles/theme.css';
import { Theme, useGlobalState } from '../../context';
import { SplashScreen } from '../SplashScreen';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { CookieBar } from '../CookieBar';
import { scrollToAnchor } from '../../utils/scrollToAnchor';
import * as classes from './style.module.css';

interface LayoutProps {
    children: React.ReactElement;
    useSplashScreenAnimation: boolean;
    useCookieBar: boolean;
}

export function Layout(props: LayoutProps): React.ReactElement {
    const { globalState } = useGlobalState();
    const [initialRoutingCompleted, setInitialRoutingCompleted] = React.useState<boolean>(false);
    const showSplashScreen = props.useSplashScreenAnimation && !globalState.splashScreenDone;
    const darkModeEnabled = globalState.theme === Theme.Dark;

    // Workaround: If someone opens the site with a specific section defined in the URL (like /#about),
    // the built-in scroll to anchor mechanism does not work because the selected HTML section element
    // is not attached to the DOM during the splash screen sequence. Therefore, we have to wait until
    // the splashScreen is done and then scroll to the section manually. To avoid subsequent scrollToAnchor
    // calls, we introduced a boolean initialRoutingCompleted so that we only use this workaround on
    // the initial page load. Not optimal... but it works :/
    if (!showSplashScreen && location.hash.length !== 0 && !initialRoutingCompleted) {
        setTimeout(() => scrollToAnchor(location.hash.substr(1)), 500);
        setInitialRoutingCompleted(true);
    }

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
