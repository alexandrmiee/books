import React, {FC, useCallback} from 'react';
import classNames from 'classnames/bind';

import {BooksDesc} from './books-desc';
import {BooksLogo} from './books-logo';
import * as styles from './book-item.scss';

interface BookProps {
    id: string;
    logo: string;
    title: string;
    onBookSelect: (id: string) => void;
    shortDescription?: string;
}

const cn = classNames.bind(styles);

export const BookItem: FC<BookProps> = ({id, logo, title, shortDescription, onBookSelect}) => {
    const handleBookSelect = useCallback(() => {
        onBookSelect(id);
    },[onBookSelect]);

    return (
        <section className={cn('book')} onClick={handleBookSelect}>
            <BooksLogo className={cn('book__logo')} src={logo} alt={title} />
            <BooksDesc className={cn('book__desc')} title={title} description={shortDescription} />
        </section>
    );
};
