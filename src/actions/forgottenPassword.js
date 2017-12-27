import io from 'socket.io-client';
import { FORGOTTEN_PASSWORD_SET } from '../constants/forgottenPassword';
import { FORGOTTEN_PASSWORD, FORGOTTEN_PASSWORD_SUCCESS, FORGOTTEN_PASSWORD_ERROR } from '../constants/socket';

const { REACT_APP_API_ADDRESS } = process.env;

/**
 * sends a request to send email to account to reset password
 * @param email
 */
export const setForgottenPassword  = ({ email }) => dispatch => {
    return new Promise((resolve, reject) => {

        const socket = io(`${REACT_APP_API_ADDRESS}/api/open`, {
            secure: true
        }).on('connect', () => {
            socket.emit(FORGOTTEN_PASSWORD, { email });
        }).on(FORGOTTEN_PASSWORD_SUCCESS, (response) => {

                const { data: { email } } = response;

                dispatch(handleSuccess(`Email has been sent to ${email}`));

                resolve({
                    successMessage: FORGOTTEN_PASSWORD_SUCCESS,
                    email
                });
            }).on(FORGOTTEN_PASSWORD_ERROR, (error) => {
                dispatch(setError('An error has occurred', error));

                reject({
                    errorMessage: FORGOTTEN_PASSWORD_ERROR,
                    error
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
 * sets the forgottenPassword error state
 * @param errorMessage
 * @param error
 */
const setError = (errorMessage, error) => ({
    type: FORGOTTEN_PASSWORD_SET,
    payload: {
        errorMessage,
        error
    }
});

/**
 * sets the forgottenPassword state after a successful login
 * @param successMessage
 */
const handleSuccess = successMessage => ({
    type: FORGOTTEN_PASSWORD_SET,
    payload: {
        successMessage
    }
});