import {SIGNIN_USER_SUCCESSFULY, SIGNIN_USER_ERROR, SIGNUP_USER_SUCCESSFULY, SIGNUP_USER_ERROR } from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';

// Function SignIn
export function signInUser(userEmail, userPassword) {
    return async (dispatch) => {
        try {
            let valid = false;

            await axios({
                method: 'POST',
                url: 'http://localhost:4000/signin',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email: userEmail,
                    password: userPassword
                }
            }).then(res => {
                if(res.status === 200) {
                    sessionStorage.setItem('token', res.data.token);
                    sessionStorage.setItem('firstName', res.data.user.firstName);
                    sessionStorage.setItem('lastName', res.data.user.lastName);
                    sessionStorage.setItem('email', res.data.user.email);
                    dispatch( userSignInSuccessfuly(true) )
                    valid = true;
                }
            }).catch(error => {
                valid = false;
                if(error.response.status === 400 ) {
                    toast.error(error.response.data.message, {
                        theme: 'colored',
                        closeOnClick: false,
                        pauseOnHover: false
                    })
                }
            })

            return valid;
            
        } catch (error) {
            dispatch( userSignInError(error) )
        }
    }
}


const userSignInSuccessfuly = (login) => ({
  type: SIGNIN_USER_SUCCESSFULY,
  payload: login
})


const userSignInError = estado => ({
  type: SIGNIN_USER_ERROR,
  payload: estado
})


// Function SignUp
export function signUpUser(userFirstName, userLastName, userEmail, userPassword) {
    return async (dispatch) => {
        try {
            let valid = false;
            
            await axios({
                method: 'POST',
                url: 'http://localhost:4000/signup',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    firstName: userFirstName,
                    lastName: userLastName,
                    email: userEmail,
                    password: userPassword
                }
            }).then(res => {
                if(res.status === 200) {
                    dispatch( userSignUpSuccessfuly(true) )
                    valid = true;
                }
            }).catch(error => {
                valid = false;
                if(error.response.status === 400 ) {
                    toast.error(error.response.data.message, {
                        theme: 'colored',
                        closeOnClick: false,
                        pauseOnHover: false
                    })
                }
            })

            return valid;
            
        } catch (error) {
            toast.error(error, {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            dispatch( userSignUpError(error) )
        }
    }
}


const userSignUpSuccessfuly = (register) => ({
  type: SIGNUP_USER_SUCCESSFULY,
  payload: register
})


const userSignUpError = estado => ({
  type: SIGNUP_USER_ERROR,
  payload: estado
})