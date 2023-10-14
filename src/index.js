import React from 'react';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { legacy_createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { createRoot } from 'react-dom/client'


const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)