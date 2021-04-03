import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { AllSettingsQueryResult } from '../../types/graphql';
import { GlobalStateProvider, Theme } from '../../context';
import { Layout } from '../Layout';

interface FeatureToggles {
    featureToggles: {
        useDarkModeAsDefault: boolean;
        useDarkModeBasedOnUsersPreference: boolean;
        useSplashScreenAnimation: boolean;
        useCookieBar: boolean;
    };
}

interface PageProps {
    children: React.ReactElement;
}

export function Page(props: PageProps): React.ReactElement {
    const data: AllSettingsQueryResult<FeatureToggles> = useStaticQuery(query);
    const toggles = data.allSettings.edges[0].node.featureToggles;

    return (
        <GlobalStateProvider
            defaultTheme={toggles.useDarkModeAsDefault ? Theme.Dark : Theme.Light}
            useDarkModeBasedOnUsersPreference={toggles.useDarkModeBasedOnUsersPreference}
            useSplashScreenAnimation={toggles.useSplashScreenAnimation}
        >
            <Layout useSplashScreenAnimation={toggles.useSplashScreenAnimation} useCookieBar={toggles.useCookieBar}>
                {props.children}
            </Layout>
        </GlobalStateProvider>
    );
}

const query = graphql`
    query FeatureToggles {
        allSettings {
            edges {
                node {
                    featureToggles {
                        useDarkModeAsDefault
                        useDarkModeBasedOnUsersPreference
                        useSplashScreenAnimation
                        useCookieBar
                    }
                }
            }
        }
    }
`;
