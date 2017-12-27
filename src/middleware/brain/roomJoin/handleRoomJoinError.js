import { ROOM_SET } from '../../../constants/room';
import { handlejwTokenError } from '../../../actions/token';

/**
 * handles an error from room join
 * @param error
 */
const handleRoomJoinError = error => dispatch => {

    dispatch(handlejwTokenError(error));

    const { errorMessage } = error;

    errorMessage.includes("participant already exists in room") ?
        dispatch(handleError('You are already a member of this room.', error)) :
        dispatch(handleError("An error has occurred", error));
};

/**
 * sets the room joinRoomErrorMessage and joinRoomError state
 * @param errorMessage
 * @param error
 */
const handleError = (errorMessage, error) => ({
    type: ROOM_SET,
    payload: {
        joinRoomErrorMessage: errorMessage,
        joinRoomError: error,
        joinRoomLoading: false
    }
});

export default handleRoomJoinError;