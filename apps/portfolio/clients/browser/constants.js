const path = require('path');

/**
 * See https://nextjs.org/docs/api-reference/data-fetching/get-static-props#reading-files-use-processcwd
 * regarding usage of process.cwd() vs __dirname
 */
const REPO_ROOT_PATH = path.resolve(process.cwd(), '../../../../');
const PROJECT_ROOT_PATH = process.cwd();
const BLOG_ROOT_PATH = path.resolve(PROJECT_ROOT_PATH, 'blog');
const PUBLIC_PATH = path.resolve(PROJECT_ROOT_PATH, 'public');
const SITE_TITLE = 'Andrew Grewell - Software Engineer, Designer, Builder';

module.exports = {
  BLOG_ROOT_PATH,
  PROJECT_ROOT_PATH,
  REPO_ROOT_PATH,
  PUBLIC_PATH,
  SITE_TITLE
};
