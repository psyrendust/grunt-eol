#!/usr/bin/env node
/* eslint no-console: 0 */
const fs = require('fs');
const path = require('path');

const parentFolderName = path.basename(path.resolve(process.cwd(), '..'));

/**
 * Check if the parent folder is 'node_modules'. If `true` this means that this
 * project is installed as a dependency of another project.
 */
if (parentFolderName === 'node_modules') {
  return;
}

const dest = path.resolve('.git/hooks/commit-msg');
const src = path.resolve('node_modules/angular-precommit/index.js');

function checkStat(file, onSuccess) {
  fs.lstat(file, (err, stats) => {
    if (err) return console.warn(err);
    if (stats.isFile() || stats.isDirectory()) return onSuccess();
    return null;
  });
}

function copyFile() {
  fs.readFile(src, 'utf8', (err, data) => {
    if (err) {
      console.warn(err);
      return;
    }
    fs.writeFile(dest, data, 'utf8', (error) => {
      if (error) console.warn(err)(error);
    });
  });
}

checkStat(src, () => {
  checkStat(path.dirname(dest), () => {
    copyFile();
  });
});
