import path from 'path'

const webConfig = {
  mode: 'production',
  target: 'web',
  entry: {
    index: './src/web/index.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devtool: 'source-map'
}

const electronConfig = {
  mode: 'production',
  target: 'electron-main',
  entry: {
    electron: ['./src/electron/index.js'],
    preload: ['./src/electron/preload.js']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  node: {
    __dirname: false // https://github.com/webpack/webpack/issues/2010#issuecomment-181256611
  },
  devtool: 'source-map'
}

export default [webConfig, electronConfig]
