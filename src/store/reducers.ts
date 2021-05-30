import {combineReducers} from 'redux';
import {History} from 'history';
import {RouterState, connectRouter} from 'connected-react-router';


import {
    MODULE_NAMESPACE as books,
    BooksState,
    booksReducer,
} from '@modules/books';

import {Action} from '@utils/redux';


export interface AppState {
    routerState: RouterState;
    [books]: BooksState;
}

const createAppReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    [books]: booksReducer,
});

export const createRootReducer = (history: History) => (state: any, action: Action) => {
    const appReducer = createAppReducer(history);

    return appReducer(state, action);
};
