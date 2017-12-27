import { LOGOUT_SET, LOGOUT_RESET } from '../constants/logout';
import { CACHE_CLEAR } from '../constants/cache';

const initialState = {
    modalOpen: false
};

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const logout = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGOUT_SET:
            return {
                ...state,
                ...payload,
            };

        case LOGOUT_RESET:
        case CACHE_CLEAR:
             return initialState;

        default:
            return state;
    }
};

export default logout;