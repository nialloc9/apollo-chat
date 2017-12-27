import { LOGOUT_SET, LOGOUT_RESET } from '../constants/logout';
import { CACHE_CLEAR } from '../constants/cache';
import { BRAIN_DISCONNECT_REQUEST } from '../constants/brain';

/**
 * logs the user out and resets authorise state
 */
export const setLogout = () => dispatch => {
    dispatch({type: BRAIN_DISCONNECT_REQUEST });
    dispatch({type: CACHE_CLEAR});
};

/**
 * sets the modal open or closed for logout
 */
export const setModalOpen = () => ({
    type: LOGOUT_SET,
    payload: {
        modalOpen: true
    }
});

/**
 * sets the logout state back to initial state
 */
export const resetLogout = () => ({
    type: LOGOUT_RESET
});