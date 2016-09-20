#!/usr/bin/env node
const path = require('path');
const parentFolderName = path.basename(path.resolve(process.cwd(), '..'));

/**
 * Check if the parent folder is 'node_modules'. If true this means that this
 * project is installed as a dependency of another project, so we should run a
 * production build of our library.
 */
if (parentFolderName === 'node_modules') console.log('true'); // eslint-disable-line
