// import { createSlice } from '@reduxjs/toolkit'

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     value: 0
//   },
//   reducers: {
//     increment: state => {
//       state.value += 1
//     },
//     decrement: state => {
//       state.value -= 1
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload
//     }
//   }
// })

// export const { increment, decrement, incrementByAmount } = authSlice.actions

// export default authSlice.reducer

// export const selectAuthValue = state => state.auth.value;

const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR':
            console.log('login error');
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null
            }
        default:
            return state;
    }
}

export default authReducer;