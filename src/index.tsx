import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import axe from '@axe-core/react';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  axe(React, ReactDOM, 1000);
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
