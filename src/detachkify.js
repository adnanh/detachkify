var tools = require("browserify-transform-tools");
var path = require("path");

// Transform function
function transform(args, opts, cb) {
    var req = args[0];

    if (req[0] !== '/') {
        return cb();
    }

    opts.config.relativeTo = opts.config.relativeTo || process.cwd();
    var newRequire = path.relative(path.dirname(opts.file), path.join(opts.config.relativeTo, req));
    return cb(null, "require(\"" + newRequire + "\")");
}

// Transform options
var opts = {
    evaluateArguments: true,
    jsFilesOnly: true
};

// Export transform
module.exports = tools.makeRequireTransform("detachkify", opts, transform);