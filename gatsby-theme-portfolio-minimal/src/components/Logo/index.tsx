import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { AllSettingsQueryResult } from '../../types/graphql';
import * as classes from './style.module.css';

interface Logo {
    logo: {
        text: string;
    };
}

interface LogoProps {
    fontSize?: string;
    color?: string;
}

export function Logo(props: LogoProps): React.ReactElement {
    const data: AllSettingsQueryResult<Logo> = useStaticQuery(query);
    const fontSize = props.fontSize || '2rem';
    const color = props.color || 'var(--primary-color)';

    return (
        <div className={classes.Logo} aria-roledescription="logo" style={{ fontSize, color }}>
            {data.allSettings.edges[0].node.logo.text}
        </div>
    );
}

const query = graphql`
    query Logo {
        allSettings {
            edges {
                node {
                    logo {
                        text
                    }
                }
            }
        }
    }
`;
