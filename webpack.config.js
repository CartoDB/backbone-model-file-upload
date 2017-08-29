var path = require('path');

module.exports = {
  entry: './test/backbone-model-file-upload.spec.js',
  output: {
    path: path.resolve(path.resolve('.'), '.grunt'),
    filename: 'tests.specs.js'
  },
  devtool: 'inline-source-map'
};