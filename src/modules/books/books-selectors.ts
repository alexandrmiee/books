import {createSelector, Selector} from 'reselect';
import {MODULE_NAMESPACE} from './books-constants';
import {Book, BooksState} from './books-types';

export const rootSelector: Selector<any, BooksState> = (state: any) => state[MODULE_NAMESPACE];

export const booksSelector: Selector<any, Book[]> = createSelector(
    rootSelector,
    state => state.books
);
