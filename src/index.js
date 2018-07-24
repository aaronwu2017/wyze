import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// ReactDOM 方法，将父节点渲染到dom树中
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
