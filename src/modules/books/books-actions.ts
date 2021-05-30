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
        dispatch(setBooks([
            {
                id: '1',
                logo: 'https://www.publicbooks.org/wp-content/uploads/2017/01/book-e1484158615982.jpg',
                title: 'Book 1',
                shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            },
            {
                id: '2',
                logo: 'https://www.publicbooks.org/wp-content/uploads/2017/01/book-e1484158615982.jpg',
                title: 'Book 2',
                shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            },
        ]));
    }
};

export const loadBook = (
    id: string,
) => async (dispatch: DispatchType) => {
    try {
        const book = await getBook(id);
        dispatch(setBook(book));
    } catch {
        dispatch(setBook(
            {
                id: '1',
                logo: 'https://www.publicbooks.org/wp-content/uploads/2017/01/book-e1484158615982.jpg',
                title: 'Book 1',
                fullDescription: `
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen book. It
                    has survived not only five centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the 1960s with the release of
                    Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    It is a long established fact that a reader will be distracted by the readable content of a
                    page when looking at its layout. The point of using Lorem Ipsum is that it has a more-orless normal distribution of letters, as opposed to using 'Content here, content here',
                    making it look like readable English. Many desktop publishing packages and web page
                    editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum'
                    will uncover many web sites still in their infancy. Various versions have evolved over the
                    years, sometimes by accident, sometimes on purpose (injected humour and the like).
                `,
                year: '2021'
            },
        ));
    }
};
