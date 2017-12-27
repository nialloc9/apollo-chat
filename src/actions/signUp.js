import io from 'socket.io-client';
import { SIGN_UP_SET, SIGN_UP_RESET } from '../constants/signUp';
import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAIL, SIGN_UP_ERROR } from '../constants/socket';
import { AUTHORISE_SET } from '../constants/authorise';

const { REACT_APP_API_ADDRESS } = process.env;

/**
 * registers a new user
 */
export const setSignUp = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {

        const { form: { signUpForm: { values: { email, password } } } } = getState();

        const socket = io(`${REACT_APP_API_ADDRESS}/api/open`, {
            secure: true
        }).on('connect', () => {
            socket.emit(SIGN_UP, { email, password });
        })
            .on(SIGN_UP_SUCCESS, ({ data }) => {
                dispatch(handleSignUpSuccess(data));
                dispatch(resetSignUp());

                resolve({
                    successMessage: SIGN_UP_SUCCESS,
                    data
                });
            })
            .on(SIGN_UP_FAIL, (error) => {

                dispatch(setError('Could not register. Please try again later.', error));

                reject({
                    errorMessage: SIGN_UP_FAIL,
                    error
                });
            })
            .on(SIGN_UP_ERROR, ({ errorMessage, data }) => {

                errorMessage.includes("email already in use") ?
                    dispatch(setError('Email is already in use.', data)) :
                    dispatch(setError('An error has occurred.', data));

                reject({
                    errorMessage: SIGN_UP_ERROR,
                    error: data
                });
            }).on('error', (error) => {
                console.log(error);
            })
            .on('reconnect_attempt', (attempt) => {
                if (attempt === 5) {
                    socket.disconnect();
                }
            });
    })
};

/**
 * sets the sign up state
 * @param payload
 */
export const handleSignUpSuccess = payload => ({
    type: AUTHORISE_SET,
    payload
});

/**
 * sets the sign up error state
 * @param errorMessage
 * @param error
 */
export const setError = (errorMessage, error) => ({
    type: SIGN_UP_SET,
    payload: {
        errorMessage,
        error
    }
});

/**
 * sets the signUp state back to initial state
 */
export const resetSignUp = () => ({
    type: SIGN_UP_RESET
});