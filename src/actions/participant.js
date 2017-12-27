import {
    USER_PARTICIPANT_FETCH_REQUEST
} from '../constants/participant';

/**
 * fetches the room participants
 * @param roomRef
 */
export const fetchParticipants = roomRef => dispatch => {
    dispatch({
        type: USER_PARTICIPANT_FETCH_REQUEST,
        payload: {
            roomRef
        }
    });
};