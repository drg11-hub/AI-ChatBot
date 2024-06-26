import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './App';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <Root />
  //</React.StrictMode>
);
