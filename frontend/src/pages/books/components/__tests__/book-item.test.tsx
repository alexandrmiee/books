import React from 'react';
import {shallow} from 'enzyme';

import {BookItem, BookProps} from '../book-item';

jest.mock('../books-logo', () => ({
    BooksLogo: () => <></>,
}));

jest.mock('../books-desc', () => ({
    BooksDesc: () => <></>,
}));

const defaultProps: BookProps = {
    id: 'string',
    logo: 'string',
    title: 'string',
    onBookSelect: jest.fn(),
    shortDescription: 'string',
};

const setupComponent = (render: Function, props: Partial<BookProps> = {}) => {
    const computedProps: BookProps = {
        ...defaultProps,
        ...props,
    };

    const wrapper = render(<BookItem {...computedProps} />);

    return {
        wrapper,
        props: computedProps,
    };
};

describe('BookItem', () => {
    it('should render <BookItem /> component', () => {
        const {wrapper} = setupComponent(shallow);

        expect(wrapper.exists()).toBe(true);
    });

    it('should render <BooksLogo /> layout component', () => {
        const {wrapper} = setupComponent(shallow);
        const logo = wrapper.find('BooksLogo');

        expect(logo.exists()).toBe(true);
        expect(logo.prop('src')).toEqual(defaultProps.logo);
        expect(logo.prop('alt')).toEqual(defaultProps.title);
    });

    it('should render <BooksDesc /> layout component', () => {
        const {wrapper} = setupComponent(shallow);
        const description = wrapper.find('BooksDesc');

        expect(description.exists()).toBe(true);
        expect(description.prop('title')).toEqual(defaultProps.title);
        expect(description.prop('description')).toEqual(defaultProps.shortDescription);
    });

    it('should call onBookSelect', () => {
        const mockCallBack = jest.fn();
        const {wrapper} = setupComponent(shallow, {...defaultProps, onBookSelect: mockCallBack});
        wrapper.simulate('click');

        expect(mockCallBack).toBeCalledTimes(1);
    });
});
