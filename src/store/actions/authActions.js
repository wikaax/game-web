import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const signIn = (credentials) => {
  return async (dispatch) => {
    const auth = getAuth();

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
        const auth = getAuth();

        try {
            await signOut(auth);
            dispatch({type: 'LOGOUT_SUCCESS'});
        }catch(error) {
            dispatch({type: 'LOGOUT_ERROR', error});
            console.error(error);
        }
    };

};