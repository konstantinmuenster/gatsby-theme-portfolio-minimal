const fs = require('fs');
const path = require('path');
const settingsExample = require('./content/settings.example.json');

exports.onPreBootstrap = ({ reporter }, options) => {
    const contentPath = options.contentPath || 'content';
    const settingsFile = path.join(contentPath, 'settings.json');

    if (!fs.existsSync(contentPath)) {
        reporter.info(`creating ${contentPath} directory`);
        fs.mkdirSync(contentPath);
    }

    if (!fs.existsSync(settingsFile)) {
        reporter.info(`creating ${settingsFile}`);
        fs.writeFileSync(settingsFile, JSON.stringify(settingsExample));
    }
};
