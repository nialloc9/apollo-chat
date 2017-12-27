import { AUTHORISE_SET, AUTHORISE_RESET } from '../constants/authorise';
import { CACHE_CLEAR } from '../constants/cache';

const initialState = {
    email: '',
    jwToken: ''
};

const { sessionStorage } = window;

let persistedState = initialState;

try {
    persistedState = sessionStorage.getItem('authorise') ? JSON.parse(sessionStorage.getItem('authorise')) : initialState;
} catch (error) { console.log(error) }

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const authorise = (state = persistedState, { type, payload }) => {
    switch (type) {
        case AUTHORISE_SET:
            return {
                ...state,
                ...payload,
            };

        case AUTHORISE_RESET:
        case CACHE_CLEAR:
            return initialState;

        default:
            return state;
    }
};

export default authorise;