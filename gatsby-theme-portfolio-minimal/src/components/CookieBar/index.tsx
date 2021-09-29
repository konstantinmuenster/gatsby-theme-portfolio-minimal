import React from 'react';
import CookieConsent from 'react-cookie-consent';
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies';
import { useLocation } from '@reach/router';
import { Animation } from '../Animation';
import './style.css'; // Uses the class names from the original package
import * as classes from './style.module.css';

export function CookieBar(): React.ReactElement {
    const location = useLocation();

    return (
        <Animation className={classes.CookieBar} type="fadeUp" delay={1000}>
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
        </Animation>
    );
}
