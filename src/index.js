import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore, applyMiddleware } from 'redux';
import rootReducer from './store/reduces/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = configureStore(rootReducer, applyMiddleware(thunk)); // legacy_createStore as createStore if this does not work

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();


