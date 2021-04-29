import React from 'react';
import { graphql } from 'gatsby';
import { LegalSection, Page, Seo } from 'gatsby-theme-portfolio-minimal';

export default function ImprintPage({ data }) {
    return (
        <>
            <Seo title="Imprint" useTitleTemplate={true} noIndex={true} />
            <Page>
                <LegalSection anchor="imprint" heading="Imprint" htmlContent={data.imprintSection.edges[0].node.html} />
            </Page>
        </>
    );
}

// This example uses Markdown as a source for the text content. But you can use any other source if you like,
// e.g. you could also write the text you would like to use directly as a prop to the component like
// htmlContent="This can be another example of providing the text content without Markdown"
export const pageQuery = graphql`
    query ImprintSection {
        imprintSection: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/imprint.md/" } }) {
            edges {
                node {
                    html
                }
            }
        }
    }
`;
