import { STAT_SET } from '../constants/stat';
import { CACHE_CLEAR } from '../constants/cache';

const initialState = {
    user: 0,
    room: 0,
    message: 0
};

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const stat = (state = initialState, { type, payload }) => {
    switch (type) {
        case STAT_SET:
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

export default stat;