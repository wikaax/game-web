import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { legacy_createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reduces/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = legacy_createStore(rootReducer, applyMiddleware(thunk)); // legacy_createStore as createStore if this does not work

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();


