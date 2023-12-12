import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';

const localStorageAuthState = localStorage.getItem('authState');

if (localStorageAuthState) {
  store.dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(localStorageAuthState) });
}

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
