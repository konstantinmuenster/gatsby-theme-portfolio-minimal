import React from 'react';
import { Helmet } from 'react-helmet';
import { motion, useAnimation } from 'framer-motion';
import { useGlobalState, ActionType } from '../../context';
import { Logo } from '../Logo';
import * as classes from './style.module.css';

export function SplashScreen(): React.ReactElement {
    const { dispatch } = useGlobalState();
    const backgroundControls = useAnimation();
    const backdropControls = useAnimation();

    React.useEffect(() => {
        (async () => {
            await backgroundControls.start({
                opacity: 1,
                transition: { duration: 0.25 },
            });
            await backdropControls.start({
                height: '0%',
                transition: { delay: 0.8 },
            });
            await backgroundControls.start({
                opacity: 0,
                transition: { delay: 0.6 },
            });
            dispatch({ type: ActionType.SetSplashScreenDone, value: true });
        })();
    }, [backgroundControls, backdropControls, dispatch]);

    return (
        <motion.div className={classes.SplashScreen} initial={{ opacity: 0 }} animate={backgroundControls}>
            <Helmet bodyAttributes={{ class: 'fixed' }} />
            <div className={classes.LogoWrapper}>
                <motion.div className={classes.Backdrop} initial={{ height: '100%' }} animate={backdropControls} />
                <Logo fontSize="3rem" color="var(--background-color)" />
            </div>
        </motion.div>
    );
}
