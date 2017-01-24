var ExtractTextPlugin = require("extract-text-webpack-plugin"); 

module.exports = {
    entry: {
        main: './src/main.jsx'
    },
    output: {
        filename: './dist/[name].js'
    },
    devtool: 'source-map', 
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('dist/main.css', {
            allChunks: true
        })
    ]
}