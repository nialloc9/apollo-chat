import { ROOM_DELETE } from '../../../constants/socket';
import { ROOM_SET } from '../../../constants/room';

/**
 * sends a room delete event to the server
 * @param socket
 * @param payload
 */
const handleRoomDeleteRequest = ({ socket, payload }) => (dispatch, getState) => {

    const { roomRef } = payload;

    const { authorise: { jwToken, userRef }, room: { data } } = getState();

    const newRooms = data.map(o => {
        return o.roomRef === roomRef ? {
            ...o,
            deleteRoomLoading: true
        } : o;
    });

    dispatch({
        type: ROOM_SET,
        payload: {
            data: newRooms
        }
    });

    socket.emit(ROOM_DELETE, {
        roomRef,
        userRef,
        jwToken
    });
};

export default handleRoomDeleteRequest;