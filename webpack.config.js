const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const template = `
<!DOCTYPE html> 
<html lang="en">
  <head>
    <title>QuoteMark</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`

module.exports = (env) => ({
  mode: env.mode,
  target: 'web',
  entry: {
    options: './src/modules/options/index.tsx',
    popup: './src/modules/story/StoriesPopup.tsx',
    background: './src/background.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Quotemark',
      filename: 'options.html',
      inject: 'body',
      templateContent: template,   
      meta: {
        'viewport': 'initial-scale=1, width=device-width',
        'charset': 'UTF-8'
      },
      chunks: ['options']
    }),
    new HtmlWebpackPlugin({
      title: 'Quotemark',
      filename: 'popup.html',
      inject: 'body',
      templateContent: template,   
      meta: {
        'viewport': 'initial-scale=1, width=device-width',
        'charset': 'UTF-8'
      },
      chunks: ['popup']
    }),
    new Dotenv(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@modules': path.resolve(__dirname, 'src/modules/'),
      '@shared': path.resolve(__dirname, 'src/shared/'),
    }
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      chrome: '88'
                    },
                  }
                ],
                [
                  '@babel/preset-react',
                  { 
                    runtime: 'automatic',
                    development: env.mode === 'development',
                  }
                ],
              ]
            }
          },
          'ts-loader',
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ttf|png|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  }
})