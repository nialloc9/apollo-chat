import { SIGN_UP_SET, SIGN_UP_RESET } from '../constants/signUp';
import { CACHE_CLEAR } from '../constants/cache';

const initialState = {
    error: null,
    errorMessage: ""
};

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const signUp = (state = initialState, { type, payload }) => {
    switch (type) {
        case SIGN_UP_SET:
            return {
                ...state,
                ...payload,
            };

        case SIGN_UP_RESET:
        case CACHE_CLEAR:
            return initialState;

        default:
            return state;
    }
};

export default signUp;