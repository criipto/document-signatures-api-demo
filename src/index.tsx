import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  RelayEnvironmentProvider
} from 'react-relay/hooks';

import RelayEnvironment from './RelayEnvironment';

import 'bootstrap/scss/bootstrap.scss';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <React.Suspense fallback={'Loading...'}><App /></React.Suspense>
      </RelayEnvironmentProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
