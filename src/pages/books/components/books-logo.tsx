import React, {FC} from 'react';

interface BooksLogoProps {
  src: string;
  alt?: string;
  className?: string;
}

export const BooksLogo: FC<BooksLogoProps> = ({src, alt, className}) => (
    <img className={className} src={src} alt={alt} />
);
