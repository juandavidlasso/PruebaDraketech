import {SIGNIN_USER_SUCCESSFULY, SIGNIN_USER_ERROR, SIGNUP_USER_SUCCESSFULY, SIGNUP_USER_ERROR } from '../types'

// State
const initialState = {
    error: null,
    loading: false,
    loggedIn: false,
    register: false
}

// eslint-disable-next-line
export default function(state = initialState, action) {
    switch (action.type) {
        case SIGNIN_USER_SUCCESSFULY:
            return {
                ...state,
                loading: false,
                loggedIn: true
            }
        case SIGNUP_USER_SUCCESSFULY:
            return {
                ...state,
                loading: false,
                register: true
            }
        case SIGNIN_USER_ERROR:
            return {
                ...state,
                loading: false,
                loggedIn: false,
                error: action.payload
            }
        case SIGNUP_USER_ERROR:
            return {
                ...state,
                loading: false,
                register: false,
                error: action.payload
            }
    default:
        return state
    }
}
