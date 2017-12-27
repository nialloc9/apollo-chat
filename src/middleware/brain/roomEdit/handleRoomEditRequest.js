import { ROOM_EDIT } from '../../../constants/socket';
import { ROOM_SET } from '../../../constants/room';

/**
 * sends a room edit event to the server
 * @param socket
 * @param payload
 */
const handleRoomEditRequest = ({ socket, payload }) => (dispatch, getState) => {

    const { roomRef, roomName } = payload;

    const { authorise: { jwToken, userRef }, room: { data } } = getState();

    const newRooms = data.map(o => {
        return o.roomRef === roomRef ? {
            ...o,
            roomName,
            editRoomLoading: true
        } : o;
    });

    dispatch({
        type: ROOM_SET,
        payload: {
            data: newRooms
        }
    });

    socket.emit(ROOM_EDIT, {
        roomRef,
        roomName,
        userRef,
        jwToken
    });
};

export default handleRoomEditRequest;