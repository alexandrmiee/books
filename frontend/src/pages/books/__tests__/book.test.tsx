import React from 'react';
import {shallow} from 'enzyme';

import {Book} from '../book';

jest.mock('../components/books-logo', () => ({
    BooksLogo: () => <></>,
}));

jest.mock('../components/books-desc', () => ({
    BooksDesc: () => <></>,
}));

jest.mock('../components/books-desc', () => ({
    BooksDesc: () => <></>,
}));

const mockData = {
    id: 'id',
    logo: 'logo',
    title: 'title',
    shortDescription: 'shortDescription',
    fullDescription: 'fullDescription',
};

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => () => ({}),
    useSelector: () => ({...mockData}),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: '205',
    }),
}));

const setupComponent = (render: Function) => {
    const wrapper = render(<Book />);

    return {
        wrapper,
    };
};

describe('Book', () => {
    it('should render <Book /> component', () => {
        const {wrapper} = setupComponent(shallow);

        expect(wrapper.exists()).toBe(true);
    });

    it('should render <BooksLogo /> layout component', () => {
        const {wrapper} = setupComponent(shallow);
        const logo = wrapper.find('BooksLogo');

        expect(logo.exists()).toBe(true);
        expect(logo.prop('src')).toEqual(mockData.logo);
        expect(logo.prop('alt')).toEqual(mockData.title);
    });

    it('should render <BooksDesc /> layout component', () => {
        const {wrapper} = setupComponent(shallow);
        const description = wrapper.find('BooksDesc');

        expect(description.exists()).toBe(true);
        expect(description.prop('title')).toEqual(mockData.title);
        expect(description.prop('description')).toEqual(mockData.fullDescription);
    });

    it('should render <BooksDesc /> layout component', () => {
        const {wrapper} = setupComponent(shallow);
        const description = wrapper.find('BooksDesc');

        expect(description.exists()).toBe(true);
        expect(description.prop('title')).toEqual(mockData.title);
        expect(description.prop('description')).toEqual(mockData.fullDescription);
    });

    it('should execute useEffect', () => {
        const spy = jest.fn();
        jest.spyOn(React, 'useEffect').mockImplementation(() => spy());
        setupComponent(shallow);

        expect(spy).toBeCalledTimes(1);
    });
});
