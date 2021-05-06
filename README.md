<img src="screenshot.png" alt="Gatsby Theme Portfolio Minimal Screenshot" width="600" />

---

[![Netlify Status](https://api.netlify.com/api/v1/badges/ca0e691f-4d6f-4a70-8d91-e94a0843c7e2/deploy-status)](https://app.netlify.com/sites/gatsby-theme-portfolio-minimal/deploys)

# Gatsby Theme Portfolio Minimal

#### A modern one-page portfolio with a clean yet expressive design.

<a href="#features">Features</a> · <a href="#installation">Installation</a> · <a href="#configuration">Configuration</a> · <a href="#issues">Issues</a>

Portfolio Minimal is a Gatsby Starter. Starters are boilerplate projects that can be used to set up new sites effortless. With this starter, you can create a modern one-page portfolio within minutes.

Portfolio Minimal is a Gatsby Theme. You can install it as a dependency in your project and use its building blocks to create your own site - effortless and within minutes.

Just install the theme, add the content. That's it!

**[🧐 Example GitHub Project](https://github.com/konstantinmuenster/gatsby-theme-portfolio-minimal/tree/main/example-site) that uses the theme.**

**[🦸 Live Demo](https://gatsby-theme-portfolio-minimal.netlify.app/) how it looks.**

---

## Features

#### 🕹️ Quick and Easy Setup - Add content and deploy.

Just install the theme, add content for each section, and deploy! This theme works seamlessly with hosts like Netlify.

#### 🧰 Predefined Sections - The building blocks for your portfolio.

Each section (e.g. About Me, Projects) is a standalone React component. You can add them to your portfolio as you like.

#### 📓 Content Integration - Effortless without any CMS.

You can add the content easily - either by passing the text as plain props or by pulling it from Markdown files in advance.

#### 💅 Responsive Design - With freshening animations.

The theme is designed with a mobile-first approach and looks perfect on small and large breakpoints. Moreover, it has some nice and smooth animations.

#### 🍪 [NEW] Cookie Consent Bar - Be ready for GDPR-compliant tracking.

Add tracking services like Google Analytics to your site and display a GDPR-compliant cookie consent banner.

#### 🌛 [NEW] Dark Mode - Based on user's preferences.

If the user's OS is set to using dark mode, the Gatsby Starter will automatically switch to a dark theme too.

---

## Installation

[Gatsby Themes](https://www.gatsbyjs.com/docs/themes/) are regular Node packages that can be installed like any other package via npm or yarn.

To install Gatsby Theme Portfolio Minimal, you need to have an existing Gatsby project. If you have one, you can skip the next part and follow the instructions in the part for existing projects.

### For A New Project

If you are creating a new site and want to use the Gatsby Theme Portfolio Minimal, you can use the Gatsby Theme Portfolio Minimal Starter. This will generate a new site that already has the theme pre-configured.

1. Install the Gatsby CLI

    ```sh
    npm install -g gatsby-cli
    ```

2. Create a new Gatsby site with the Portfolio Minimal Theme Starter.

    ```sh
    gatsby new portfolio-minimal https://github.com/konstantinmuenster/gatsby-starter-portfolio-minimal-theme
    ```

### For An Existing Project

If you already have a site you’d like to add the theme to, you can install it and manually configure it.

1. Install the Gatsby Theme Portfolio Minimal via npm or yarn.

    ```sh
    npm install gatsby-theme-portfolio-minimal
    ```

2. Add the theme to your `gatsby-config.js` file.

    ```js
    module.exports = {
        plugins: [`gatsby-theme-portfolio-minimal`],
    };
    ```

3. Run development mode to initialize the theme's configuration files.

    ```sh
    gatsby develop
    ```

4. By default, this creates a `content` directory at the root of your Gatsby site. You can now edit the theme settings as well as add content for your sections (e.g. images).

5. To use a section, you can import it as regular React component in your page.

    ```js
    import { ArticlesSection, Page, Seo } from 'gatsby-theme-portfolio-minimal';

    export default function IndexPage({ data }) {
        return (
            <>
                <Seo title="IndexPage" />
                <Page useSplashScreenAnimation>
                    <ArticlesSection anchor="articles" heading="Latest Articles" sources={['Medium']} maxArticles={3} />
                </Page>
            </>
        );
    }
    ```

### Example Project on GitHub

This repository also contains an [example-site](https://github.com/konstantinmuenster/gatsby-theme-portfolio-minimal/tree/main/example-site), so that you can see how the theme integrates in an existing Gatsby site.

---

## Configuration

I tried to leave as much configuration as possible to you as a developer. This allows the theme to be highly flexible and adjustable to your needs.

### Configuring `settings.json`

```json
{
    "siteMetadata": {
        "title": "Gatsby Theme Portfolio Minimal",
        "titleTemplate": "%s · A Gatsby Theme",
        "description": "A Gatsby Theme to create a clean one-page portfolio with Markdown content.",
        "author": "Konstantin Münster",
        "siteUrl": "https://example.com",
        "language": "en"
    },
    "logo": { "text": "Gatsby" },
    "navigation": {
        "header": [
            { "displayName": "About", "url": "/#about" },
            { "displayName": "Features", "url": "/#features" },
            { "displayName": "Github", "url": "/#github" }
        ],
        "ctaButton": {
            "openNewTab": true,
            "displayName": "Resume",
            "url": "/resume.pdf"
        },
        "footer": [
            { "displayName": "Privacy", "url": "/privacy" },
            { "displayName": "Imprint", "url": "/imprint" }
        ]
    },
    "featureToggles": {
        "useDarkModeAsDefault": false,
        "useDarkModeBasedOnUsersPreference": true,
        "useCookieBar": false
    }
}
```

### Configuring `gatsby-config.js`

```js
module.exports = {
    plugins: [
        {
            resolve: 'gatsby-theme-portfolio-minimal',
            options: {
                favicon: '', // e.g. "./content/favicon.png"
                siteUrl: 'https://example.com', // Used for sitemap generation
                manifestSettings: {
                    siteName: 'My Minimal Portfolio', // Used in manifest.json
                    shortName: 'Portfolio', // Used in manifest.json
                    startUrl: '/', // Used in manifest.json
                    backgroundColor: '#FFFFFF', // Used in manifest.json
                    themeColor: '#000000', // Used in manifest.json
                    display: 'minimal-ui', // Used in manifest.json
                },
                googleAnalytics: {
                    trackingId: 'UA-XXXXXX-X',
                    anonymize: true, // Default true
                    environments: ['production', 'development'], // Default ["production"]
                },
            },
        },
    ],
};
```

### Using Your Own Color Theme

Internally, the Portfolio Minimal theme uses CSS variables to ensure a consistent color scheme. You can override these colors by using the [concept of shadowing](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/) Gatsby offers. To do this, follow the instructions:

1. Create a file called `theme.css` in the following path: `{GatsbyProjectRoot}/src/gatsby-theme-portfolio-minimal/src/globalStyles`.

2. Add the following contents to the file and adjust the colors as you like. Do not change the names of the variables!

    ```css
    body[data-theme='lightTheme'] {
        --primary-color: #000000;
        --secondary-color: #fff4d9;
        --tertiary-color: #f2f2f2;
        --text-color: #000000;
        --subtext-color: #555555;
        --background-color: #ffffff;
        --card-background-color: #ffffff;
        --scroll-bar-color: rgba(0, 0, 0, 0.5);
        --box-shadow-color: rgba(0, 0, 0, 0.16);
        --box-shadow-hover-color: rgba(0, 0, 0, 0.32);
        --base-font: 'Roboto', Arial, sans-serif;
    }

    body[data-theme='darkTheme'] {
        --primary-color: #fafafa;
        --secondary-color: #2a2926;
        --tertiary-color: #252525;
        --text-color: rgba(255, 255, 255, 0.87);
        --subtext-color: #aaaaaa;
        --background-color: #121212;
        --card-background-color: #1c1c1c;
        --scroll-bar-color: rgba(255, 255, 255, 0.5);
        --box-shadow-color: rgba(0, 0, 0, 0.16);
        --box-shadow-hover-color: rgba(0, 0, 0, 0.32);
        --base-font: 'Roboto', Arial, sans-serif;
    }
    ```

---

## Issues?

If you find any bugs or have feature suggestions, create a new issue or pull request 🙏

Thanks a lot for using this starter! 💪

---

<a href="https://www.buymeacoffee.com/kmuenster" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

Konstantin Münster – [konstantin.digital](https://konstantin.digital)
