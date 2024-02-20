/*
No need for a script tag in index.html in src when using HTMLWebpackPlugin-->

My issue with HTMLWebpackPlugin was that the template was pointing to index.ejs by default, 
had to set it to ./src/index.html. make sure you always do this in the template variable.
The plugin rewrites this file from src and generates a new index.html in dist just in case we rename any entry points
The index.html file in dist is literally just a copy of the one in src. 

Without the plugin, it works fine too.
You just need one index.html file, always make it in src, 
comment out both occurrences of htmlwebpackplugin in webpack.config.js. 
You need  <script src = "bundle.js" defer></script> in the html file, without it there is an error in the console, so the webpage won’t update (check!). 
It works the same as using HTMLWebpackPlugin but doesn't make a new index.html file in dist .
*/

// const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './src',
  },
  // plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
