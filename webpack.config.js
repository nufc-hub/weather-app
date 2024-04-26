const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // Output filename
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets/partly_cloudy_day_FILL0_wght400_GRAD0_opsz24.png',
          to: path.resolve(__dirname, 'dist', 'assets'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },
    ],
  },
};
