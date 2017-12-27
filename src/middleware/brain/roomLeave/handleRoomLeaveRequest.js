import { ROOM_LEAVE } from '../../../constants/socket';
import { ROOM_SET } from '../../../constants/room';

/**
 * sends a room leave event to the server
 * @param socket
 * @param payload
 */
const handleRoomLeaveRequest = ({ socket, payload }) => (dispatch, getState) => {

    const { roomRef } = payload;
    const { authorise: { jwToken, userRef }, room: { data } } = getState();

    const newRooms = data.map(o => {
        return o.roomRef === roomRef ? {
            ...o,
            leaveRoomLoading: true
        } : o;
    });

    dispatch({
        type: ROOM_SET,
        payload: {
            data: newRooms
        }
    });

    socket.emit(ROOM_LEAVE, {
        roomRef,
        userRef,
        jwToken
    });
};

export default handleRoomLeaveRequest;