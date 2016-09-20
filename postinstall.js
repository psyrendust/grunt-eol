#!/usr/bin/env node
/* eslint no-console: 0, prefer-arrow-callback: 0 */
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
  fs.lstat(file, function stat(err, stats) {
    if (err) return console.warn(err);
    if (stats.isFile() || stats.isDirectory()) return onSuccess();
    return null;
  });
}

function copyFile() {
  fs.readFile(src, 'utf8', function read(err, data) {
    if (err) {
      console.warn(err);
      return;
    }
    fs.writeFile(dest, data, 'utf8', function write(error) {
      if (error) console.warn(err)(error);
    });
  });
}

checkStat(src, function checkSrc() {
  checkStat(path.dirname(dest), function checkDest() {
    copyFile();
  });
});
