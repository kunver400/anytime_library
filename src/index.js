import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css?raw'; 
import './index.css';
import Layout from './hoc/Layout/Layout';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Layout />, document.getElementById('root'));
registerServiceWorker();