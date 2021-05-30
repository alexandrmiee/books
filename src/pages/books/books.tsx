import React, {FC, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {Book as BookType, booksSelector, loadBooks} from '@modules/books';
import {Book} from './components/book';

export const Books: FC<void> = () => {
    const books: BookType[] = useSelector(booksSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadBooks());
    //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <article>
            {books &&
        books.map(({
            id, logo, title, shortDescription,
        }) => (
            <Book
                key={id}
                logo={logo}
                title={title}
                shortDescription={shortDescription}
            />
        ))}
        </article>
    );
};
