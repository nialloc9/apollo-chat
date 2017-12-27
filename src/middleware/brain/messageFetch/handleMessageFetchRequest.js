import { MESSAGE_FETCH } from '../../../constants/socket';
import { MESSAGE_SET } from '../../../constants/message';

const handleMessageFetchRequest = ({ payload, socket }) => (dispatch, getState) => {

    const { authorise: { jwToken, userRef }, message: { offset } } = getState();

    const { roomRef } = payload;

    dispatch({
        type: MESSAGE_SET,
        payload: {
            roomRef,
        }
    });

    socket.emit(MESSAGE_FETCH, {
        userRef,
        roomRef,
        jwToken,
        offset,
        limit: 20
    });
};

export default handleMessageFetchRequest;