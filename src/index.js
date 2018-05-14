import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import LayoutContainer from './hoc/LayoutContainer/LayoutContainer';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css?raw'; 
import './index.css?raw';

Axios.defaults.baseURL = 'https://anytime-lib.firebaseio.com/';

ReactDOM.render(<LayoutContainer />, document.getElementById('root'));
registerServiceWorker();