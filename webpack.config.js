module.exports = {
  entry : './src/index.js',
  output : { path: __dirname + '/public', publicPath: '/', filename: 'bundle.js' },
  devServer: {
    contentBase: './public',
    host: '0.0.0.0',
    port: 3001,
    disableHostCheck: true,
  },
  module :{
    rules :[
      { test : /\.(js)$/,use : 'babel-loader'},
      { test : /\.(css)$/,use:['style-loader','css-loader']}
    ]
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
};
