'use strict';
/*
 * grunt-eol
 * https://github.com/psyrendust/grunt-eol
 *
 * Copyright (c) 2013 Larry Gordon
 * Licensed under the MIT license.
 */


module.exports = function(grunt) {

  function getEOL(eol) {
    if (eol === 'lf') {
      return '\n';
    }
    if (eol === 'crlf') {
      return '\r\n';
    }
    return '\r';
  }

  grunt.registerMultiTask('eol', 'Convert line endings the easy way.', function() {
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      eol: 'lf'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var eol = getEOL(options.eol);
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function(filepath) {
        var file = grunt.file.read(filepath);
        file = file.replace(/\r\n|\n|\r/g, eol);
        // Write the destination file.
        grunt.log.write('Creating file '.cyan + f.dest + '...');
        grunt.file.write(f.dest, file);
        grunt.log.ok();
      });
    });

    done();
  });

};
