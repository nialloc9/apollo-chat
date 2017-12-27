import io from 'socket.io-client';
import { SubmissionError } from 'redux-form';
import { PASSWORD_RESET_SET } from '../constants/passwordReset';
import { PASSWORD_RESET, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_ERROR } from '../constants/socket';

const { REACT_APP_API_ADDRESS } = process.env;

/**
 * sends a request to send to reset password
 * @param email
 * @param token
 * @param password
 * @param passwordConfirm
 */
export const passwordReset  = ({ email, token, password, passwordConfirm }) => dispatch =>
    new Promise((resolve, reject) => {

        if(password !== passwordConfirm){
            throw new SubmissionError({
                passwordConfirm: "Password must match"
            })
        }

        if(password.length < 6){
            throw new SubmissionError({
                passwordConfirm: "Password must be 6 characters or more"
            })
        }

        const socket = io(`${REACT_APP_API_ADDRESS}/api/open`, {
            secure: true
        }).on('connect', () => {
            socket.emit(PASSWORD_RESET, { email, token, password });
        })
            .on(PASSWORD_RESET_SUCCESS, (response) => {

                const { data: { email } } = response;

                dispatch(handleSuccess(`Your password has been saved and you can now login. Thank you.`));

                resolve({
                    successMessage: PASSWORD_RESET_SUCCESS,
                    email
                });
            })
            .on(PASSWORD_RESET_ERROR, (error) => {
                dispatch(setError('Could not reset password. This could be because your link has expired. Please go to login and click forgotten password.', error));

                reject({
                    errorMessage: PASSWORD_RESET_ERROR,
                    error
                });
            }).on('error', (error) => {
                console.log(error);
            })
            .on('reconnect_attempt', (attempt) => {
                if (attempt === 5) {
                    socket.disconnect();
                }
            });
    });

/**
 * sets the passwordReset error state
 * @param errorMessage
 * @param error
 */
const setError = (errorMessage, error) => ({
    type: PASSWORD_RESET_SET,
    payload: {
        successMessage: "",
        errorMessage,
        error
    }
});

/**
 * sets the passwordReset state after a successful login
 * @param successMessage
 */
const handleSuccess = successMessage => ({
    type: PASSWORD_RESET_SET,
    payload: {
        successMessage,
        errorMessage: "",
        error: null
    }
});