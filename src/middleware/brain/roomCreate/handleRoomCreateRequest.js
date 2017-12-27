import { ROOM_CREATE } from '../../../constants/socket';
import { ROOM_SET } from '../../../constants/room';

const handleRoomCreateRequest = ({ socket, payload }) => (dispatch, getState) => {

    dispatch({
        type: ROOM_SET,
        payload: {
            createRoomLoading: true
        }
    });

    const { roomName, username, expire } = payload;
    const { authorise: { jwToken, userRef } } = getState();

    socket.emit(ROOM_CREATE, {
        roomName,
        username,
        expire,
        userRef,
        jwToken
    });
};

export default handleRoomCreateRequest;