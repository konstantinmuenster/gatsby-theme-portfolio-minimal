import React from 'react';
import { graphql } from 'gatsby';
import { LegalSection, Page, Seo } from 'gatsby-theme-portfolio-minimal';

export default function PrivacyPage({ data }) {
    return (
        <>
            <Seo title="Privacy Policy" useTitleTemplate={true} noIndex={true} />
            <Page>
                <LegalSection
                    anchor="privacy"
                    heading="Privacy Policy"
                    htmlContent={data.privacySection.edges[0].node.html}
                />
            </Page>
        </>
    );
}

// This example uses Markdown as a source for the text content. But you can use any other source if you like,
// e.g. you could also write the text you would like to use directly as a prop to the component like
// htmlContent="This can be another example of providing the text content without Markdown"
export const pageQuery = graphql`
    query PrivacySection {
        privacySection: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/privacy.md/" } }) {
            edges {
                node {
                    html
                }
            }
        }
    }
`;
