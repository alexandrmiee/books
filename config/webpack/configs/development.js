const webpack = require('webpack');

module.exports = {
    entry: {
        app: ['webpack-hot-middleware/client']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
