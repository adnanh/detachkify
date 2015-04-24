var tools = require("browserify-transform-tools");
var fs = require("fs");
var path = require("path");

// Transform function
function transform(args, opts, cb) {
    opts.config.relativeTo = opts.config.relativeTo || process.cwd();

    var req = args[0];

    console.log(req);

        //remap
        //    return cb(null, "require(\"" + newRequire + "\")");
    // Default behaviour - just return original
    return cb();
}

// Transform options
var opts = {
    evaluateArguments: true,
    jsFilesOnly: true
};

// Export transform
module.exports = tools.makeRequireTransform("detachkify", opts, transform);