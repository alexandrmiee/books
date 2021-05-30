import React from 'react';
import {shallow} from 'enzyme';

import {Books} from '../books';

jest.mock('../components/book-item', () => ({
    BookItem: () => <></>,
}));

const mockData = [{
    id: 'id',
    logo: 'logo',
    title: 'title',
    shortDescription: 'shortDescription',
    fullDescription: 'fullDescription',
}];

const historyPushMock = jest.fn();

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => () => ({}),
    useSelector: () => ([...mockData]),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: historyPushMock,
    }),
}));

const setupComponent = (render: Function) => {
    const wrapper = render(<Books />);

    return {
        wrapper,
    };
};

describe('Books', () => {
    it('should render <Books /> component', () => {
        const {wrapper} = setupComponent(shallow);

        expect(wrapper.exists()).toBe(true);
    });

    it('should render <BookItem /> layout component', () => {
        const {wrapper} = setupComponent(shallow);
        const item = wrapper.find('BookItem');

        expect(item.exists()).toBe(true);
        expect(item.prop('id')).toEqual(mockData[0].id);
        expect(item.prop('logo')).toEqual(mockData[0].logo);
        expect(item.prop('title')).toEqual(mockData[0].title);
        expect(item.prop('shortDescription')).toEqual(mockData[0].shortDescription);
    });

    it('should call onBookSelect', () => {
        const {wrapper} = setupComponent(shallow);
        const item = wrapper.find('BookItem');
        item.get(0).props.onBookSelect('id');

        expect(historyPushMock).toBeCalledTimes(1);
        expect(historyPushMock).toHaveBeenCalledWith(`/${mockData[0].id}`);
    });

    it('should execute useEffect', () => {
        const spy = jest.fn();
        jest.spyOn(React, 'useEffect').mockImplementation(() => spy());
        setupComponent(shallow);

        expect(spy).toBeCalledTimes(1);
    });
});
