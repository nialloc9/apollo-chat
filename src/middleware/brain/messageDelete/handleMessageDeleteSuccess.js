import { setAuthoriseJwToken } from '../../../actions/token';
import { MESSAGE_SET } from '../../../constants/message';

/**
 * handles a successful messages delete event
 * @param response
 */
const handleMessageDeleteSuccess = response => (dispatch)  => {
    const { data } = response;
    dispatch(handleData(data));
};

/**
 * adds message data in state and sets new jwToken
 * @param messageData
 */
const handleData = messageData => (dispatch, getState) => {

    const { jwToken, messageRef } = messageData;

    const { message: { data, newMessages, total } } = getState();

    const newData = data.filter(o => o.messageRef !== messageRef);

    const messages = newMessages.filter(o => o.messageRef !== messageRef);

    dispatch({
        type: MESSAGE_SET,
        payload: {
            messageDeleteSuccessMessage: "Message deleted",
            data: newData,
            newMessages: messages,
            total: total - 1
        }
    });

    dispatch(setAuthoriseJwToken(jwToken))
};

export default handleMessageDeleteSuccess;