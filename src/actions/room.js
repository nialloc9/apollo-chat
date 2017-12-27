import {
    USER_ROOM_CREATE_REQUEST,
    ROOM_SET,
    USER_ROOM_FETCH_REQUEST,
    USER_ROOM_JOIN_REQUEST,
    USER_ROOM_DELETE_REQUEST,
    USER_ROOM_LEAVE_REQUEST,
    USER_ROOM_EDIT_REQUEST
} from '../constants/room';

/**
 * sends a new room request to room middleware
 * @param roomName
 * @param username
 * @param expire
 */
export const setRoom  = ({ roomName, username, expire }) => dispatch => {
    dispatch({
        type: USER_ROOM_CREATE_REQUEST,
        payload: {
            roomName,
            username,
            expire
        }
    })
};



/**
 * sets the create room page number state
 */
export const setCreateRoomPage  = createRoomPage => ({
    type: ROOM_SET,
    payload: {
        createRoomPage
    }
});

/**
 * fetches the users rooms from the api
 */
export const fetchRooms = () => ({ type: USER_ROOM_FETCH_REQUEST });

/**
 * sends a request to join a room
 * @param roomPin
 * @param username
 */
export const joinRoom = ({ roomPin, username }) => dispatch => {
    dispatch({
        type: USER_ROOM_JOIN_REQUEST,
        payload: {
            roomPin,
            username
        }
    })
};

/**
 * sets the join room page number state
 */
export const setJoinRoomPage  = joinRoomPage => ({
    type: ROOM_SET,
    payload: {
        joinRoomPage
    }
});

/**
 *  sends a delete room request
 */
export const deleteRoom  = roomRef  => dispatch => {
    dispatch({
        type: USER_ROOM_DELETE_REQUEST,
        payload: {
            roomRef
        }
    })
};

/**
 *  sends a leave room request
 */
export const leaveRoom  = roomRef  => dispatch => {
    dispatch({
        type: USER_ROOM_LEAVE_REQUEST,
        payload: {
            roomRef
        }
    })
};

/**
 * sends a request to the middleware to edit this room
 * @param roomRef
 * @param roomName
 */
export const editRoom = ({ roomRef, roomName }) => dispatch => {
    dispatch({
        type: USER_ROOM_EDIT_REQUEST,
        payload: {
            roomRef,
            roomName
        }
    })
};