// The path module contains several helper functions to help make
// path manipulation easier:
var path = require('path');

var webpack = require('webpack');

// used to generate a native css output file:
// It moves every require("style.css") in entry chunks into a separate
// css output file. So your styles are no longer inlined into the
// javascript, but separate in a css bundle file (styles.css).
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
    // Choose a developer tool to enhance debugging
    // eval - Each module is executed with eval and //@ sourceURL.
    devtool: 'eval',
    entry: [
        // The entry point for the bundle.
        // If you pass a string: The string is resolved to a module which is loaded upon startup.
        // If you pass an array: All modules are loaded upon startup. The last one is exported.
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        // Enables Hot Module Replacement.
        // Generates Hot Update Chunks of each chunk in the records.
        // It also enables the API and makes __webpack_hash__ available
        // in the bundle.
        new webpack.HotModuleReplacementPlugin(),

        // When there are errors while compiling this plugin skips the
        // emitting phase (and recording phase), so there are no assets
        // emitted that include errors. The emitted flag in the stats is false
        // for all assets.
        new webpack.NoErrorsPlugin(),

        // our custom plugin
        devFlagPlugin,

        // extract-text-webpack-plugin. See first lines
        new ExtractTextPlugin('app.css')
    ],
    module: {
        loaders: [
            // test: A condition that must be met
            // loader: A string of “!” separated loaders
            // loaders: A array of loaders as string
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src')
            },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?module!cssnext-loader') }
        ]
    },
    // Options affecting the resolving of modules:
    resolve: {
        // An array of extensions that should be used to resolve modules
        extensions: ['', '.js', '.json']
    }
};
