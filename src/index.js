import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import {Provider} from 'react-redux';

import store from './redux/store';
import LayoutContainer from './hoc/LayoutContainer/LayoutContainer';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css?raw'; 
import './index.css?raw';

Axios.defaults.baseURL = 'https://anytime-lib.firebaseio.com/';
console.log(store,Axios);
ReactDOM.render(<Provider store={store}><LayoutContainer /></Provider>, document.getElementById('root'));
registerServiceWorker();