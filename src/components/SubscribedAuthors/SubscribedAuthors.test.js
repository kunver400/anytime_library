import { configure, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {List} from 'antd';

import SubscribedAuthors from './SubscribedAuthors';

configure({ adapter: new Adapter() });

describe('<SubscribedAuthors/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<SubscribedAuthors user={{subs: ['author1, author2']}}/>);
    });
    it('Should render SubscribedAuthors with single List', () => {
        expect(wrapper.find(List)).toHaveLength(1);
    });
});