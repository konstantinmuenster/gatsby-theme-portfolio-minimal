import React from 'react';
import { graphql } from 'gatsby';
import { AboutSection, ArticlesSection, HeroSection, Page, ProjectsSection, Seo } from 'gatsby-theme-portfolio-minimal';

export default function IndexPage({ data }) {
    return (
        <>
            <Seo title="IndexPage" />
            <Page>
                <HeroSection
                    anchor="hero"
                    content={{
                        iconPrefixText: 'Hello',
                        iconFileName: 'waving-hand.png',
                        title: "I'm a Gatsby Theme",
                        subtitlePrefix: 'I make portfolios ',
                        subtitleHighlight: 'awesome',
                        subtitleSuffix: '.',
                        description: 'A modern portfolio with a minimalistic design.',
                        socialProfiles: ['LinkedIn', 'Medium', 'Github', 'Mail'],
                    }}
                />
                <ArticlesSection anchor="articles" heading="Latest Articles" sources={['Medium']} maxArticles={3} />
                <AboutSection
                    anchor="about"
                    heading="About Portfolio Minimal"
                    htmlDescription={data.aboutSection.edges[0].node.html}
                    imageFileName="charles-deluvio-DgoyKNgPiFQ-unsplash.jpg"
                />
                <ProjectsSection
                    anchor="projects"
                    heading="Built-in Features"
                    maxProjects={3}
                    button={{
                        label: 'Visit on GitHub',
                        url: 'https://github.com/konstantinmuenster/gatsby-theme-portfolio-minimal',
                    }}
                />
            </Page>
        </>
    );
}

// This example uses Markdown as a source for the text content. But you can use any other source if you like,
// e.g. you could also write the text you would like to use directly as a prop to the component like
// htmlDescription="This can be another example of providing the text content without Markdown"
export const pageQuery = graphql`
    query AboutSection {
        aboutSection: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about.md/" } }) {
            edges {
                node {
                    html
                }
            }
        }
    }
`;
