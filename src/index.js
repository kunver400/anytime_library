import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import {Provider} from 'react-redux';
import common from './utils/common';

import store from './redux/store';
import LayoutContainer from './hoc/LayoutContainer/LayoutContainer';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css?raw'; 
import './index.css?raw';

Axios.defaults.baseURL = 'https://anytime-lib.firebaseio.com/';
Axios.interceptors.request.use(function (config) {
    common.toggleSpinny();
    let user =  store.getState().rootReducer.user;
    if(user && user.token)
    config.url = config.url+'?auth='+user.token;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

Axios.interceptors.response.use(function (response) {
    common.toggleSpinny();
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
console.log(store,Axios);
ReactDOM.render(<Provider store={store}><LayoutContainer /></Provider>, document.getElementById('root'));
registerServiceWorker();

module.hot.accept();