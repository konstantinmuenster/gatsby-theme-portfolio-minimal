const fs = require('fs');
const path = require('path');
const settingsExample = require('./content/settings.example.json');
const socialProfileExample = require('./content/json/socialProfiles.example.json');

exports.onPreBootstrap = ({ reporter }) => {
    const contentDirectory = 'content';
    const imagesDirectory = path.join(contentDirectory, 'images');
    const jsonDirectory = path.join(contentDirectory, 'json');
    const settingsFile = path.join(contentDirectory, 'settings.json');
    const socialProfilesFile = path.join(jsonDirectory, 'socialProfiles.json');

    if (!fs.existsSync(contentDirectory)) {
        reporter.info(`creating ${contentDirectory} directory`);
        fs.mkdirSync(contentDirectory);
    }

    if (!fs.existsSync(imagesDirectory)) {
        reporter.info(`creating ${imagesDirectory} directory`);
        fs.mkdirSync(imagesDirectory);
    }

    if (!fs.existsSync(jsonDirectory)) {
        reporter.info(`creating ${jsonDirectory} directory`);
        fs.mkdirSync(jsonDirectory);
    }

    if (!fs.existsSync(socialProfilesFile)) {
        reporter.info(`creating ${socialProfilesFile}`);
        fs.writeFileSync(socialProfilesFile, JSON.stringify(socialProfileExample));
    }

    if (!fs.existsSync(settingsFile)) {
        reporter.info(`creating ${settingsFile}`);
        fs.writeFileSync(settingsFile, JSON.stringify(settingsExample));
    }
};
