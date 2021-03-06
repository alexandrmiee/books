import React, {FC, useEffect} from 'react';
import classNames from 'classnames/bind';
import {useParams} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import {Book as BookType, bookSelector, loadBook} from '@modules/books';
import {BooksDesc} from './components/books-desc';
import {BooksLogo} from './components/books-logo';
import * as styles from './book.scss';

export interface RouteParams {
  bookId: string;
}

const cn = classNames.bind(styles);

export const Book: FC = () => {
    const book: BookType = useSelector(bookSelector);
    const dispatch = useDispatch();
    const {bookId} = useParams() as RouteParams;

    useEffect(() => {
        dispatch(loadBook(bookId));
    //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookId]);

    return (book && (
        <section className={cn('book')}>
            <BooksLogo className={cn('book__logo')} src={book.logo} alt={book.title} />
            <BooksDesc
                className={cn('book__desc')}
                title={book.title}
                description={book.fullDescription}
                year={book.year}
            />
        </section>
    )
    );
};
