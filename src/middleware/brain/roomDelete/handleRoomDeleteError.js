import { ROOM_SET } from '../../../constants/room';
import { handlejwTokenError } from '../../../actions/token';

/**
 * handles an error from room delete
 * @param error
 */
const handleRoomDeleteError = error => dispatch => {

    dispatch(handlejwTokenError(error));

    dispatch(handleError("An error has occurred", error));
};

/**
 * sets the room deleteRoomErrorMessage and deleteRoomError state
 * @param errorMessage
 * @param error
 */
const handleError = (errorMessage, error) => (dispatch, getState) => {

    const { room: { data } } = getState();

    const newRooms = data.map(o => ({
        deleteRoomLoading: false,
        ...o
    }));

    dispatch({
        type: ROOM_SET,
        payload: {
            deleteRoomErrorMessage: errorMessage,
            deleteRoomError: error,
            data: newRooms
        }
    })
};

export default handleRoomDeleteError;