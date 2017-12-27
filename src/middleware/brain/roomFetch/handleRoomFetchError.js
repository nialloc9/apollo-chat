import { ROOM_SET } from '../../../constants/room';
import { handlejwTokenError } from '../../../actions/token';

/**
 * handles an error from room fetch
 * @param error
 */
const handleRoomFetchError = error => dispatch => {

    dispatch(handlejwTokenError(error));

    const { errorMessage } = error;

    errorMessage.includes("could not find user rooms") ?
        dispatch(handleError('Oh no rooms? Create or join on the right.', error)) :
        dispatch(handleError('An error has occurred', error));
};

/**
 * sets the room fetchRoomsErrorMessage and fetchRoomsError state
 * @param errorMessage
 * @param error
 */
const handleError = (errorMessage, error) => ({
    type: ROOM_SET,
    payload: {
        fetchRoomsErrorMessage: errorMessage,
        fetchRoomsError: error
    }
});

export default handleRoomFetchError;