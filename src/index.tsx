import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import create from './redux/create';
import { Provider } from 'react-redux';

const store = create();

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
document.getElementById('root')
);