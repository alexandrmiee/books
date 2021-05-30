import * as React from 'react';
import {Provider, ReactReduxContext} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import {Redirect, Route, Switch} from 'react-router-dom';
import {
    configureStore,
    history,
} from './store';
import {Books} from './pages/books/books';

const store = configureStore();

export const App = (): JSX.Element => (
    <Provider store={store} context={ReactReduxContext}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
            <Switch>
                <Route exact path="/" component={Books} />
                <Redirect to="/" />
            </Switch>
        </ConnectedRouter>
    </Provider>
);
