import { setAuthoriseJwToken } from '../../../actions/token';
import { ROOM_SET } from '../../../constants/room';

/**
 * handles a successful room fetch event
 * @param response
 */
const handleRoomFetchSuccess = response => (dispatch)  => {
    const { data } = response;
    dispatch(handleData(data));
};

/**
 * adds room data in state and sets new jwToken
 * @param roomData
 */
const handleData = roomData => (dispatch) => {

    const { jwToken, rooms } = roomData;

    dispatch({
        type: ROOM_SET,
        payload: {
            data: rooms
        }
    });

    dispatch(setAuthoriseJwToken(jwToken))
};

export default handleRoomFetchSuccess;