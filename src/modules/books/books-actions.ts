import {createActionFactory, DispatchType} from '@app/utils/redux';
import {getAll} from './books-api';
import {MODULE_NAMESPACE} from './books-constants';
import {Book, BooksActions} from './books-types';

const createAction = createActionFactory(MODULE_NAMESPACE);
export const setBooks = createAction<Book[]>(BooksActions.SET_BOOKS);

const BOOKS_LIMIT = 5;
export const loadBooks = (
    search?: string,
    limit: number = BOOKS_LIMIT
) => async (dispatch: DispatchType) => {
    const books = await getAll(search, limit);
    dispatch(setBooks(books));
};
