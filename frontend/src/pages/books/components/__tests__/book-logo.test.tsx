import React from 'react';
import {shallow} from 'enzyme';

import {BooksLogo, BooksLogoProps} from '../books-logo';

const defaultProps: BooksLogoProps = {
    src: 'string',
    className: 'string',
    alt: 'string',
};

const setupComponent = (render: Function, props: Partial<BooksLogoProps> = {}) => {
    const computedProps: BooksLogoProps = {
        ...defaultProps,
        ...props,
    };

    const wrapper = render(<BooksLogo {...computedProps} />);

    return {
        wrapper,
        props: computedProps,
    };
};

describe('BooksLogo', () => {
    it('should render <BooksLogo /> component', () => {
        const {wrapper} = setupComponent(shallow);

        expect(wrapper.exists()).toBe(true);
    });
});
