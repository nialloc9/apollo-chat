import { ROOM_SET } from '../../../constants/room';
import { handlejwTokenError } from '../../../actions/token';

/**
 * handles an error from room leave
 * @param error
 */
const handleRoomLeaveError = error => dispatch => {

    dispatch(handlejwTokenError(error));

    dispatch(handleError("An error has occurred", error));
};

/**
 * sets the room leaveRoomErrorMessage and deleteRoomError state
 * @param errorMessage
 * @param error
 */
const handleError = (errorMessage, error) => (dispatch, getState) => {

    const { room: { data } } = getState();

    const newRooms = data.map(o => ({
        leaveRoomLoading: false,
        ...o
    }));

    dispatch({
        type: ROOM_SET,
        payload: {
            leaveRoomErrorMessage: errorMessage,
            leaveRoomError: error,
            data: newRooms
        }
    });
};

export default handleRoomLeaveError;