const path = require('path');

module.exports = {
  entry: ["@babel/polyfill",'./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './public',
    host: '0.0.0.0',
    port: 80,
    disableHostCheck: true,
    historyApiFallback: true,

  },
  module :{
    rules :[
      { test : /\.(js)$/,use : 'babel-loader'},
      { test : /\.(css)$/,use:['style-loader','css-loader']},
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      }
    ]
  },

  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
};
