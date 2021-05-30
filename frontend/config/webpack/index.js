const merge = require('webpack-merge');

const {isProduction} = require('../constants');
const common = require('./configs/common');
const development = require('./configs/development');
const production = require('./configs/production');

const {compile} = require('./compiler');
const {runDevServer} = require('./dev-server');

const activeConfig = isProduction ? production : development;
const action = isProduction ? compile : runDevServer;

const config = merge(common, activeConfig);

if (!module.parent) {
  action(config);
}

module.exports = {
  action: (externalBackendConfig) => action(config, externalBackendConfig),
}