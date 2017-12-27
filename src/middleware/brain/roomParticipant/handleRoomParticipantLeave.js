import { PUSH_SET } from '../../../constants/push';
import { PARTICIPANT_SET } from '../../../constants/participant';
import { capitalizeFirstChar } from '../../../common/helpers'
/**
 * handles a room participant leave event
 * @param response
 */
const handlRoomParticipantLeave = response => (dispatch, getState)  => {
    const { roomRef, username, userRef } = response;

    const { room: { data }, participant } = getState();

    const room = data.filter(o => parseInt(o.roomRef) === parseInt(roomRef));

    const roomName = room.length > 0 ? room[0].roomName : null;

    const name = username ? capitalizeFirstChar(username) : "A user";

    const newParticipantData = participant.data.filter(o => userRef !== o.userRef);

    dispatch({
        type: PARTICIPANT_SET,
        payload: {
            data: newParticipantData
        }
    });

    dispatch({
        type: PUSH_SET,
        payload: {
            message: `${name} left ${roomName}.`,
            visibility: 'show'
        }
    });
};

export default handlRoomParticipantLeave;