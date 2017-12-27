import { LOGIN_SET, LOGIN_RESET } from '../constants/login';
import { CACHE_CLEAR } from '../constants/cache';

const initialState = {
    modalOpen: false,
    error: null,
    errorMessage: ''
};

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const login = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_SET:
            return {
                ...state,
                ...payload,
            };

        case LOGIN_RESET:
        case CACHE_CLEAR:
            return initialState;

        default:
            return state;
    }
};

export default login;