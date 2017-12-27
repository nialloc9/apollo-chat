import { PARTICIPANT_SET } from '../constants/participant';
import { CACHE_CLEAR } from '../constants/cache';

const initialState = {
    participantSuccessMessage: "",
    participantErrorMessage: "",
    participantLoading: false,
    participantError: null,
    total: 12,
    offset: 0,
    data: []
};

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const participant = (state = initialState, { type, payload }) => {
    switch (type) {
        case PARTICIPANT_SET:
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

export default participant;