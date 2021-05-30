const path = require('path');
const {paths} = require('../constants');

module.exports = {
    roots: [
        paths.src
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!@material|lodash-es).+\\.js$',
        '.*\.path$'
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?|tsx?)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json'
    ],
    moduleNameMapper: {
        '\\.(css|scss|path)$': path.resolve(__dirname, 'mocks', 'style.js'),
        '@ui-kit/(.*)$': path.resolve(paths.src, 'components/$1'),
        '@utils/(.*)$': path.resolve(paths.src, 'utils/$1'),
        '@modules/(.*)$': path.resolve(paths.src, 'modules/$1'),
        '@hooks/(.*)$': path.resolve(paths.src, 'hooks/$1'),
        '@constants/(.*)$': path.resolve(paths.src, 'constants/$1'),
        '@app/(.*)$': path.resolve(paths.src, './$1'),
    },
    setupFiles: [
        path.resolve(__dirname, 'polyfills', 'index.js'),
        path.resolve(__dirname, 'enzyme.js'),
        'jest-localstorage-mock'
    ],
    coverageReporters: ['lcov'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!config/**/*.*',
        '!src/**/*.json',
        '!src/**/*.stories.tsx',
        '!src/**/index.{ts,tsx}',
        '!src/bootstrap.ts',
        '!__mocks__/**/*.*',
        '!__tests__/**/*.*',
    ],
    modulePathIgnorePatterns: ['.*__mocks__.*'],
};
