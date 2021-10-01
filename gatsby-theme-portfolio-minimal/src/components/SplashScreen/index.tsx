import React from 'react';
import { Helmet } from 'react-helmet';
import { useGlobalState, ActionType } from '../../context';
import { Logo } from '../Logo';
import { Animation } from '../Animation';
import * as classes from './style.module.css';

export function SplashScreen(): React.ReactElement {
    const [shouldUnmount, setShouldUnmount] = React.useState<boolean>(false);
    const { dispatch } = useGlobalState();

    return (
        <Animation
            className={classes.SplashScreen}
            type={shouldUnmount === false ? 'fadeIn' : 'fadeOut'}
            duration={250}
            fillMode="forwards"
            onAnimationEnd={() => {
                if (shouldUnmount) dispatch({ type: ActionType.SetSplashScreenDone, value: true });
            }}
        >
            <Helmet bodyAttributes={{ class: 'fixed' }} />
            <div className={classes.LogoWrapper}>
                <Animation
                    className={classes.Backdrop}
                    type="reduceHeight"
                    delay={800}
                    fillMode="forwards"
                    onAnimationEnd={() => {
                        // Wait 500ms and start unmounting the splash screen
                        setTimeout(() => {
                            setShouldUnmount(true);
                        }, 500);
                    }}
                />
                <Logo fontSize="3rem" color="var(--background-color)" />
            </div>
        </Animation>
    );
}
