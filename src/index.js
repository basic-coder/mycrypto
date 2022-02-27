import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import CryptoContext from "./CryptoContext";
import { TransactionProvider } from './context/TransactionContext';
import App from './App';

ReactDOM.render(
  <Router>
       <CryptoContext>
       <TransactionProvider>
        <App />
        </TransactionProvider>
      </CryptoContext>
  </Router>,
  document.getElementById('root')
);


