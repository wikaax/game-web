import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const signIn = (credentials) => {
  return async (dispatch) => {
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      dispatch({ type: 'LOGIN_SUCCESS' });
      localStorage.setItem("isAuthenticated", "true");
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

export const STORE_USER_DATA = 'STORE_USER_DATA';

export const storeUserData = (userData) => {
  return {
    type: STORE_USER_DATA,
    payload: userData,
  };
};

export const UPDATE_USER = 'UPDATE_USER';

export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        payload: user
    };
};