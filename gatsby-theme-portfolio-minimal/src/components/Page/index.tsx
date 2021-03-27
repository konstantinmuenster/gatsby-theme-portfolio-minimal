import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { AllSettingsQueryResult } from '../../types/graphql';
import { ThemeProvider, Theme, SplashScreenProvider } from '../../context';
import { Layout } from '../Layout';

interface FeatureToggles {
    featureToggles: {
        useDarkModeAsDefault: boolean;
        useDarkModeBasedOnUsersPreference: boolean;
        useSplashScreenAnimation: boolean;
    };
}

interface PageProps {
    children: React.ReactElement;
}

export function Page(props: PageProps): React.ReactElement {
    const data: AllSettingsQueryResult<FeatureToggles> = useStaticQuery(query);
    const toggles = data.allSettings.edges[0].node.featureToggles;

    return (
        <ThemeProvider
            defaultTheme={toggles.useDarkModeAsDefault ? Theme.Dark : Theme.Light}
            enableUsersPreference={toggles.useDarkModeBasedOnUsersPreference}
        >
            <SplashScreenProvider useSplashScreenAnimation={toggles.useSplashScreenAnimation}>
                <Layout useSplashScreenAnimation={toggles.useSplashScreenAnimation}>{props.children}</Layout>
            </SplashScreenProvider>
        </ThemeProvider>
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
                    }
                }
            }
        }
    }
`;
