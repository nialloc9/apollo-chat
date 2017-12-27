import { __INVALID_TOKEN__ } from '../constants/socket';
import { CACHE_CLEAR } from '../constants/cache';
import { AUTHORISE_SET } from '../constants/authorise';

/**
 * checks if the error is because of invalid json web token if it is clears cache
 * @param errorMessage
 */
export const handlejwTokenError = ({ errorMessage }) => dispatch => {
    if(errorMessage === __INVALID_TOKEN__) {
        dispatch({ type: CACHE_CLEAR });
    }
};

/**
 * sets the authorise jwToken state
 * @param jwToken
 */
export const setAuthoriseJwToken = jwToken => ({
    type: AUTHORISE_SET,
    payload: {
        jwToken
    }
});