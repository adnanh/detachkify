# detachkify
Browserify transform that lets you use absolute paths in your node require statements.

# How to use

## browserify
```javascript
var browserify = require('browserify');
var detachkify = require('detachkify');

var detachkifyConfig = {
    relativeTo: __dirname + '/src',
    verbose: false
}

var b = browserify();
b.transform(detachkify, detachkifyConfig);
```

## grunt-browserify
```javascript
browserify: {
    app: {
        src: ['src/app.js'],
        dest: 'demo/js/app.bundle.js',
        options: {
            transform: [
                ['detachkify', { relativeTo: __dirname + '/src', verbose: false }]
            ]
        }
    }
}
```

Let's say you have following tree:
```
src/
 |- components/
 |      |- header/
 |      |    `- HeaderView.js
 |      `- login/
 |           `- LoginView.js
 |- stores/
 |     `- UserStore.js
 | 
 `- app.js
package.json
```

And in your `HeaderView.js` you are referencing `UserStore.js`
```javascript
require('../../stores/UserStore');
```

You can now use absolute path relative to `src/`
```javascript
require('/stores/UserStore');
```

*Note: All absolute paths must start with a slash (/)*
