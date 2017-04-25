var path = require('path');

module.exports = {
  entry: './src/main/resources/assets/js/test.js',
  output: {
    filename: 'test.js',
    path: path.resolve(__dirname, 'src/main/resources/static/')
  }
};
