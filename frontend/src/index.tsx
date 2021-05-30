import '@babel/polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/index.scss';

import {App} from './app';

declare const module: any;

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
}
