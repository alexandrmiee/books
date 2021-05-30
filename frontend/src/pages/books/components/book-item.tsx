import React, {FC, useCallback} from 'react';
import classNames from 'classnames/bind';

import {BooksDesc} from './books-desc';
import {BooksLogo} from './books-logo';
import * as styles from './book-item.scss';

export interface BookProps {
    id: string;
    logo: string;
    title: string;
    onBookSelect: (id: string) => void;
    shortDescription?: string;
}

const cn = classNames.bind(styles);

export const BookItem: FC<BookProps> = ({
    id, logo, title, shortDescription, onBookSelect,
}) => {
    const handleBookSelect = useCallback(() => {
        onBookSelect(id);
    }, [onBookSelect, id]);

    return (
        <section className={cn('book-item')} onClick={handleBookSelect} role="presentation">
            <BooksLogo className={cn('book-item__logo')} src={logo} alt={title} />
            <BooksDesc className={cn('book-item__desc')} title={title} description={shortDescription} />
        </section>
    );
};
