import React, { FC } from "react";

interface BooksLogoProps {
  src: string;
  alt?: string;
}

export const BooksLogo: FC<BooksLogoProps> = ({ src, alt }) => (
  <img className="books-logo" src={src} alt={alt} />
);
