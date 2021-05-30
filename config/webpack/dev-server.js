const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const proxyMiddleware = require('http-proxy-middleware');

const history = require('connect-history-api-fallback');

const {devServer: {port}, backend} = require('../constants');

const localBackendConfig = process.env.DEV_MODE ? backend[process.env.DEV_MODE] : backend.local;

function runDevServer(config, externalBackendConfig) {
    const app = express();
    const compiler = webpack(config);

    const backendConfig = externalBackendConfig || localBackendConfig;
    const backendPort = backendConfig.port ? `:${backendConfig.port}` : '';

    app.use(proxyMiddleware('/api', {
        logLevel: 'debug',
        changeOrigin: true,
        target: `${backendConfig.protocol}://${backendConfig.host}${backendPort}`,
        pathRewrite: backendConfig.pathRewrite,
    }));

    app.use(history({
        verbose: false,
    }));

    app.use(devMiddleware(compiler, {
        publicPath: config.output.publicPath,
        stats: {
            colors: true
        }
    }));

    app.use(hotMiddleware(compiler));

    app.listen(port, () => { console.log(`webpack dev-server is listening on http://localhost:${port}`) });
}

module.exports = {
    runDevServer
};
