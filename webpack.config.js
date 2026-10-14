var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    vlibras: path.resolve('./src/index.js'),
    biblionx: path.resolve('./src/index.js')
  },
  output: {
    filename: '[name].js',
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
