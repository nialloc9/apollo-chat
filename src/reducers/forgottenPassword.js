import { FORGOTTEN_PASSWORD_SET } from '../constants/forgottenPassword';
import { CACHE_CLEAR } from '../constants/cache';

const initialState = {
    successMessage: '',
    email: '',
    error: null,
    errorMessage: ''
};

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const forgottenPassword = (state = initialState, { type, payload }) => {
    switch (type) {
        case FORGOTTEN_PASSWORD_SET:
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

export default forgottenPassword;