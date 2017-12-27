import io from 'socket.io-client';
import { LOGIN_SET, LOGIN_RESET } from '../constants/login';
import { AUTHORISE_SET } from '../constants/authorise';
import { AUTHORISE_USER, AUTHORISE_USER_SUCCESS, AUTHORISE_USER_ERROR } from '../constants/socket';

const { REACT_APP_API_ADDRESS } = process.env;

/**
 * checks the users input and authorises if correct
 * @param email
 * @param password
 */
export const setLogin  = ({ email, password }) => dispatch => {
    return new Promise((resolve, reject) => {

        const socket = io(`${REACT_APP_API_ADDRESS}/api/open`, {
            secure: true
        }).on('connect', () => {
            socket.emit(AUTHORISE_USER, { email, password });
        }).on(AUTHORISE_USER_SUCCESS, (response) => {

            const { data } = response;

            dispatch(handleLoginSuccess(data));

            resolve({
                successMessage: AUTHORISE_USER_SUCCESS,
                data
            });
        }).on(AUTHORISE_USER_ERROR, ({ errorMessage }) => {

                errorMessage.includes("invalid email/password combination") ?
                dispatch(setError('Invalid credentials')) :
                    dispatch(setError('An error has occurred'))

                reject({
                    errorMessage: AUTHORISE_USER_ERROR,
                });
        }).on('error', (error) => {
            console.log(error);
        }).on('reconnect_attempt', (attempt) => {
            if (attempt === 5) {
                socket.disconnect();
            }
        });
    })

};

/**
 * sets the login modal open state
 */
export const setModal = (modalOpen) => dispatch => dispatch({
    type: LOGIN_SET,
    payload: {
        modalOpen
    }
});

/**
 * sets the login error state
 * @param errorMessage
 * @param error
 */
const setError = (errorMessage, error) => ({
    type: LOGIN_SET,
    payload: {
        errorMessage,
        error
    }
});

/**
 * sets the authorise state after a successful login
 * @param data
 */
const handleLoginSuccess = (data) => ({
    type: AUTHORISE_SET,
    payload: data
});

/**
 * sets the login state back to initial state
 */
export const resetLogin = () => ({
    type: LOGIN_RESET
});