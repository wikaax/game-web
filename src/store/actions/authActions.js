import { signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../../components/config/firebaseConfig";

export const signIn = (credentials) => {
  return async (dispatch) => {

    try {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      dispatch({ type: 'LOGIN_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', error });
      console.error(error.code, error.message);
    }
  };
};

export const signOut = () => {
    return async (dispatch) => {

        try {
            await firebaseSignOut(auth);
            dispatch({type: 'LOGOUT_SUCCESS'});
        }catch(error) {
            dispatch({type: 'LOGOUT_ERROR', error});
            console.error(error);
        }
    };

};

export const logoutSuccess = () => {
  return {
    type: 'LOGOUT_SUCCESS'
  };
};

export const logoutError = (error) => {
  return {
    type: 'LOGOUT_ERROR',
    error
  };
};