const path = require('path');

const MODES = {
    DEV: 'development',
    PROD: 'production'
};

const ENV = process.env.NODE_ENV;

const rootDir = path.resolve(__dirname, '../');
const srcDir = path.resolve(rootDir, 'src');

const paths = {
    assets: path.resolve(srcDir, 'assets'),
    config: path.resolve(__dirname),
    dist: path.resolve(rootDir, 'dist'),
    public: '/',
    root: rootDir,
    src: srcDir
};

const libCssClasses = ['mdc-'];
const PROTOCOLS = {
    HTTP: 'http',
    HTTPS: 'https',
};

module.exports = {
    ENV,
    PROTOCOLS,
    entries: [path.resolve(paths.src, 'index.tsx')],
    isProduction: ENV === MODES.PROD,
    libCssClasses,
    MODES,
    paths,
    devServer: {
        port: 8000
    },
    backend: {
        local: {
            protocol: PROTOCOLS.HTTP,
            host: 'localhost',
            port: 8001
        }
    }
};
