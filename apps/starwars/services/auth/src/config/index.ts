export const envName = process.env.NODE_ENV || 'production';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const config = require(`./config.${envName}`).config || {};
