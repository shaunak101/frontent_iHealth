import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {AlertComponent} from './components/alertComponent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div className='bg-white dark:bg-gray-900 min-h-screen'>
    <App />
    <AlertComponent></AlertComponent>
  </div>
);
