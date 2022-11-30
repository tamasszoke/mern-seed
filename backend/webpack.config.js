const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')

module.exports = {
  target: 'node',
  entry: {
    app: ['./src/index.ts'],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.yaml'],
  },
  mode: 'production',
  externals: [nodeExternals()],
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './package.json',
          to: './package.json',
        },
        {
          from: './.env/.env.production',
          to: './.env/.env.production',
        },
        {
          from: './.ssl',
          to: './.ssl',
        },
        {
          from: './.jwt',
          to: './.jwt',
        },
        {
          from: './pm2.config.json',
          to: './pm2.config.json',
        },
        {
          from: '../frontend/build',
          to: './frontend',
        },
        {
          from: './public',
          to: './frontend/static',
        },
      ],
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          mkdir: ['../build'],
          copy: [{ source: './build', destination: '../build' }],
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
}
