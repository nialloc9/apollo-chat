import { MESSAGE_DELETE } from '../../../constants/socket';
import { MESSAGE_SET } from '../../../constants/message';

const handleMessageDeleteRequest = ({ payload, socket }) => (dispatch, getState) => {

    const { messageRef } = payload;

    const { authorise: { jwToken, userRef }, message: { data, roomRef, newMessages } } = getState();

    const newData = data.map(o => {
        return o.messageRef === messageRef ? {
            ...o,
            deleteMessageLoading: true
        } : o;
    });

    const messages = newMessages.map(o => {
        return o.messageRef === messageRef ? {
            ...o,
            deleteMessageLoading: true
        } : o;
    });

    dispatch({
        type: MESSAGE_SET,
        payload: {
            data: newData,
            newMessages: messages
        }
    });

    socket.emit(MESSAGE_DELETE, {
        userRef,
        messageRef,
        roomRef,
        jwToken
    });
};

export default handleMessageDeleteRequest;