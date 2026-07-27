import React from 'react'; //Imports React library (needed to create React components)
import ReactDOM from 'react-dom/client';//needed to render React into the browser
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  /*Helps catch bugs during development */
    <App />
  </React.StrictMode>
);