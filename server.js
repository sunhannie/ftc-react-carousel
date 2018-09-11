var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

config.entry.index.unshift("webpack-dev-server/client?http://localhost:3000/")
config.entry.index.unshift("webpack/hot/dev-server")

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    inline:true,
    hot: true,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    },
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Request-Headers':'X-Custom-Header',
        'Access-Control-Max-Age': 1728000,
        'Access-Control-Request-Method': 'GET,PUT,POST'
    }
}).listen(3000, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
  console.log('Listening at localhost:3000');
});