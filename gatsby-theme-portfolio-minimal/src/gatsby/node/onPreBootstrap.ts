import { GatsbyNodeHelpers } from '../../types';
import { ThemeOptions } from '../gatsby-config';
import * as path from 'path';
import * as fs from 'fs';

enum ContentFolder {
    Images = 'images',
    Sections = 'sections',
    Articles = 'articles',
    AboutSection = 'about',
    ContactSection = 'contact',
    HeroSection = 'hero',
    InterestsSection = 'interests',
    LegalSection = 'legal',
    ProjectsSection = 'projects',
}

interface ContentDirectoryTree {
    root: string;
    images: string;
    sections: string;
    articles: string;
    aboutSection: string;
    contactSection: string;
    heroSection: string;
    interestsSection: string;
    legalSection: string;
    projectsSection: string;
}

interface ExampleFileConfiguration {
    [file: string]: {
        destination: string;
        example: string;
    };
}

export function onPreBootstrap({ reporter }: GatsbyNodeHelpers, options: ThemeOptions): void {
    const contentDirectory = options.contentDirectory || path.join('.', 'content');

    const contentDirectoryTree = getContentDirectoryTree(contentDirectory);
    [...Object.values(contentDirectoryTree)].forEach((dir) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            reporter.log(`created ${dir} directory`);
        }
    });

    const exampleFiles = getExampleFiles(contentDirectoryTree);
    Object.values(exampleFiles).forEach((file) => {
        if (!fs.existsSync(file.destination)) {
            fs.copyFile(file.example, file.destination, (error) => {
                if (error) {
                    reporter.error(`error while moving ${file.destination}`, error);
                } else {
                    reporter.log(`initialized ${file.destination}`);
                }
            });
        }
    });
}

function getContentDirectoryTree(root: string): ContentDirectoryTree {
    return {
        root: root,
        images: path.join(root, ContentFolder.Images),
        sections: path.join(root, ContentFolder.Sections),
        articles: path.join(root, ContentFolder.Articles),
        aboutSection: path.join(root, ContentFolder.Sections, ContentFolder.AboutSection),
        contactSection: path.join(root, ContentFolder.Sections, ContentFolder.ContactSection),
        heroSection: path.join(root, ContentFolder.Sections, ContentFolder.HeroSection),
        interestsSection: path.join(root, ContentFolder.Sections, ContentFolder.InterestsSection),
        legalSection: path.join(root, ContentFolder.Sections, ContentFolder.LegalSection),
        projectsSection: path.join(root, ContentFolder.Sections, ContentFolder.ProjectsSection),
    };
}

function getExampleFiles(directory: ContentDirectoryTree): ExampleFileConfiguration {
    const exampleFilesRoot = path.join(__dirname, '../', '../', '../', 'content');
    const exampleDirectory = getContentDirectoryTree(exampleFilesRoot);
    return {
        settings: {
            destination: path.join(directory['root'], 'settings.json'),
            example: path.join(exampleDirectory['root'], 'settings.example.json'),
        },
        contactSection: {
            destination: path.join(directory['contactSection'], 'contact.json'),
            example: path.join(exampleDirectory['contactSection'], 'contact.example.json'),
        },
        heroSection: {
            destination: path.join(directory['heroSection'], 'hero.json'),
            example: path.join(exampleDirectory['heroSection'], 'hero.example.json'),
        },
        interestsSection: {
            destination: path.join(directory['interestsSection'], 'interests.json'),
            example: path.join(exampleDirectory['interestsSection'], 'interests.example.json'),
        },
        projectsSection: {
            destination: path.join(directory['projectsSection'], 'projects.json'),
            example: path.join(exampleDirectory['projectsSection'], 'projects.example.json'),
        },
        aboutSection: {
            destination: path.join(directory['aboutSection'], 'about.md'),
            example: path.join(exampleDirectory['aboutSection'], 'about.example.md'),
        },
        legalSection: {
            destination: path.join(directory['legalSection'], 'imprint.md'),
            example: path.join(exampleDirectory['legalSection'], 'imprint.example.md'),
        },
    };
}
