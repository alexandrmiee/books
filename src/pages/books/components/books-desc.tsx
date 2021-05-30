import React, {FC} from 'react';

interface BooksDescProps {
  title: string;
  description?: string;
}

export const BooksDesc: FC<BooksDescProps>  = ({title, description}) => {

  return (
    <div className="books-desc">
      <h2>{title}</h2>
      <div>{description}</div>
    </div>
  );
}