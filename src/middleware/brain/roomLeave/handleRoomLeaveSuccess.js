import { setAuthoriseJwToken } from '../../../actions/token';
import { ROOM_SET } from '../../../constants/room';

/**
 * handles a successful room leave event
 * @param response
 */
const handleRoomLeaveSuccess = response => (dispatch)  => {
    const { data } = response;
    dispatch(handleData(data));
};

/**
 * filters room data and removes left room in state and sets new jwToken
 * @param roomData
 */
const handleData = roomData => (dispatch, getState) => {

    const { jwToken, leftRoomRef } = roomData;

    const { room: { data } } = getState();

    const newRooms = data.filter(o => o.roomRef !== leftRoomRef);

    dispatch({
        type: ROOM_SET,
        payload: {
            data: newRooms,
            leaveRoomSuccessMessage: "Room left"
        }
    });

    dispatch(setAuthoriseJwToken(jwToken))
};

export default handleRoomLeaveSuccess;