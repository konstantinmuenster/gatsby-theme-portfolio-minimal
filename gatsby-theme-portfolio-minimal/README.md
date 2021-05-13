# Gatsby Theme Portfolio Minimal

#### A modern one-page portfolio with a clean yet expressive design.

Portfolio Minimal is a Gatsby Theme. You can install it as a dependency in your project and use its building blocks to create your own site - effortless and within minutes.

**Example Project on GitHub**

This repository also contains an [example-site](https://github.com/konstantinmuenster/gatsby-theme-portfolio-minimal/tree/main/example-site), so that you can see how the theme integrates in an existing Gatsby site.

---

## Table of Contents

-   [Installation](#installation)
    -   [Setup A New Gatsby Site With Portfolio Minimal](#setup-a-new-gatsby-site-with-portfolio-minimal)
    -   [Add Portfolio Minimal To An Existing Gatsby Site](#add-portfolio-minimal-to-an-existing-gatsby-site)
-   [Getting Started](#getting-started)
    -   [Create Your First Page](#create-your-first-page)
    -   [Using The Content Directory](#using-the-content-directory)
    -   [Using Images](#using-images)
    -   [Using Markdown Content](#using-markdown-content)
    -   [Theme Components](#theme-components)
-   [Customization](#customization)
    -   [Configuring the Theme Settings](#configuring-the-theme-settings)
    -   [Changing the Color Scheme](#changing-the-color-scheme)
-   [Issues](#issues)

---

## Installation

In general, [Gatsby Themes](https://www.gatsbyjs.com/docs/themes/) are regular Node packages that can be installed like any other package via npm or yarn.

To use Gatsby Theme Portfolio Minimal, you need to have a Gatsby project. If you have an existing one, you can skip the next part and follow the instructions for adding Portfolio Minimal to an existing Gatsby site.

### Setup A New Gatsby Site With Portfolio Minimal

If you are creating a new site and want to use the Gatsby Theme Portfolio Minimal, you can use the Gatsby Theme Portfolio Minimal Starter. This will generate a new site that already has the theme pre-configured.

1. Install the Gatsby CLI

    ```sh
    npm install -g gatsby-cli
    ```

2. Create a new Gatsby site with the Portfolio Minimal Starter.

    ```sh
    gatsby new portfolio-minimal https://github.com/konstantinmuenster/gatsby-starter-portfolio-minimal-theme
    ```

3. Once installed, you can begin developing your site.

    ```sh
    gatsby develop
    ```

4. By default, the Portfolio Minimal Starter has a `content` directory at the root of your Gatsby site. There, you can edit the theme settings as well as add content for your sections (e.g. images). To learn more about it, see this section: [Using The Content Directory](#using-the-content-directory)

### Add Portfolio Minimal To An Existing Gatsby Site

If you already have a site you’d like to add the theme to, you can install it and manually configure it.

1. Install the Gatsby Theme Portfolio Minimal via npm or yarn.

    ```sh
    npm install gatsby-theme-portfolio-minimal
    ```

2. Add the theme to the plugin list in your `gatsby-config.js` file.

    ```js
    module.exports = {
        plugins: [`gatsby-theme-portfolio-minimal`],
    };
    ```

3. Run development mode to initialize the theme's configuration files.

    ```sh
    gatsby develop
    ```

4. By default, this creates a `content` directory at the root of your Gatsby site. There, you can edit the theme settings as well as add content for your sections (e.g. images). To learn more about it, see this section: [Using The Content Directory](#using-the-content-directory)

---

## Getting Started

The concept behind themes is easy. You have the theme installed as a npm package which allows you to extract certain functionalities from it when building your site. In the case of Portfolio Minimal, you can extract and configure various components that can be used as building blocks to construct a page. Let's see how it works!

### Creating Your First Page

1. Creating pages with Portfolio Minimal can be done within minutes. To make it work, you have to create a new file within the `pages` directory of your site. This is where all pages are located in a Gatsby site.

    ```
    portfolio-minimal-site
        ├── src
        │ └── pages
        │     └── first-page.js
        ├── gatsby-config.js
        └── package.json
    ```

    **Note** that the file name will be used as a URL route. So in our example, the page can be requested on the `/first-page` route.

2. Inside `first-page.js`, we create a React component which will be exported by default. The component uses the `Page` and `Seo` elements which are being imported from the `gatsby-theme-portfolio-minimal` package. While the `Page` component is mandatory to construct a page with Portfolio Minimal, `Seo` isn't (but recommended).

    ```js
    import { Page, Seo } from 'gatsby-theme-portfolio-minimal';

    export default function FirstPage() {
        return (
            <>
                <Seo title="FirstPage" />
                <Page useSplashScreenAnimation>...</Page>
            </>
        );
    }
    ```

    **Note** that we pass `useSplashScreenAnimation` as a prop to the `Page` component. To find out more about how you can configure the theme's components, check out this section: [Theme Components](#theme-components)

3. Now that we have our basic page layout set up, we can start adding sections to the page. It basically works the same as before: You import components from the `gatsby-theme-portfolio-minimal` package which then can be configured and used in your page.

    ```js
    import { ArticlesSection, Page, Seo } from 'gatsby-theme-portfolio-minimal';

    export default function FirstPage() {
        return (
            <>
                <Seo title="FirstPage" />
                <Page useSplashScreenAnimation>
                    <ArticlesSection anchor="articles" heading="Latest Articles" sources={['Medium']} />
                </Page>
            </>
        );
    }
    ```

4. That's it! You can now visit your page on `/first-page`. To see which components are available to create pages, have a look at [Theme Components](#theme-components).

### Using The Content Directory

Portfolio Minimal aims to separate content from code. That's why most content should live in its own directory. This is, by default, a folder at the root of your site called `content`.

In the content directory, you have your `settings.json` file which is responsible for configuring global settings for your site as well as content-type-specific folders (by default: `images`, `json`).

#### The settings.json file

If you want to learn which settings you can configure, switch to the [Customization](#customization) part of the documentation.

#### The images Folder

If you want to learn more about how to use images with Portfolio Minimal, switch to the [Using Images](#using-images) part of the documentation.

#### The json Folder

The `json` folder contains all the content that is best stored in a structured format. This content is used in associated section components. Have a look at the table to see which files are used for what:

| File Name             | Used As Data Source In      | Example                                                                                                                                      |
| --------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `interests.json`      | InterestsSection            | [Example File](https://github.com/konstantinmuenster/gatsby-theme-portfolio-minimal/blob/main/example-site/content/json/interests.json)      |
| `projects.json`       | ProjectsSection             | [Example File](https://github.com/konstantinmuenster/gatsby-theme-portfolio-minimal/blob/main/example-site/content/json/projects.json)       |
| `socialProfiles.json` | HeroSection, ContactSection | [Example File](https://github.com/konstantinmuenster/gatsby-theme-portfolio-minimal/blob/main/example-site/content/json/socialProfiles.json) |

### Using Images

**_tba_**

### Using Markdown Content

Just as we put structured JSON content in our separate content directory, we can do so with text-heavy content too. A simple solution would be to use Markdown for that.

To add Markdown content, follow these steps:

1. Install the required Gatsby plugins to add Markdown as a data source.

    ```sh
    npm install gatsby-source-filesystem gatsby-transformer-remark
    ```

2. Add both plugins to your `gatsby-config.js` and configure the source filesystem plugin. The path represents the directory in which your Markdown files are stored. It is recommended to use a folder right next to our other content folders like `json` and `images`.

    ```js
    module.exports = {
        plugins: [
            {
                resolve: `gatsby-source-filesystem`,
                options: {
                    path: `${__dirname}/content/markdown`,
                    name: `markdown`,
                },
            },
            `gatsby-transformer-remark`,
        ],
    };
    ```

3. Next, we can create our first Markdown file, e.g. an `about.md` file for the About Me text.

    ```md
    **Portfolio Minimal** is a Gatsby Theme that creates outstanding one-pages portfolio within minutes!
    ```

4. To use and display the file contents, we need to write a GraphQL pageQuery that loads the content from the Markdown file and passes it as a prop called `data` to our page component. From it, we can extract the HTML we need for our AboutSection component.

    ```js
    import React from 'react';
    import { graphql } from 'gatsby';
    import { AboutSection, Page, Seo } from 'gatsby-theme-portfolio-minimal';

    export default function IndexPage({ data }) {
        return (
            <>
                <Seo title="Gatsby Theme Portfolio Minimal" />
                <Page useSplashScreenAnimation>
                    <AboutSection
                        anchor="about"
                        heading="About Portfolio Minimal"
                        htmlDescription={data.aboutSection.edges[0].node.html}
                        imageFileName="charles-deluvio-DgoyKNgPiFQ-unsplash.jpg"
                    />
                </Page>
            </>
        );
    }

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
    ```

If you want to learn more about using Gatsby with Markdown, check out the docs: [How To Use Gatsby With Markdown](https://www.gatsbyjs.com/guides/markdown/).

### Theme Components

Portfolio Minimal provides several components which you can use to build your individual portfolio site. In general, we can differentiate between layout components, metadata components, and section components.

**Layout Components**

1. [`<Page />`](#page-component)

**Metadata Components**

1. [`<Seo />`](#seo-component)

**Section Components**

1. [`<AboutSection />`](#aboutsection-component)
2. [`<ArticlesSection />`](#articlessection-component)
3. [`<ContactSection />`](#contactsection-component)
4. [`<HeroSection />`](#herosection-component)
5. [`<InterestsSection />`](#interestssection-component)
6. [`<LegalSection />`](#legalsection-component)
7. [`<ProjectsSection />`](#projectssection-component)

#### Page Component

The Page component is mandatory to construct a page. It provides the basic layout as well as header and footer. You can use it to wrap your page content within.

| Available Props          | Type                 | Default | Description                                                             |
| ------------------------ | -------------------- | ------- | ----------------------------------------------------------------------- |
| useSplashScreenAnimation | boolean _(optional)_ | `false` | Whether or not the page should use the splash screen animation sequence |

#### Seo Component

The Seo component can be used to enrich your page with SEO metadata, such as title, description, etc. It is recommended to include a Seo component on each page.

| Available Props  | Type                 | Default | Description                                                                                          |
| ---------------- | -------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| title            | string _(required)_  | -       | Defines the SEO title                                                                                |
| useTitleTemplate | boolean _(optional)_ | `false` | Whether or not the title template defined from settings.json should be used to construct a SEO title |
| description      | string _(optional)_  | -       | Defines the SEO description                                                                          |
| noIndex          | boolean _(optional)_ | `false` | Whether or not the page should be indexed by search engines                                          |

#### AboutSection Component

The AboutSection component can be used to display a descriptive text in combination with an image.

| Available Props | Type                | Default | Description                                                                                                                                                                                          |
| --------------- | ------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| anchor          | string _(required)_ | -       | Defines the anchor tag for the section. If you want to use a link to the section in your navigation, this anchor tag should be used. **Note:** The anchor should be defined without a preceding `#`. |
| heading         | string _(optional)_ | -       | Defines the heading of the section.                                                                                                                                                                  |
| htmlDescription | string _(required)_ | -       | Defines the descriptive text of the section. HTML tags can be used.                                                                                                                                  |
| imageFileName   | string _(required)_ | -       | File name for the image that should be displayed. The image must be stored in the `images` folder within your content directory.                                                                     |

#### ArticlesSection Component

The ArticlesSection component can be used to display your latest articles as linked cards. Currently, it is only possible to use Medium as a source for articles.

| Available Props | Type                  | Default | Description                                                                                                                                                                                          |
| --------------- | --------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| anchor          | string _(required)_   | -       | Defines the anchor tag for the section. If you want to use a link to the section in your navigation, this anchor tag should be used. **Note:** The anchor should be defined without a preceding `#`. |
| heading         | string _(optional)_   | -       | Defines the heading of the section.                                                                                                                                                                  |
| sources         | string[] _(required)_ | -       | Defines which sources should be used to collect your latest articles from. Available sources: `"Medium"`                                                                                             |
| maxArticles     | number _(optional)_   | `3`     | Defines how many articles should be displayed at most.                                                                                                                                               |

#### ContactSection Component

The ContactSection component can be used to display your contact details in combination with a profile image.

| Available Props | Type                  | Default | Description                                                                                                                                                                                                                       |
| --------------- | --------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| anchor          | string _(required)_   | -       | Defines the anchor tag for the section. If you want to use a link to the section in your navigation, this anchor tag should be used. **Note:** The anchor should be defined without a preceding `#`.                              |
| heading         | string _(optional)_   | -       | Defines the heading of the section.                                                                                                                                                                                               |
| description     | string _(optional)_   | -       | Defines the descriptive text between heading and contact details.                                                                                                                                                                 |
| imageFileName   | string _(required)_   | -       | File name for your profile image. The image must be stored in the `images` folder within your content directory.                                                                                                                  |
| name            | string _(required)_   | -       | Defines your name that should be displayed in the contact details.                                                                                                                                                                |
| email           | string _(required)_   | -       | Defines your email address that should be displayed in the contact details.                                                                                                                                                       |
| socialProfiles  | string[] _(optional)_ | -       | Defines which social profiles should be displayed in the contact details. Each entry of the array must have an associated profile in socialProfiles.json. Available profiles: `"Mail", "LinkedIn", "Github", "Behance", "Medium"` |

#### HeroSection Component

The HeroSection component is intended to be used as the very first section of your page. It displays a short summary what your portfolio is all about.

| Available Props           | Type                  | Default | Description                                                                                                                                                                                                                      |
| ------------------------- | --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| anchor                    | string _(required)_   | -       | Defines the anchor tag for the section. If you want to use a link to the section in your navigation, this anchor tag should be used. **Note:** The anchor should be defined without a preceding `#`.                             |
| content.iconPrefixText    | string _(optional)_   | -       | Defines the text left to the emoji / icon (e.g. used for a greeting).                                                                                                                                                            |
| content.iconFileName      | string _(optional)_   | -       | File name for your emoji / icon. The image file must be stored in the `images` folder within your content directory.                                                                                                             |
| content.title             | string _(required)_   | -       | Defines the title text (e.g. who are you?)                                                                                                                                                                                       |
| content.subtitlePrefix    | string _(required)_   | -       | Defines the first part of the subtitle.                                                                                                                                                                                          |
| content.subtitleHighlight | string _(required)_   | -       | Defines the highlighted part of the subtitle.                                                                                                                                                                                    |
| content.subtitleSuffix    | string _(required)_   | -       | Defines the last part of the subtitle.                                                                                                                                                                                           |
| content.description       | string _(optional)_   | -       | Defines a descriptive text below the subtitle.                                                                                                                                                                                   |
| content.socialProfiles    | string[] _(optional)_ | -       | Defines which social profiles should be displayed below the description. Each entry of the array must have an associated profile in socialProfiles.json. Available profiles: `"Mail", "LinkedIn", "Github", "Behance", "Medium"` |

#### InterestsSection Component

The InterestsSection component can be used to display several topics you are interested in or are interesting for the reader. It uses a list of interests that are stored in interests.json.

| Available Props | Type                | Default | Description                                                                                                                                                                                          |
| --------------- | ------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| anchor          | string _(required)_ | -       | Defines the anchor tag for the section. If you want to use a link to the section in your navigation, this anchor tag should be used. **Note:** The anchor should be defined without a preceding `#`. |
| heading         | string _(optional)_ | -       | Defines the heading of the section.                                                                                                                                                                  |
| initiallyShown  | number _(optional)_ | -       | Defines how many items should be initially visible. If there are more items than the number of initially shown, a "Show More" button is displayed.                                                   |

#### LegalSection Component

The LegalSection component can be used to display long texts (e.g. imprint, privacy policy) in a well formatted manner.

| Available Props | Type                | Default | Description                                                                                                                                                                                          |
| --------------- | ------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| anchor          | string _(required)_ | -       | Defines the anchor tag for the section. If you want to use a link to the section in your navigation, this anchor tag should be used. **Note:** The anchor should be defined without a preceding `#`. |
| heading         | string _(optional)_ | -       | Defines the heading of the section.                                                                                                                                                                  |
| htmlContent     | string _(required)_ | -       | Defines the content of the page. HTML tags can be used.                                                                                                                                              |

#### ProjectsSection Component

The ProjectsSection component can be used to display several projects / features with an image, a description, and external links. Each project must be defined in projects.json.

| Available Props | Type                | Default | Description                                                                                                                                                                                          |
| --------------- | ------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| anchor          | string _(required)_ | -       | Defines the anchor tag for the section. If you want to use a link to the section in your navigation, this anchor tag should be used. **Note:** The anchor should be defined without a preceding `#`. |
| heading         | string _(optional)_ | -       | Defines the heading of the section.                                                                                                                                                                  |
| maxProjects     | number _(optional)_ | `4`     | Defines how many projects should be displayed the most.                                                                                                                                              |
| button.label    | string _(optional)_ | -       | Defines the label of the button that is displayed below the projects.                                                                                                                                |
| button.url      | string _(optional)_ | -       | Defines the url of the button that is displayed below the projects.                                                                                                                                  |

---

## Customization

I tried to leave as much configuration as possible to you as a developer. This allows the theme to be highly flexible and adjustable to your needs.

### Configuring the Theme Settings

The theme settings can be divided in two parts. There is a `settings.json` file inside the content directory which is the main spot to configure your site. Also, you can set some settings for the theme inside your `gatsby-config.js`. These options are used to configure some plugins which Portfolio Minimal uses under the hood.

#### Configuring `settings.json`

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

#### Configuring `gatsby-config.js`

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

### Changing the Color Scheme

Internally, Portfolio Minimal uses CSS variables to ensure a consistent color scheme across the site. You can override these colors by using the [concept of shadowing](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/) Gatsby offers. To do this, follow the instructions:

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
