import { PUSH_SET } from '../../../constants/push';
import { ROOM_SET } from '../../../constants/room';

/**
 * handles a successful room update event
 * @param response
 */
const handleRoomParticipantUpdate = response => (dispatch, getState)  => {
    const { roomRef, roomName } = response;

    const { room: { data } } = getState();

    let room = null;
    let newRooms = [];

    data.map(o => {
        if(parseInt(o.roomRef) === parseInt(roomRef)){
            room = o;
            newRooms.push({
                ...o,
                roomName
            })
        } else {
            newRooms.push(o);
        }
    });

    const oldName = room ? room.roomName : null;

    dispatch({
        type: PUSH_SET,
        payload: {
            message: `${oldName} has changed name to ${roomName}.`,
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

export default handleRoomParticipantUpdate;