import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

// PostCSS plugins
import autoprefixer from 'autoprefixer';
import lost from 'lost';

import eslintFriendlyFormatter from 'eslint-friendly-formatter';

export default {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: ['./src/index.jsx'],
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/}
    ],
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['stage-2', 'react', 'es2015'] }},
      {test: /\.s(c|a)ss$/, loader: 'style'},
      {test: /\.s(c|a)ss$/, loader: 'css'},
      {test: /\.s(c|a)ss$/, loader: 'postcss'},
      {test: /\.s(c|a)ss$/, loader: 'sass', query: { outputStyle: 'expanded' }},
      {test: /\.(gif|png|jpg|svg|woff|woff2|ttf|eot)$/, loader: 'url', query: { limit: 25000 }}
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new CleanWebpackPlugin('dist'),
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  eslint: {
    formatter: eslintFriendlyFormatter
  },
  postcss: () => [lost, autoprefixer]
};
