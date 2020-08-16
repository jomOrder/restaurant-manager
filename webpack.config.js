const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: ['@babel/polyfill', './src/index.js'],
  output: { path: __dirname + '/public', publicPath: '/', filename: 'bundle.js' },
  devServer: {
    host: '0.0.0.0',
    contentBase: './public',
    historyApiFallback: true,
    overlay: true,
    compress: true,
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|gif|png|jpeg|jpg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ENV': JSON.stringify(process.env.ENV)
    })
  ]
};
