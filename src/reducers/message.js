import { MESSAGE_SET } from '../constants/message';
import { CACHE_CLEAR } from '../constants/cache';

const initialState = {
    messageCreateSuccessMessage: "",
    messageCreateErrorMessage: "",
    messageCreateLoading: false,
    messageCreateError: null,
    messageFetchSuccessMessage: "",
    messageFetchErrorMessage: "",
    messageFetchLoading: false,
    messageFetchError: null,
    messageDeleteSuccessMessage: "",
    messageDeleteErrorMessage: "",
    messageDeleteLoading: false,
    messageDeleteError: null,
    roomRef: null,
    total: 0,
    offset: 0,
    data: [],
    newMessages: []
};

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const message = (state = initialState, { type, payload }) => {
    switch (type) {
        case MESSAGE_SET:
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

export default message;