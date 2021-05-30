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
        },
        ift1: {
            protocol: PROTOCOLS.HTTPS,
            host: 'fe-mdm-epam-aws-ift1.dev-test.epm-insr.projects.epam.com',
        },
        'arm-dev': {
            protocol: PROTOCOLS.HTTPS,
            host: 'fe-mdm-arm-dev.dev-test.epm-insr.projects.epam.com'
        },
        'is-test': {
            protocol: PROTOCOLS.HTTPS,
            host: 'fe-mdm-ms-is-test.dev-test.epm-insr.projects.epam.com'
        },
        'kbm-plus-test': {
            protocol: PROTOCOLS.HTTPS,
            host: 'fe-mdm-branch-7-test.dev-test.epm-insr.projects.epam.com/'
        },
        'arm-test': {
            protocol: PROTOCOLS.HTTPS,
            host: 'fe-mdm-arm-test.dev-test.epm-insr.projects.epam.com'
        },
        'arm-at': {
            protocol: PROTOCOLS.HTTPS,
            host: 'fe-mdm-arm-at.dev-test.epm-insr.projects.epam.com'
        },
    }
};
