const path = require('path');
const { generateConfig } = require('gatsby-plugin-ts-config');

module.exports = (options) =>
    generateConfig(
        {
            projectRoot: __dirname,
            configDir: path.join('src', 'gatsby'),
            ...options, // Used in gatsby-node.ts
        },
        { ...options }, // Used in gatsby-config.ts
    );
