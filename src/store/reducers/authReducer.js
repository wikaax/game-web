const initState = {
    authError: null,
    isAuthenticated: false
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR':
            console.log('login error');
            return {
                ...state,
                authError: 'Login failed',
                isAuthenticated: false
            }
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null,
                isAuthenticated: true
            }

        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                isAuthenticated: false,
                error: null
            };
            case 'LOGOUT_ERROR':
                console.log('logout error', action.error);
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}

export default authReducer;