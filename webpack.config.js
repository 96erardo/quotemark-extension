const path = require('path');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    options: './src/options/index.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry',
                    targets: {
                      chrome: '88'
                    },
                  }
                ],
                [
                  '@babel/preset-react',
                  { 
                    runtime: 'automatic',
                    development: true,
                  }
                ],
              ]
            }
          },
          {
            loader: 'ts-loader',
          }
        ]
      }
    ]
  }
}