import { ROOM_SET } from '../../../constants/room';
import { handlejwTokenError } from '../../../actions/token';

/**
 * handles an error from room create
 * @param error
 */
const handleRoomCreateError = error => dispatch => {

    dispatch(handlejwTokenError(error));

    const { errorMessage } = error;

    switch (errorMessage) {
        case "ERROR: user has exceeded room limit":
            dispatch(handleError('Room limit reached', error));
            break;

        case "ERROR: expire is not within allowed dates":
            dispatch(handleError('Expires is not within your allowed dates.', error));
            break;
        default:
            dispatch(handleError('An error has occurred', error))
    }
};

/**
 * sets the room createRoomErrorMessage and createRoomError state
 * @param errorMessage
 * @param error
 */
const handleError = (errorMessage, error) => ({
    type: ROOM_SET,
    payload: {
        createRoomErrorMessage: errorMessage,
        createRoomError: error,
        createRoomLoading: false
    }
});

export default handleRoomCreateError;