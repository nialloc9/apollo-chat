import { ROOM_SET } from '../../../constants/room';
import { handlejwTokenError } from '../../../actions/token';

/**
 * handles an error from room edit
 * @param error
 */
const handleRoomJoinEdit = error => dispatch => {

    dispatch(handlejwTokenError(error));

    const { data } = error;

    dispatch(handleError("An error has occurred", data))
};

/**
 * sets the room editRoomErrorMessage and editRoomError state
 * @param errorMessage
 * @param error
 */
const handleError = (errorMessage, error) => (dispatch, getState) => {

    const { room: { data } } = getState();

    const newRooms = data.map(o => ({
        editRoomLoading: false,
        ...o
    }));

    dispatch({
        type: ROOM_SET,
        payload: {
            editRoomErrorMessage: errorMessage,
            editRoomError: error,
            data: newRooms
        }
    });
};

export default handleRoomJoinEdit;