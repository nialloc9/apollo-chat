import { PUSH_SET } from '../../../constants/push';
import { MESSAGE_SET } from '../../../constants/message';
import { capitalizeFirstChar, createTimestamp } from '../../../common/helpers';

/**
 * handles a successful participant room join event
 * @param response
 */
const handleMessageParticipantCreate = response => (dispatch, getState)  => {
    const roomMessage = response.message;
    const username = response.message.username;
    const roomRef = response.message.roomRef;
    const roomName = response.roomName;

    const { message: { newMessages } } = getState();

    const urlsFields = window.location.href.split("room/");

    const currentRoom = urlsFields[1];

    //check user is in room
    if(parseInt(roomRef) === parseInt(currentRoom)){
        dispatch({
            type: MESSAGE_SET,
            payload: {
                newMessages: [
                    ...newMessages,
                    {
                        ...roomMessage,
                        createdAt: createTimestamp()
                    }
                ]
            }
        });
    }

    //check user is not in room
    if(parseInt(roomRef) !== parseInt(currentRoom)){
        dispatch({
            type: PUSH_SET,
            payload: {
                message: `${capitalizeFirstChar(username)} in ${roomName}: ${roomMessage.message}.`,
                visibility: 'show'
            }
        });
    }
};

export default handleMessageParticipantCreate;