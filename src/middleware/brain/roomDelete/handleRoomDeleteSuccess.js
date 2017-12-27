import { setAuthoriseJwToken } from '../../../actions/token';
import { ROOM_SET } from '../../../constants/room';

/**
 * handles a successful room delete event
 * @param response
 */
const handleRoomDeleteSuccess = response => (dispatch)  => {
    const { data } = response;
    dispatch(handleData(data));
};

/**
 * filters room data and removes deleted room in state and sets new jwToken
 * @param roomData
 */
const handleData = roomData => (dispatch, getState) => {

    const { jwToken, deletedRoomRef } = roomData;

    const { room: { data } } = getState();

    const newRooms = data.filter(o => o.roomRef !== deletedRoomRef);

    dispatch({
        type: ROOM_SET,
        payload: {
            data: newRooms,
            deleteRoomSuccessMessage: "Room deleted"
        }
    });

    dispatch(setAuthoriseJwToken(jwToken))
};

export default handleRoomDeleteSuccess;