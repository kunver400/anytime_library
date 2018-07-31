import { configure, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import Login from './Login';
import LoginForm from './LoginForm/LoginForm';

configure({ adapter: new Adapter() });

describe('<Login/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Login visible />);
    });
    it('Should render Login modal if visble_prop is true', () => {
        expect(wrapper.find(LoginForm)).toHaveLength(1);
    });
});