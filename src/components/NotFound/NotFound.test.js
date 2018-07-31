import { configure, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import NotFound from './NotFound';

configure({ adapter: new Adapter() });

describe('<NotFound/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NotFound/>);
    });
    it('Should contain error 404: - message', () => {
        expect(wrapper.contains(<h1>error 404: </h1>)).toEqual(true);
    });
});