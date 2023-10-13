import React from 'react';
import './index.css';
import App from './App';
// import store from './app/store'
import { Provider } from 'react-redux'
import { legacy_createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { createRoot } from 'react-dom/client'
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

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

root.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


