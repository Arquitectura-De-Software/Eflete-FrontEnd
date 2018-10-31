const webpack = require('webpack');
var express = require('express');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015','stage-0', 'stage-1']
      }
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    inline:true,
    port: 5000,
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

var app = express();
app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 5000);