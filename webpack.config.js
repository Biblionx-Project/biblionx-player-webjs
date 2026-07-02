var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve('./src/index.js'),
  output: {
    filename: 'vlibras.js',
    path: path.resolve('./build')
  },
  externals: {
    'window': 'window'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/target', to: 'target' }
      ]
    })
  ]
};
