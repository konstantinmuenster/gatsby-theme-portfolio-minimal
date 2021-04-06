const fs = require('fs');
const path = require('path');
const settingsExample = require('./content/settings.example.json');
const socialProfileExample = require('./content/socialProfiles.example.json');

exports.onPreBootstrap = ({ reporter }) => {
    const contentDirectory = 'content';
    const imagesDirectory = path.join(contentDirectory, 'images');
    const settingsFile = path.join(contentDirectory, 'settings.json');
    const socialProfilesFile = path.join(contentDirectory, 'socialProfiles.json');

    if (!fs.existsSync(contentDirectory)) {
        reporter.info(`creating ${contentDirectory} directory`);
        fs.mkdirSync(contentDirectory);
    }

    if (!fs.existsSync(settingsFile)) {
        reporter.info(`creating ${settingsFile}`);
        fs.writeFileSync(settingsFile, JSON.stringify(settingsExample));
    }

    if (!fs.existsSync(socialProfilesFile)) {
        reporter.info(`creating ${socialProfilesFile}`);
        fs.writeFileSync(socialProfilesFile, JSON.stringify(socialProfileExample));
    }

    if (!fs.existsSync(imagesDirectory)) {
        reporter.info(`creating ${imagesDirectory} directory`);
        fs.mkdirSync(imagesDirectory);
    }
};
