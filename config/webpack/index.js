const merge = require('webpack-merge');

const {isProduction} = require('../constants');
const common = require('./configs/common');
const development = require('./configs/development');
const production = require('./configs/production');

const {compile} = require('./compiler');

const activeConfig = isProduction ? production : development;
const action = compile;

const config = merge(common, activeConfig);

if (!module.parent) {
  action(config);
}

module.exports = {
  action: (externalBackendConfig) => action(config, externalBackendConfig),
}