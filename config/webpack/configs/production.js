const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { paths } = require('../../constants');
const plugins = [
    new ProgressBarPlugin(),
    new CleanWebpackPlugin( {
        root: paths.root
    })
];

if (process.env.BUNDLE_ANALYZE) {
    plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
    plugins
};
