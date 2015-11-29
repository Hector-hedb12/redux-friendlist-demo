var webpack = require('webpack');

// The webpack-dev-server is a little node.js Express server,
// which uses the webpack-dev-middleware to serve a webpack bundle.
// It also has a little runtime which is connected to the server via Socket.IO.
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,

    // the the webpack-dev-server configuration to enable HMR on the server.
    hot: true,

    // Set this as true if you want to access dev server from arbitrary url.
    historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:3000');
});
