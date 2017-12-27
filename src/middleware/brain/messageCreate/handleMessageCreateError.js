import { MESSAGE_SET } from '../../../constants/message';
import { handlejwTokenError } from '../../../actions/token';

/**
 * handles an error from message create
 * @param error
 */
const handleMessageCreateError = error => dispatch => {

    dispatch(handlejwTokenError(error));

    const { errorMessage } = error;

    errorMessage.includes("participant does not exist in room") ?
        dispatch(handleError('You are not a participant in this room', error)) :
        dispatch(handleError('An error has occurred', error));
};

/**
 * sets the room createMessageErrorMessage and createMessageError state
 * @param errorMessage
 * @param error
 */
const handleError = (errorMessage, error) => ({
    type: MESSAGE_SET,
    payload: {
        messageCreateErrorMessage: errorMessage,
        messageCreateError: error,
        messageCreateLoading: false
    }
});

export default handleMessageCreateError;