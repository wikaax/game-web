// // store.js (lub inną nazwę, którą używasz do konfiguracji sklepu Redux)
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers'; // Załóżmy, że masz plik rootReducer zdefiniowany

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer, // Dodaj swój reducer lub kombinację reducerów tutaj
  // Możesz także dodać middleware, np. redux-thunk, tutaj
});

export default store;

