import { setAuthoriseJwToken } from '../../../actions/token';
import { MESSAGE_SET } from '../../../constants/message';

/**
 * handles a successful messages fetch event
 * @param response
 */
const handleMessageFetchSuccess = response => (dispatch)  => {
    const { data } = response;
    dispatch(handleData(data));
};

/**
 * adds message data in state and sets new jwToken
 * @param messageData
 */
const handleData = messageData => (dispatch, getState) => {

    const { message: { data, newMessages } } = getState();

    const { jwToken, messages, total } = messageData;

    const filteredMessages = messages.filter(o =>
        newMessages.filter(j => o.messageRef !== j.messageRef)
    );

    const newData = [...filteredMessages, ...data];

    dispatch({
        type: MESSAGE_SET,
        payload: {
            messageFetchSuccessMessage: "Message sent",
            data: newData,
            offset: newData.length,
            total
        }
    });

    dispatch(setAuthoriseJwToken(jwToken))
};

export default handleMessageFetchSuccess;