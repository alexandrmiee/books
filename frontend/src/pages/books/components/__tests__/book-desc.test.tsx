import React from 'react';
import {shallow} from 'enzyme';

import {BooksDesc, BooksDescProps} from '../books-desc';

const defaultProps: BooksDescProps = {
    title: 'string',
    description: 'string',
    className: 'string',
    year: 'string',
};

const setupComponent = (render: Function, props: Partial<BooksDescProps> = {}) => {
    const computedProps: BooksDescProps = {
        ...defaultProps,
        ...props,
    };

    const wrapper = render(<BooksDesc {...computedProps} />);

    return {
        wrapper,
        props: computedProps,
    };
};

describe('BooksDesc', () => {
    it('should render <BooksDesc /> component', () => {
        const {wrapper} = setupComponent(shallow);

        expect(wrapper.exists()).toBe(true);
    });

    it('should render <Year /> layout component', () => {
        const {wrapper} = setupComponent(shallow);
        const logo = wrapper.find('Year');

        expect(logo.exists()).toBe(true);
        expect(logo.prop('year')).toEqual(defaultProps.year);
    });

    it('should not render <Year /> layout component', () => {
        const {wrapper} = setupComponent(shallow, {year: null});
        const logo = wrapper.find('Year');

        expect(logo.exists()).toBe(false);
    });
});
