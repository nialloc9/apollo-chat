import { ROOM_JOIN } from '../../../constants/socket';
import { ROOM_SET } from '../../../constants/room';

/**
 * sends a room join event to the server
 * @param socket
 * @param payload
 */
const handleRoomJoinRequest = ({ socket, payload }) => (dispatch, getState) => {

    dispatch({
        type: ROOM_SET,
        payload: {
            joinRoomLoading: true
        }
    });

    const { roomPin, username } = payload;
    const { authorise: { jwToken, userRef } } = getState();

    socket.emit(ROOM_JOIN, {
        roomPin,
        username,
        userRef,
        jwToken
    });
};

export default handleRoomJoinRequest;