import { PUSH_SET } from '../../../constants/push';
import { PARTICIPANT_SET } from '../../../constants/participant';
import { capitalizeFirstChar } from '../../../common/helpers';

/**
 * handles a successful participant room join event
 * @param response
 */
const handleRoomJoinSuccess = response => (dispatch, getState)  => {
    const { roomRef, username } = response;

    const { room: { data }, participant } = getState();

    const room = data.filter(o => parseInt(o.roomRef) === parseInt(roomRef));

    const roomName = room.length > 0 ? room[0].roomName : null;

    const urlsFields = window.location.href.split("room/");

    const currentRoom = urlsFields[1];

    //check user is in room
    if(parseInt(roomRef) === parseInt(currentRoom)){
        dispatch({
            type: PARTICIPANT_SET,
            payload: {
                data: [...participant.data, response]
            }
        });
    }

    //check user is not in room
    if(parseInt(roomRef) !== parseInt(currentRoom)){
        dispatch({
            type: PUSH_SET,
            payload: {
                message: `${capitalizeFirstChar(username)} joined ${roomName}.`,
                visibility: 'show'
            }
        });
    }
};

export default handleRoomJoinSuccess;