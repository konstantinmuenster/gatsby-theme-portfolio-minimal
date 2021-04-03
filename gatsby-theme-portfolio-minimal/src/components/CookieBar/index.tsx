import React from 'react';
import CookieConsent from 'react-cookie-consent';
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies';
import { useLocation } from '@reach/router';
import { useGlobalState } from '../../context';
import { motion, useAnimation } from 'framer-motion';
import './style.css'; // Uses the class names from the original package
import * as classes from './style.module.css';

export function CookieBar(): React.ReactElement {
    const location = useLocation();
    const controls = useAnimation();
    const { globalState } = useGlobalState();

    if (globalState.splashScreenDone) {
        controls.start({ opacity: 1, y: 0, transition: { delay: 1 } });
    }

    return (
        <motion.div className={classes.CookieBar} initial={{ opacity: 0, y: 20 }} animate={controls}>
            <CookieConsent
                cookieName="gatsby-gdpr-google-analytics"
                buttonId="confirm"
                buttonText="Accept"
                declineButtonId="decline"
                declineButtonText="Decline"
                enableDeclineButton={true}
                disableStyles={true}
                onAccept={() => initializeAndTrack(location)}
            >
                <p>This website uses cookies 🍪 </p>
            </CookieConsent>
        </motion.div>
    );
}
