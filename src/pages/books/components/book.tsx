import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {ClientButton} from '../../../components/client-button/client-button';

import {BooksDesc} from './books-desc';
import {BooksLogo} from './books-logo';

interface BookProps {
  logo: string;
  title: string;
  shortDescription?: string;
}

export const Book: FC<BookProps> = ({logo, title, shortDescription}) => {
    const {t} = useTranslation(['common']);

    return (
        <section>
            <BooksLogo src={logo} alt={title} />
            <BooksDesc title={title} description={shortDescription} />
            <ClientButton text={t('buy')} />
        </section>
    );
};
