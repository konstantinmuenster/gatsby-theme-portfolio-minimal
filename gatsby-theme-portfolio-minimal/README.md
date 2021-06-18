# Gatsby Theme Portfolio Minimal

#### A modern one-page portfolio with a clean yet expressive design.

Portfolio Minimal is a Gatsby Theme. You can install it as a dependency in your project and use its building blocks to create your own site - effortless and within minutes.

**Example Project on GitHub**

This repository also contains an [example-site](https://github.com/konstantinmuenster/gatsby-theme-portfolio-minimal/tree/main/example-site) that shows how the theme integrates into a Gatsby site.

---

## Table of Contents

-   [Installation](#installation)
    -   [Set Up A New Gatsby Site With Portfolio Minimal](#set-up-a-new-gatsby-site-with-portfolio-minimal)
    -   [Add Portfolio Minimal To An Existing Gatsby Site](#add-portfolio-minimal-to-an-existing-gatsby-site)
-   [Getting Started](#getting-started)
    -   [Creating Your First Page](#creating-your-first-page)
    -   [Using The Content Directory](#using-the-content-directory)
    -   [Using The Blog Integration Feature](#using-the-blog-integration-feature)
    -   [Using Sections And Other Theme Components](#using-sections-and-other-theme-components)
-   [Customization](#customization)
    -   [Configuring the Theme Settings](#configuring-the-theme-settings)
    -   [Changing the Color Scheme](#changing-the-color-scheme)
-   [Issues](#issues)

---

## Installation

In general, [Gatsby Themes](https://www.gatsbyjs.com/docs/themes/) are regular Node packages that can be installed like any other package via npm or yarn.

To use Gatsby Theme Portfolio Minimal, you need to have a Gatsby project. If you have an existing one, you can skip the next part and follow the instructions for adding Portfolio Minimal to an existing Gatsby site.

### Set up A New Gatsby Site With Portfolio Minimal

If you are creating a new site and want to use the Gatsby Theme Portfolio Minimal, you can use the Gatsby Starter Portfolio Minimal Theme. This will generate a new site that already has the theme pre-configured.

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
    cd portfolio-minimal
    gatsby develop
    ```

4. By default, the Portfolio Minimal Starter has a `content` directory at the root of your Gatsby site. There, you can edit the theme settings as well as add content for your sections. To learn more about it, see this section: [Using The Content Directory](#using-the-content-directory)

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

4. By default, this creates a `content` directory at the root of your Gatsby site. There, you can edit the theme settings as well as add content for your sections. To learn more about it, see this section: [Using The Content Directory](#using-the-content-directory)

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

2. Inside `first-page.js`, we create a React component which will be exported by default. The `FirstPage` component uses the `Page` and `Seo` components which are being imported from the `gatsby-theme-portfolio-minimal` package. While the `Page` component is mandatory to construct a page with Portfolio Minimal, `Seo` isn't (but recommended).

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
    import { AboutSection, Page, Seo } from 'gatsby-theme-portfolio-minimal';

    export default function FirstPage() {
        return (
            <>
                <Seo title="FirstPage" />
                <Page useSplashScreenAnimation>
                    <AboutSection sectionId="about" heading="About Portfolio Minimal" />
                </Page>
            </>
        );
    }
    ```

4. That's it! You can now visit your page on `/first-page`. To see which components are available to create pages, have a look at [Theme Components](#theme-components).

### Using The Content Directory

The theme was designed with the following paradigms in mind:

1. **Portfolio Minimal aims to separate content from code.** That's why almost all content should live in its own directory. This is, by default, a folder at the root of your site called `content`. A different root content directory can be specified via `gatsby-config.js`.

2. **The theme completely capsules all data sourcing for you.** Hence, there is no need to configure any data sources. You just have to place your content files in the right directory and it just works ;)

This is how the content directory is structured:

```sh
content # can be specified in gatsby-config.js
    ├── articles # mandatory folder, cannot be renamed
    ├── images # mandatory folder, cannot be renamed
    ├── sections # mandatory folder, cannot be renamed
    └── settings.json # mandatory file, cannot be renamed
```

#### `articles` Folder

This is where all your blog posts live (if you use the blog integration feature). Each blog post should have its own folder. The folder name is then used to derive a proper slug for the URL. More about how to use the blog integration feature can be found here: [Using The Blog Integration Feature](#using-the-blog-integration-feature).

#### `images` Folder

This is where all your images are being stored. Each image can then be referenced in a content file by specifying the relative path to it. For instance, if you want to use an image inside your `contact.json` file, you can do so by referencing the image file like this: `"src": "../../images/favicon.png"`

#### `sections` Folder

This is where all the content for your sections is primarily stored. Inside the `sections` folder, each section type has its own subfolder and an associated file type (either Markdown or JSON) that is based on the kind of data structure best suited for the section content.

```sh
content
    └── sections
    │ └── about
    │     └── about.md # has to be Markdown
    │ └── contact
    │     └── contact.json # has to be JSON
    │ └── hero
    │     └── hero.json # has to be JSON
    │ └── interests
    │     └── interests.json # has to be JSON
    │ └── legal
    │     └── imprint.md # has to be Markdown
    │ └── projects
    │     └── projects.json # has to be JSON
```

#### `settings.json` File

This file stores your global site settings, e.g. toggles for certain features. If you want to learn which settings you can configure, switch to the [Customization](#customization) part of the documentation.

### Using The Blog Integration Feature

If you want to extend your portfolio site with a blog, you can do so easily with Portfolio Minimal.

1. Enable the blog integration through adding the blog configuration in your `gatsby-config.js`:

    ```js
    module.exports = {
        plugins: [
            {
                resolve: 'gatsby-theme-portfolio-minimal',
                options: {
                    blogSettings: {
                        path: '/blog',
                        usePathPrefixForArticles: false,
                    },
                },
            },
        ],
    };
    ```

2. Inside the `articles` folder of your content directory, create a new folder to add your first article. The folder name will be used for generating the URL slug of the article.

    ```sh
    content
        └── articles
        │ └── my-first-article
    ```

3. Inside the `my-first-article` folder, create a Markdown file with the following shape.

    ```md
    ---
    title: 'This is an exemplary article for the blog.'
    description: 'This description will be used for the article listing and search results on Google.'
    date: '2021-05-28'
    banner:
        src: '../../images/kelly-sikkema-Hl3LUdyKRic-unsplash.jpg'
        alt: 'First Markdown Post'
        caption: 'Photo by <u><a href="https://example.com">Example</a></u>'
    categories:
        - 'Setup'
    keywords:
        - 'Example'
        - 'Gatsby'
    ---

    This will be the actual content of the article.
    ```

4. Start the development server and you will see that two pages are being creating during the build process.

    - `https://yoursite.com/blog`: This is the article listing page containing all your posts.
    - `https://yoursite.com/my-first-article`: This is the page for the article you added through your Markdown file.

### Using Sections And Other Theme Components

The theme exposes sections and other components as building blocks to construct your page easily.

#### Section Components

Most section components work the following way: You import and configure the component inside your page file and add the associated content in the correct content directory path.

The following table shows which section components are available and how they can be configured.

| Section Component  | Available Props                                       | Associated Content File                               |
| ------------------ | ----------------------------------------------------- | ----------------------------------------------------- |
| `AboutSection`     | `sectionId` _(required)_ <br/> `heading` _(optional)_ | `*contentRootDir*/sections/about/*yourFile*.md`       |
| `ContactSection`   | `sectionId` _(required)_ <br/> `heading` _(optional)_ | `*contentRootDir*/sections/contact/*yourFile*.json`   |
| `HeroSection`      | `sectionId` _(required)_                              | `*contentRootDir*/sections/hero/*yourFile*.json`      |
| `InterestsSection` | `sectionId` _(required)_ <br/> `heading` _(optional)_ | `*contentRootDir*/sections/interests/*yourFile*.json` |
| `LegalSection`     | `sectionId` _(required)_ <br/> `heading` _(optional)_ | `*contentRootDir*/sections/legal/*yourFile*.md`       |
| `ProjectsSection`  | `sectionId` _(required)_ <br/> `heading` _(optional)_ | `*contentRootDir*/sections/projects/*yourFile*.json`  |

#### Utility Components

There are other components which help you in constructing and enriching pages.

The following table shows which utility components are available and how they can be configured.

| Utility Component | Available Props                                                                                                          | Description                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `Page`            | `useSplashScreenAnimation` _(optional)_                                                                                  | Mandatory component to construct a page with a proper layout.        |
| `Seo`             | `title` _(required)_ <br/> `useTitleTemplate` _(optional)_ <br/> `description` _(optional)_ <br/> `noIndex` _(optional)_ | Optional, yet recommended, component to enrich a page with SEO data. |

---

## Customization

I tried to leave as much configuration as possible to you as a developer. This allows the theme to be highly flexible and adjustable to your needs.

### Configuring the Theme Settings

The theme settings can be divided in two parts. There is a `settings.json` file inside the content directory. Also, you can set settings for the theme inside your `gatsby-config.js`.

#### Configuring `settings.json`

`settings.json` can be understood as your global site settings. The configuration option inside are primarily used to specify how your layout should look like and which functionality you want to use.

```js
{
    "siteMetadata": {
        "language": "en", // Site language for SEO
        "siteUrl": "", // Site URL for SEO
        "title": "", // Default SEO title
        "titleTemplate": "%s · Portfolio", // SEO Title title (%s will be replaced by title of page)
        "description": "", // Default SEO description
        "author": "", // Author's name for blog article footer
        "avatar": "", // Author's avatar for blog article footer
        "bio": "", // Author's biography for blog article footer
        "social": { // Social Profiles for various features
            "behance": "",
            "github": "",
            "medium": "",
            "linkedin": "",
            "mail": ""
        }
    },
    "siteConfiguration": {
        "logo": { "text": "" }, // Site logo
        "navigation": {
            "header": [
                { "label": "About", "url": "/#about" },
                { "label": "Blog", "url": "/blog" },
                { "label": "Features", "url": "/#features" },
                { "label": "Github", "url": "/#github" }
            ],
            "ctaButton": { "openNewTab": true, "label": "Resume", "url": "/resume.pdf" },
            "footer": [
                { "label": "Privacy", "url": "/privacy" },
                { "label": "Imprint", "url": "/imprint" }
            ]
        },
        "featureToggles": {
            "useDarkModeAsDefault": false,
            "useDarkModeBasedOnUsersPreference": true,
            "useCookieBar": false
        }
    }
}
```

#### Configuring `gatsby-config.js`

When adding the `gatsby-theme-portfolio-minimal` package to the array of plugins, you can specify numerous options to adjust the functionality to your needs.

```js
module.exports = {
    plugins: [
        {
            resolve: 'gatsby-theme-portfolio-minimal',
            options: {
                siteUrl: '', // Used for sitemap generation
                manifestSettings: {
                    favicon: '', // Path is relative to the root
                    siteName: '', // Used in manifest.json
                    shortName: '', // Used in manifest.json
                    startUrl: '', // Used in manifest.json
                    backgroundColor: '', // Used in manifest.json
                    themeColor: '', // Used in manifest.json
                    display: '', // Used in manifest.json
                },
                contentDirectory: '', // Specifies the root content directory path
                blogSettings: {
                    // If set, the blog integration is enabled
                    path: '', // Defines the slug for the blog listing page
                    usePathPrefixForArticles: false, // Default true (i.e. path will be /blog/first-article)
                },
                plausibleAnalytics: {
                    // If set, the Plausible.io analytics integration is enabled
                    domain: 'example.com',
                },
                googleAnalytics: {
                    // If set, the Google Analytics integration is enabled
                    trackingId: '', // e.g. UA-XXXXXX-X
                    anonymize: true, // Default is true
                    environments: [], // Default ["production"]
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
