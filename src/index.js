import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import rootReducer from './redux/reducers/rootReducer'; 
import LayoutContainer from './hoc/LayoutContainer/LayoutContainer';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css?raw'; 
import './index.css?raw';

Axios.defaults.baseURL = 'https://anytime-lib.firebaseio.com/';
const store = createStore(rootReducer);
ReactDOM.render(<Provider store={store}><LayoutContainer /></Provider>, document.getElementById('root'));
registerServiceWorker();