import { PASSWORD_RESET_SET } from '../constants/passwordReset';
import { CACHE_CLEAR } from '../constants/cache';

const initialState = {
    successMessage: '',
    error: null,
    errorMessage: ''
};

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const passwordReset = (state = initialState, { type, payload }) => {
    switch (type) {
        case PASSWORD_RESET_SET:
            return {
                ...state,
                ...payload,
            };

        case CACHE_CLEAR:
            return initialState;

        default:
            return state;
    }
};

export default passwordReset;