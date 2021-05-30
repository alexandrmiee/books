// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const path = require('path');
const loaderUtils = require('loader-utils');
const {libCssClasses, paths} = require('../constants');

function tryResolve_(url, sourceFilename) {
    // Put require.resolve in a try/catch to avoid node-sass failing with cryptic libsass errors when the importer throws
    try {
        return require.resolve(url, {paths: [path.dirname(sourceFilename)]});
    } catch (e) {
        return '';
    }
}

function tryResolveScss(url, sourceFilename) {
    // Support omission of .scss and leading _
    const normalizedUrl = path.extname(url) === '.scss' ? url : `${url}.scss`;
    const relativeUrl = path.join(path.dirname(normalizedUrl), `_${path.basename(normalizedUrl)}`);

    return tryResolve_(normalizedUrl, sourceFilename) || tryResolve_(relativeUrl, sourceFilename);
}

function tryResolveScssFromRoot(url, sourceFilename) {
    const normalizedUrl = path.extname(url) === '.scss' ? url : `${url}.scss`;
    const relativeUrl = path.resolve(paths.src, normalizedUrl);

    return tryResolve_(relativeUrl, sourceFilename);
}

function importer(url, prev) {
    if (url.startsWith('~styles')) {
        const resolved = tryResolveScssFromRoot(url.replace('~', ''), prev);
        return {file: resolved || url};
    }
    if (url.startsWith('@material')) {
        const resolved = tryResolveScss(url, prev);
        return {file: resolved || url};
    }
    return {file: url};
}


function getLocalIdent(loaderContext, localIdentName, localName, options) {
    if (!options.context) {
        // eslint-disable-next-line no-param-reassign
        options.context = loaderContext.rootContext;
    }

    const request = path
        .relative(options.context, loaderContext.resourcePath)
        .replace(/\\/g, '/');

    // eslint-disable-next-line no-param-reassign
    options.content = `${options.hashPrefix + request}+${localName}`;

    // eslint-disable-next-line no-param-reassign
    localIdentName = localIdentName.replace(/\[local\]/gi, localName);

    const hash = loaderUtils.interpolateName(
        loaderContext,
        localIdentName,
        options
    );

    return hash
        .replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-')
        .replace(/^((-?[0-9])|--)/, '_$1');
}

function isCssClassFromLibrary(className) {
    return libCssClasses.some(classPrefix => className.indexOf(classPrefix) === 0)
}

module.exports = {
    importer,
    getLocalIdent,
    isCssClassFromLibrary
};
