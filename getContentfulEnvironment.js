/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('contentful-management');
const config = require('./.contentfulrc.json');

module.exports = function () {
    console.log('Using .contentfulrc.json config:');
    console.log('Space ID:', config.spaceId);
    console.log('Environment ID:', config.environmentId);
    console.log('Management Token:', config.managementToken ? 'EXISTS' : 'MISSING');

    const contentfulClient = createClient({
        accessToken: config.managementToken
    });

    return contentfulClient.getSpace(config.spaceId).then((space) => space.getEnvironment(config.environmentId));
};
