import { setAuthoriseJwToken } from '../../../actions/token';
import { ROOM_SET } from '../../../constants/room';

/**
 * handles a successful room create event
 * @param response
 */
const handleRoomCreateSuccess = response => (dispatch)  => {
    const { data } = response;
    dispatch(handleData(data));
};

/**
 * adds the new room to the current rooms in state and sets new jwToken
 * @param roomData
 */
const handleData = roomData => (dispatch, getState) => {

    const { jwToken, ...newRoom } = roomData;

    const { room: { data } } = getState();

    dispatch({
        type: ROOM_SET,
        payload: {
            data: [
                ...data,
                newRoom
            ],
            createRoomPage: 1,
            createRoomLoading: false
        }
    });

    dispatch(setAuthoriseJwToken(jwToken))
};

export default handleRoomCreateSuccess;