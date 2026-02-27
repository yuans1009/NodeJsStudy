const path = require('path');

// this will give us the directory of the main module (i.e. the app.js file)
module.exports = path.dirname(process.main.filename);