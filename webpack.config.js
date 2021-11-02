const path = require('path');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    options: './src/modules/options/index.tsx',
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
          'ts-loader',
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ttf|png)$/i,
        type: 'asset/resource'
      }
    ]
  }
}