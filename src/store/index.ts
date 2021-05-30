import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import {createRootReducer} from './reducers';

export const history = createBrowserHistory();

export function configureStore() {
    const isProduction = process.env.NODE_ENV === 'production';
    const devToolsCompose = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
    const composeEnhancer: typeof compose = isProduction ? compose : devToolsCompose;
    const store = createStore(
        createRootReducer(history),
        composeEnhancer(
            applyMiddleware(
                routerMiddleware(history), thunk
            )
        )
    );

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createRootReducer(history));
        });
    }

    return store;
}
