import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './locale/i18n-configuration';

ReactDOM.render(
  // Disable StrickMode to prevent error when using modal
  // <React.StrictMode> 
    <Router>
      <App />
    </Router>,
  // </React.StrictMode>,
  document.getElementById('xd-bank')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
