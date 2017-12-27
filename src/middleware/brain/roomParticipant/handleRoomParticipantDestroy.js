import { PUSH_SET } from '../../../constants/push';
import { ROOM_SET } from '../../../constants/room';

/**
 * handles a successful room destroy event
 * @param response
 */
const handleRoomParticipantDestroy = response => (dispatch, getState)  => {
    const { roomRef } = response;

    const { room: { data } } = getState();

    let room = null;
    let newRooms = [];

    data.map(o => {
        if(parseInt(o.roomRef) === parseInt(roomRef)){
            room = o;
        } else {
            newRooms.push(o);
        }
    });

    const roomName = room ? room.roomName : null;

    dispatch({
        type: PUSH_SET,
        payload: {
            message: `${roomName} has gone away.`,
            visibility: 'show'
        }
    });

    dispatch({
        type: ROOM_SET,
        payload: {
            data: newRooms
        }
    })
};

export default handleRoomParticipantDestroy;