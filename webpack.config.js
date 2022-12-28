const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './client/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name]-bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' },
      {
        test: /(js)/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      { test: /\.(woff(2)?|eot|ttf|otf|)$/, type: 'asset/inline' },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    port: 8080,
    hot: true,
    open: true,
    historyApiFallback: true,
    allowedHosts: 'all',
    compress: true,
    proxy: {
      '/api': {
        secure: false,
        changeOrigin: true,
        target: 'http://localhost:3000',
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new HTMLWebpackPlugin({
      template: './client/index.html',
    }),
  ],
};
