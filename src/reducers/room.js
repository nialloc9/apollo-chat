import { ROOM_SET } from '../constants/room';
import { CACHE_CLEAR } from '../constants/cache';

const initialState = {
    createRoomPage: 0,
    joinRoomPage: 0,
    createRoomLoading: false,
    joinRoomLoading: false,
    createRoomError: null,
    createRoomErrorMessage: "",
    createRoomSuccessMessage: "",
    joinRoomSuccessMessage: "",
    joinRoomErrorMessage: "",
    joinRoomError: "",
    deleteRoomSuccessMessage: "",
    deleteRoomErrorMessage: "",
    deleteRoomError: "",
    deleteRoomRef: null,
    leaveRoomSuccessMessage: "",
    leaveRoomErrorMessage: "",
    leaveRoomError: "",
    leaveRoomRef: null,
    editRoomSuccessMessage: "",
    editRoomErrorMessage: "",
    editRoomError: null,
    data: []
};

/**
 * @param state
 * @param type
 * @param payload
 * @returns {*}
 */
const room = (state = initialState, { type, payload }) => {
    switch (type) {
        case ROOM_SET:
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

export default room;