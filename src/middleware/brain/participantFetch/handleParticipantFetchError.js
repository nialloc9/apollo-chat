import { PARTICIPANT_SET } from '../../../constants/participant';
import { handlejwTokenError } from '../../../actions/token';

/**
 * handles an error from participant fetch
 * @param error
 */
const handleParticipantFetchError = error => dispatch => {

    dispatch(handlejwTokenError(error));

    const { errorMessage } = error;

    errorMessage.includes("participant does not exist in room") ?
        dispatch(handleError('You are not a participant in this room', error)) :
        dispatch(handleError('An error has occurred', error));
};

/**
 * sets the participant participantErrorMessage and participantError state
 * @param errorMessage
 * @param error
 */
const handleError = (errorMessage, error) => ({
    type: PARTICIPANT_SET,
    payload: {
        participantErrorMessage: errorMessage,
        participantError: error
    }
});

export default handleParticipantFetchError;