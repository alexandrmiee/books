import {Action, handleActions} from '@utils/redux';

import {MODULE_NAMESPACE} from './books-constants';
import {BooksActions, BooksState, Book} from './books-types';

const booksHandler = handleActions(MODULE_NAMESPACE);

const initialState: BooksState = {
    books: [],
    book: null,
};

export const booksReducer = booksHandler(
    {
        [BooksActions.SET_BOOKS]: (
            state: BooksState,
            {payload}: Action<Book[]>
        ): BooksState => ({
            ...state,
            books: payload,
        }),
        [BooksActions.SET_BOOK]: (
            state: BooksState,
            {payload}: Action<Book>
        ): BooksState => ({
            ...state,
            book: payload,
        }),
    },
    initialState
);
