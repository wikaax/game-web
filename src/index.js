import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { legacy_createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reduces/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import { reduxFirestore, getFirestore } from 'redux-firestore';
// import { reactReduxFirebase, getFirebase } from 'reaxt-redux-firebase';
// import firebaseConfig from './config/firebaseConfig';

// const store = legacy_createStore(rootReducer,
//   compose(
//     applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})), // legacy_createStore as createStore if this does not work
//     reactReduxFirebase(firebaseConfig),
//     reduxFirestore(firebaseConfig)
//   )
// );

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();


