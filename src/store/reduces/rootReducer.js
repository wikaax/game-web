import authReducer from "./authReducer"
import gameReducer from "./gameReducer"
import { combineReducers } from "redux"
// import { firestoreReducer } from "redux-firestore";
// import { firebasereducer } from "react-redux-firebase";

const  rootReducer = combineReducers({
    auth: authReducer,
    game: gameReducer,
    // firestore: firestoreReducer,
    // firebase: firebasereducer
});

export default rootReducer;
