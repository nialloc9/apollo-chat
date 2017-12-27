import io from 'socket.io-client';
import { STAT_SET } from '../constants/stat';
import { STAT_FETCH, STAT_FETCH_SUCCESS, STAT_FETCH_ERROR } from '../constants/socket';

const { REACT_APP_API_ADDRESS } = process.env;

/**
 * sets the stat state
 * @param user
 * @param message
 * @param room,
 * @param successMessage
 */
const setStat = ({ user, message, room, successMessage }) => ({
    type: STAT_SET,
    payload: {
        user,
        message,
        room,
        successMessage
    }
});

/**
 * sets the stat error state
 * @param errorMessage
 * @param error
 */
const setError = ({ errorMessage, error }) => ({
    type: STAT_SET,
    payload: {
        errorMessage,
        error
    }
});

/**
 * fetches the number, user, and room stats
 * @returns {Promise}
 */
export const fetchStats = () => dispatch => {
    return new Promise((resolve, reject) => {
        const socket = io(`${REACT_APP_API_ADDRESS}/api/open`, {
            secure: true
        }).on('connect', () => {
            socket.emit(STAT_FETCH, { });
        }).on(STAT_FETCH_SUCCESS, ({ successMessage, data: { user, room, message } }) => {
                dispatch(setStat({
                    successMessage,
                    user,
                    room,
                    message
                }));

                resolve({
                    successMessage: STAT_FETCH_SUCCESS,
                    data: {
                        user,
                        room,
                        message
                    }
                });
            }).on(STAT_FETCH_ERROR, ({ errorMessage, data }) => {

                dispatch(setError('An error has occurred', data));

                reject({
                    errorMessage: STAT_FETCH_ERROR,
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
    });
};