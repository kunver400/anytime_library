import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css?raw'; 
import './index.css';
import LayoutContainer from './hoc/LayoutContainer/LayoutContainer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LayoutContainer />, document.getElementById('root'));
registerServiceWorker();