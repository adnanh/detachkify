var tools = require('browserify-transform-tools');
var startsWith = require('starts-with');
var path = require('path');
var fs = require('fs');

// Transform function
function transform(args, opts, cb) {
    var req = args[0];
    var prefix = opts.config.prefix || '/';

    if (!startsWith(req, prefix)) {
      return cb();
    }

    if (prefix !== '/') {
      req = req.replace(opts.config.prefix, '');
    }

    opts.config.relativeTo = opts.config.relativeTo || process.cwd();

    var newRequire;

    if (startsWith(opts.file, opts.config.relativeTo)) {
      newRequire = path.relative(path.dirname(opts.file), path.join(opts.config.relativeTo, req));
    } else {
      currentPath = path.parse(opts.file)
      while(currentPath.dir !== currentPath.root) {
        try {
          fs.statSync(path.join(currentPath.dir, '.detachkify-root'));
          newRequire = path.relative(path.dirname(opts.file), path.join(currentPath.dir, req));
          break;
        } catch(e) {
          currentPath = path.parse(currentPath.dir);
        }
      }

      if (newRequire === undefined) {
        throw new Error('Looks like you are trying to include files from a project that uses detachkify with different relativeTo path. Please add a .detachkify-root file to the relativeTo path of that folder.');
      }
    }

    newRequire = newRequire.replace(/\\/g, '/');

    // in case the file is located in the current directory or a directory within the current directory, make sure to prepend './'
    if (newRequire[0] !== '.') {
        newRequire = './' + newRequire;
    }

    if (opts.config.verbose) {
        console.log(args[0], ' -> ', newRequire);
    }

    return cb(null, 'require("' + newRequire + '")');
}

// Transform options
var transformOpts = {
    evaluateArguments: true,
    jsFilesOnly: true
};

// Export transform
module.exports = tools.makeRequireTransform('detachkify', transformOpts, transform);
