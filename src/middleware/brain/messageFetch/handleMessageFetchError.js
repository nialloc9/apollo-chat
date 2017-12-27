import { MESSAGE_SET } from '../../../constants/message';
import { handlejwTokenError } from '../../../actions/token';

/**
 * handles an error from messages fetch
 * @param error
 */
const handleMessageFetchError = error => dispatch => {

    dispatch(handlejwTokenError(error));

    const { errorMessage } = error;

    errorMessage.includes("could not find user messages") ?
        dispatch(handleError('Oh looks like this room is shy. Be the first to chat below.', error)) :
        dispatch(handleError('An error has occurred', error));
};

/**
 * sets the room messageFetchErrorMessage and messageFetchError state
 * @param errorMessage
 * @param error
 */
const handleError = (errorMessage, error) => ({
    type: MESSAGE_SET,
    payload: {
        messageFetchErrorMessage: errorMessage,
        messageFetchError: error
    }
});

export default handleMessageFetchError;