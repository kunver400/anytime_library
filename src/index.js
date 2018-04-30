import React from 'react';
import ReactDOM from 'react-dom';
import LayoutContainer from './hoc/LayoutContainer/LayoutContainer';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css?raw'; 
import './index.css?raw';

ReactDOM.render(<LayoutContainer />, document.getElementById('root'));
registerServiceWorker();