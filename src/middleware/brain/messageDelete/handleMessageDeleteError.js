import { MESSAGE_SET } from '../../../constants/message';
import { handlejwTokenError } from '../../../actions/token';

/**
 * handles an error from message delete
 * @param error
 */
const handleMessageDeleteError = error => (dispatch, getState) => {

    const { message: { data, newMessages } } = getState();

    const newData = data.map(o => ({
        ...o,
        deleteMessageLoading: false
    }));

    const messages = newMessages.map(o => ({
        ...o,
        deleteMessageLoading: false
    }));

    dispatch({
        type: MESSAGE_SET,
        payload: {
            data: newData,
            newMessages: messages
        }
    });

    dispatch(handlejwTokenError(error));

    dispatch(handleError('An error has occurred', error))
};

/**
 * sets the room messageDeleteErrorMessage and messageDeleteError state
 * @param errorMessage
 * @param error
 */
const handleError = (errorMessage, error) => ({
    type: MESSAGE_SET,
    payload: {
        messageDeleteErrorMessage: errorMessage,
        messageDeleteError: error
    }
});

export default handleMessageDeleteError;