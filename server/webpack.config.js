const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  target: "node",
  entry: {
    app: [
      "./app.js"
    ]
  },
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "app.js"
  },
  externals: [
    nodeExternals()
  ],
  plugins: [
    new CopyPlugin([
      {
        from: './package.json',
        to: '../build/package.json'
      },
      {
        from: './.env/production.config.env',
        to: '../build/.env/production.config.env'
      },
      {
        from: './ssl',
        to: '../build/ssl'
      },
      {
        from: '../client/build',
        to: '../build/client'
      }
    ])
  ]
}
