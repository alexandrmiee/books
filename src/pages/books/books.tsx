import React, {FC, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {Book as BookType, booksSelector, loadBooks} from '@modules/books';
import {BookItem} from './components/book-item';

export const Books: FC<void> = () => {
    const books: BookType[] = useSelector(booksSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadBooks());
    //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleBookSelect = useCallback((id: string) => {
        history.push(`/${id}`);
    },[history])
    
    return (
        <article>
            {
            books && books.map(({
                id, logo, title, shortDescription,
            }) => (
                <BookItem
                    key={id}
                    id={id}
                    logo={logo}
                    title={title}
                    shortDescription={shortDescription}
                    onBookSelect={handleBookSelect}
                />
            ))
        }
        </article>
    );
};
