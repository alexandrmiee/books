import {createActionFactory, DispatchType} from '@app/utils/redux';
import {getAll, getBook} from './books-api';
import {MODULE_NAMESPACE} from './books-constants';
import {Book, BooksActions} from './books-types';

const createAction = createActionFactory(MODULE_NAMESPACE);
export const setBooks = createAction<Book[]>(BooksActions.SET_BOOKS);
export const setBook = createAction<Book>(BooksActions.SET_BOOK);

const BOOKS_LIMIT = 5;
export const loadBooks = (
    search?: string,
    limit: number = BOOKS_LIMIT
) => async (dispatch: DispatchType) => {
    try {
        const books = await getAll(search, limit);
        dispatch(setBooks(books));
    } catch {
        dispatch(setBooks([]));
    }
};

export const loadBook = (
    id: string,
) => async (dispatch: DispatchType) => {
    try {
        const book = await getBook(id);
        dispatch(setBook(book));
    } catch {
        dispatch(setBook(null));
    }
};
