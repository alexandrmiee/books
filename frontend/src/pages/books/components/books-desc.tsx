import React, {FC} from 'react';

export interface BooksDescProps {
  title: string;
  description?: string;
  year?: string;
  className?: string;
}

const Year: FC<{year: string}> = ({year}) => (
    <span>
        (
        {year}
        )
    </span>
);

export const BooksDesc: FC<BooksDescProps> = ({
    title, description, className, year,
}) => (
    <div className={className}>
        <h2>
            {title}
            {year && <Year year={year} />}
        </h2>
        <div>{description}</div>
    </div>
);
