import { MESSAGE_CREATE } from '../../../constants/socket';
import { MESSAGE_SET } from '../../../constants/message';

const handleMessageCreateRequest = ({ socket, payload }) => (dispatch, getState) => {

    dispatch({
        type: MESSAGE_SET,
        payload: {
            messageCreateLoading: true
        }
    });

    const { message } = payload;

    const { authorise: { jwToken, userRef }, message: { roomRef }, participant, room } = getState();

    const userParticipant = participant.data.filter(o => userRef === o.userRef);
    const userRoom = room.data.filter(o => parseInt(roomRef) === parseInt(o.roomRef));

    const { username, avatar } = userParticipant[0];
    const { roomName } = userRoom[0];

    socket.emit(MESSAGE_CREATE, {
        message,
        username,
        avatar,
        roomName,
        roomRef,
        userRef,
        jwToken
    });
};

export default handleMessageCreateRequest;