import { setAuthoriseJwToken } from '../../../actions/token';
import { ROOM_SET } from '../../../constants/room';

/**
 * handles a successful room edit event
 * @param response
 */
const handleRoomEditSuccess = response => (dispatch)  => {
    const { data } = response;
    dispatch(handleData(data));
};

/**
 * filters room data and updates edited room in state and sets new jwToken
 * @param roomData
 */
const handleData = roomData => (dispatch, getState) => {

    const { jwToken, roomRef } = roomData;

    const { room: { data } } = getState();

    const newRooms = data.map(o => {
        return o.roomRef === roomRef ? {
            ...o,
            editRoomLoading: false
        } : o;
    });

    dispatch({
        type: ROOM_SET,
        payload: {
            data: newRooms,
            editRoomErrorMessage: "",
        }
    });

    dispatch(setAuthoriseJwToken(jwToken))
};

export default handleRoomEditSuccess;